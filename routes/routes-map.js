'use strict'

let configController = require('../controllers/configuration-controller')
let userController = require('../controllers/user-controller')
let authController = require('../controllers/auth-controller')
let auctionController = require('../controllers/auction-controller')
let productController = require('../controllers/product-controller')

module.exports = (app) => {

	let routes = [
		{
			endpoint: '/config',
			verbose: 'get',
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
		},

		// auctions
		{
			endpoint: '/auctions',
			verbose: 'post',
			controller: auctionController.save
		},

		{
			endpoint: '/auctions',
			verbose: 'get',
			controller: auctionController.list
		},

		// products
		{
			endpoint: '/products',
			verbose: 'post',
			controller: productController.save
		}
	]

	for (let i in routes) {
		var config = routes[i]
		app[config.verbose](config.endpoint, config.controller)
	}

	return app
}
