'use strict'

let UserDao = require('../dao/user-dao')
let _ = require('underscore')

module.exports = {

	list: (req, res) => {
		UserDao.list({}, (data)=> {
			res.status(200).send(data)
		}, (err)=> {
			throw 'Error'
		})
	},

	save: (req, res, next) => {

		var params = req.body

		UserDao.save(params, (data) => {

			var response  =  {
				message: 'Saved user successfully',
				response: _.omit(data, ['password'])
			}

			res.status(200).json(response)

		}, (err) => {
			res.send(err)
		})
	}
}
