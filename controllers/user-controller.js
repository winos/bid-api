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

	me: (req, res) => {
		var user = req.query.user
		if (!user)
			res.status(400).json({error: "params user is required"})

		UserDao.me(user, (err, user)=>{
			if (err) throw err.message

			res.status(200).json(user)
		})
	},

	save: (req, res, next) => {

		var params = req.body
		_.extend(params, {credits: {general: 100}});

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
