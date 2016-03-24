'use strict'

let ConfigDao = require('../dao/config-dao')

module.exports = {
	list: (req, res) => {
		ConfigDao.list({}, (data)=> {
			res.status(200).send(data)
		}, (err)=> {
			throw 'Error'
		})
	}
}
