'use strict'
let AuctionDao = require('../dao/auction-dao')
let _ = require('underscore')

module.exports = (io, isDev, Timer) => {
	
	this.lastUser = {}

	function finishAuction (error, auction) {
		if (error) throw new Error('An error has ocurred')
		AuctionDao.model
			.findByIdAndUpdate(auction.id, 
				{'active': false, 'winner': {'user':'Dawin Ossa'}}, 
	        	{safe: true, upsert: true, new : true},
	        	(err, result) => {
	        		if (err) throw new Error(err)

	        		result = result.toObject()
	        		
	        		result = _.omit(result, 
	        			['product', 'credits'])
	        		
	        		var bid = _.last(result.bids)
	        		
	        		var response = {
	        			winner: {
	        				user: result.winner
	        			},
	        			auction_id:result._id,
	        			status: true
	        		}

	        		io.emit('auction:winner', response)

	        		if (isDev)
						console.log('finish auction', response)
				})
	}

	function changeTimeAuction (auction) {
		io.emit('auction:changetime', auction)
		
		if (isDev)
			console.log('auction:change Time', auction)
	}

	function bidAuction (data, fn) {
		var newbid = {user: data.user.username}
		
		AuctionDao.model
			.findByIdAndUpdate(data.auction, 
				{ $push: {'bids':newbid}, $inc: {price: 50}}, 
	        	{safe: true, upsert: true, new : true},
	        	(err, result) => {
	        		if (err) throw new Error('Error')

	        		result = result.toObject()
	        		
	        		result = _.omit(result, 
	        			['product', 'credits','active'])
	        		
	        		var bid = _.last(result.bids)
	        		
	        		var response = {
	        			username: bid.user,
	        			time: bid.time,
	        			auction_id:result._id,
	        			price: result.price,
	        			time_init: result.time_rules.init
	        		}

	        		// reset timer...
					Timer.reset(result._id, result.time_rules.init)
					fn({reset: true})
					refresh(response)
				})
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
		changeTimeAuction: changeTimeAuction		
	}		
}
