'use strict'

let CreditModel = require('../models/credit-model')
let UsertDao = require('./user-dao')

function creditDao(Model) {

	// Public methods
	return {
		model: CreditModel,
		list: (criteria, success, error) => {

			Model.find(criteria, function(err, credit) {
				UsertDao.model
					.populate(credit, {path:'userId'}, (err, credits)=>{
		    			if (err) error(err)
		    			if (typeof success === 'function')
		    				success(credits)
				})
			})
		},

		save: (data, success, error) => {
			let tmp = new Model(data)

			tmp.save(data)
				.then((credit)=> {
					if (credit) {
						if (typeof success === 'function')
	    					success(credit.toObject())
					}
				})
		}
	}
}

module.exports = new creditDao(CreditModel)
