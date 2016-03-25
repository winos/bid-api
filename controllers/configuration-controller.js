'use strict'

let ConfigDao = require('../dao/config-dao')

module.exports = {
	list: (req, res) => {
		ConfigDao.list({}, (data)=> {
			res.status(200).send(data)
		}, (err)=> {
			throw 'Error'
		})
	},

	save: (req, res) => {

/*		let data = {
			name: 'author',
			value:'Dawin Ossa',
			type: 'free',
			active: true,
		}
*/

		ConfigDao.save(data, (data)=> {
			res.status(200).send(data)
		}, (err)=> {
			throw 'Error'
		})
	}
}
