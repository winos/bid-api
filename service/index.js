'use strict'
let AuctionDao = require('../dao/auction-dao')
let _ = require('underscore')

module.exports = (io) => {

	function bid (data, fn) {
		var newbid = {user: data.user.username}
		var self = this
		
		AuctionDao.model
			.findByIdAndUpdate(data.auction, 
				{ $push: {'bids':newbid}, $inc: {price: 50}}, 
	        	{safe: true, upsert: true, new : true},
	        	(err, result) => {
	        		if (err) throw 'Error'

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
	        		refresh(response)
				})
	}

	function refresh (data) {
		io.emit('auction:refresh', data)
	}

	return {
		bid:bid
	}		
}
