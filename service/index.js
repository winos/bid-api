'use strict'
let AuctionDao = require('../dao/auction-dao')
const bidTimer = require('../lib/bid-timer')
const timer = new bidTimer()

let _ = require('underscore')

module.exports = (io) => {

	//updateTimeAuction()
	
	timer.on('finishAuction', function(auction) {
		registerWinner(auction)
		console.log('finish auction', auction.id)
	})

	timer.on('changeTimeAuction', function(auction) {
		console.log('changeTime', auction.id)
	})

	function bid (data, fn) {
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

					fn({reset: true})

					//updateTimeAuction()

					if ( time > 0 ) {
	        			refresh(response)
					} else {
						registerWinner(data)
					}
				})
	}

	function refresh (data) {
		io.emit('auction:refresh', data)
	}

	function registerWinner (data) {
		io.emit('auction:winner', data)
	}


	function updateTimeAuction () {
		var auctionsCollection
		AuctionDao.list({}, (data)=> {
			auctionsCollection = data
		}, (err)=> {

		})

		for (var i in auctionsCollection) {
			timer.addTimer()
		}

		timer.run()
	}

	return {
		bid:bid
	}		
}
