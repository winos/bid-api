'use strict'

let UserDao = require('../dao/user-dao')
let TransactionDao = require('../dao/transaction-dao')
let _ = require('underscore')

module.exports = {

	list: (req, res) => {
		UserDao.list({}, (data)=> {
			res.status(200).send(data)
		}, (err)=> {
			throw 'Error'
		})
	},

	me: (req, res) => {
		var user = req.user
		if (!user)
			res.status(400).json({error: "params user is required"})

		res.status(200).json(user)
	},

	save: (req, res, next) => {

		var params = req.body
		params.birthday = new Date(params.birthday)
		//_.extend(params, {credits: {general: 100}})

		UserDao.save(params, (data) => {

			// register transaction initial
			TransactionDao.save({
				user: data._id,
				quantity: 1000,
				type: "Income",
				sign: 50
			}, function (transaction) {

				if (transaction) {
					
					var response  =  {
						message: 'Saved user successfully',
						response: _.omit(data, ['password'])
					}

					res.status(200).json(response)
				}
			})
		}, (err) => {
			res.send(err)
		})
	}
}
