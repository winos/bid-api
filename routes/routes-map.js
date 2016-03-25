'use strict'

let configController = require('../controllers/configuration-controller')
let userController = require('../controllers/user-controller')
let authController = require('../controllers/auth-controller')

module.exports = (app) => {

	let routes = [
	
		{
			endpoint: '/config',
			verbose: 'post',
			controller: configController.list
		},

		{
			endpoint: '/config',
			verbose: 'post',
			controller: configController.save
		},

		// user
		{
			endpoint: '/users',
			verbose: 'post',
			controller: userController.save
		},

		// auth
		{
			endpoint: '/authenticate',
			verbose: 'post',
			controller: authController.authenticate
		}
	]

	for (let i in routes) {
		var config = routes[i]
		app[config.verbose](config.endpoint, config.controller)
	}

	return app
}
