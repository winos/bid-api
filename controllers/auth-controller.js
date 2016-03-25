'use strict'

let UserDao = require('../dao/user-dao')
let _ = require('underscore')

module.exports = {

	authenticate: (req, res) => {
		let params = req.body
		
		let dataAccess = {
			email: params.email,
			password: params.password 
		}

		UserDao.find(dataAccess, (data)=> {
			if (data.status) {
				res.status(200).send(data)
			} else {
				res.status(400).send(data)
			}
		}, (err)=> {
			throw 'Error'
		})
	},

	save: (req, res, next) => {

		let params = req.body

		UserDao.save(params, (data) => {

			let response  =  {
				message: 'Saved user successfully',
				response: _.omit(data, ['password'])
			}

			res.status(200).json(response)

		}, (err) => {
			res.send(err)
		})
	}
}
