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
		},

		save: (data, success, error) => {
			var tmp = new Model(data)

			tmp.save(data)
				.then((result)=> {
					if (typeof success === 'function')
	    				success({hello:'mama'})  
			})
		}
	}
}

module.exports = new configDao(ConfigModel) 
