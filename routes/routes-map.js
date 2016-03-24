'use strict'

let configController = require('../controllers/configuration-controller')

module.exports = (app) => {

	let routes = [
		{
			endpoint: '/config',
			verbose: 'get',
			controller: configController.list
		}
	]

	for (let i in routes) {
		var config = routes[i]
		app[config.verbose](config.endpoint, config.controller)
	}

	return app
}
