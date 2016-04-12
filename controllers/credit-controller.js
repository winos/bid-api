'use strict'

let CreditDao = require('../dao/credit-dao')
let _ = require('underscore')

function CreditController () {

	return {
		save : (req, res) => {
			let params = req.body
			params.userId = req.user._id

			CreditDao.save(params, (data) => {

				let response  =  {
					message: 'Saved credits successfully',
					response: data,
					status: true
				}

				res.status(200).json(response)

			}, (err) => {
				res.send(err)
			})
		},

		list: (req, res) => {
			CreditDao.list({}, (data)=> {
				var response  =  {
					message: 'List of credits',
					response:data
				}
				res.status(200).json(response)
			}, (err)=> {
				res.send(err)
			})
		},
	}
}
module.exports = CreditController()
