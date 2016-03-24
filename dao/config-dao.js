'use strict'

let ConfigModel = require('../models/config-model')

function configDao(Model) {

	// Public methods
	return {

		list: (criteria, success, error) => {

			Model.find(criteria, function(err, config) {
	    		if (err) error(err)

	    		if (typeof success === 'function')
	    			success(config)        		
			})
		}
	}
}

module.exports = new configDao(ConfigModel) 
