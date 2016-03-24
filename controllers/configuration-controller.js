'use strict'

let Config = require('../models/config-model')

module.exports = {
	list: (req, res) => {
		   Config.find({}, function(err, libros) {
        		res.status(200).send(libros)
				console.log(libros)
    		});
	}
}