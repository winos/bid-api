'use strict'

let AuctionModel = require('../models/auction-model')
let ProductDao = require('./product-dao')

function auctionDao(Model) {

	// Public methods
	return {

		list: (criteria, success, error) => {

			Model.find(criteria, function(err, auction) {

				ProductDao.model
					.populate(auction, {path:'product'}, (err, auction)=>{
		    			if (err) error(err)
		    			if (typeof success === 'function')
		    				success(auction)        		

				})
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
