'use strict'

let configController = require('../controllers/configuration-controller')
let userController = require('../controllers/user-controller')
let authController = require('../controllers/auth-controller')
let auctionController = require('../controllers/auction-controller')
let productController = require('../controllers/product-controller')
let UserDao = require('../dao/user-dao')

let passport = require('passport')
require('../config/passport-setup')(passport, UserDao)

module.exports = (app) => {

	let routes = [
		{
			endpoint: '/config',
			verbose: 'get',
			controller: configController.list,
			auth: true
		},

		{
			endpoint: '/config',
			verbose: 'post',
			controller: configController.save,
			auth: true
		},

		// user
		{
			endpoint: '/users',
			verbose: 'post',
			controller: userController.save
		},

		{
			endpoint: '/users/me',
			verbose: 'get',
			controller: userController.me,
			auth: true
		},

		// auth
		{
			endpoint: '/authenticate',
			verbose: 'post',
			controller: authController.authenticate
		},

		// auctions
		{
			endpoint: '/auctions',
			verbose: 'post',
			controller: auctionController.save,
			auth: true
		},

		{
			endpoint: '/auctions',
			verbose: 'get',
			controller: auctionController.list,
			auth: true
		},

		// products
		{
			endpoint: '/products',
			verbose: 'post',
			controller: productController.save,
			auth: true
		}
	]

	for (let i in routes) {
		var config = routes[i]
		if (config.auth) {
			app[config.verbose](config.endpoint,
				passport.authenticate('jwt', {session:false}),
				config.controller)
		} else {
			app[config.verbose](config.endpoint, config.controller)
		}
	}

	return app
}
