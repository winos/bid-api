'use strict'

let AuctionDao = require('../dao/auction-dao')
,	UserDao = require('../dao/user-dao')
,	TransactionDao = require('../dao/transaction-dao')
, BidDao = require('../dao/bid-dao')
, bidUserRandom = require('../lib/bid-user')

const _ = require('underscore')

module.exports = (io, isDev, Timer) => {

	function preFinishAuction (err, auction, call) {
		var checkAuction =  false

		if (!checkAuction) {
			bidUserRandom.get((username) => {
				Timer.reset(auction._id, 20)
				var response = {
					username: username,
					time: auction.countdown,
					auction_id:auction._id,
					price: 100,
					time_init: 20
				}
				refresh(response)
			})
			call(false)
		} else {
			call(true)
		}
	}

	function finishAuction (error, auction) {
		if (error) throw new Error('An error has ocurred')
		AuctionDao.model.findByIdAndUpdate(auction._id,
			{'active': false, 'winner': {'user':'Dawin Ossa'}},
			{safe: true, upsert: true, new : true},
			(err, result) => {
				if (err) throw new Error(err)

				result = result.toObject()
				result = _.omit(result, ['product', 'credits'])

				var bid = _.last(result.bids)

				var response = {
					winner: {
						user: result.winner
					},
					auction_id:result._id,
					status: true
				}

				io.emit('auction:winner', response)

				if (isDev) console.log('finish auction', response)
			})

	}

	function changeTimeAuction (auction) {
		io.emit('auction:changetime', auction)
		if (isDev) console.log('auction:change Time', auction)
	}

	function bidAuction (data, fn) {
		var newbid = {
			idUser: data.user.id,
			user: data.user.username
		}

		if (Timer.isActive) {

			AuctionDao.model.findByIdAndUpdate(data.auction,
				{ $push: {'bids':newbid}, $inc: {price: 50}},
				{safe: true, upsert: true, new : true},
				(err, result) => {
					if (err) throw new Error('Error')

					result = result.toObject()

					result = _.omit(result, ['product','active'])

						var bid = _.last(result.bids)

						var response = {
							username: bid.user,
							time: bid.time,
							auction_id:result._id,
							price: result.price,
							time_init: result.time_rules.init
						}

						// reset timer...
						Timer.reset(result._id.toString(), result.time_rules.init)

						// register transaction initial
						TransactionDao.save({
							user: newbid.idUser,
							quantity: result.credits_required,
							type: "Spend",
							sign: 50,
							isActive:true
						}, function (transaction) {

							if (transaction) {
								// bid
								let bidInfo = {
									transaction: transaction._id,
									auction: result._id,
									user: newbid.idUser
								}

								BidDao.save(bidInfo, (bid) => {
									fn({reset: true})
									refresh(response)
								})
							}
						})
					})
				}
			}

			function refresh (data) {
				io.emit('auction:refresh', data)
			}

			function registerWinner (data) {
				io.emit('auction:winner', data)
			}

			return {
				bidAuction:bidAuction,
				finishAuction: finishAuction,
				preFinishAuction: preFinishAuction,
				changeTimeAuction: changeTimeAuction
			}
	}
