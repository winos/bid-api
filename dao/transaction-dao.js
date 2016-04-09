'use strict'

let TransactionModel = require('../models/transaction-model')

function TransactionDao(Model) {

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
				.then((transaction)=> {
					if (transaction) {
						if (typeof success === 'function')
	    					success(transaction.toObject())
					}
				}).catch((data) => error(data))
		},

		update: (id, data, success) => {
			Model.findByIdAndUpdate(id, data, {safe: true, upsert: true, new : true},
			(err, transaction) => {
				if (err) error(err)

				success(transaction)
			})
		},

		model: TransactionModel
	}
}

module.exports = new TransactionDao(TransactionModel)
