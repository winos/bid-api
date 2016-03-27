'use strict'

let AuctionModel = require('../models/auction-model')

function auctionDao(Model) {

	// Public methods
	return {

		list: (criteria, success, error) => {

			Model.find(criteria, function(err, user) {
	    		if (err) error(err)

	    		if (typeof success === 'function')
	    			success(user)        		
			})
		},

		save: (data, success, error) => {
			let tmp = new Model(data)

			tmp.save(data)
				.then((auction)=> {
					if (auction) {
						if (typeof success === 'function')
	    					success(auction.toObject())  
					}
				})
		}
	}
}

module.exports = new auctionDao(AuctionModel) 
