'use strict'

let ProductDao = require('../dao/product-dao')
let _ = require('underscore')

function AuctionController () {

	return {
		save : (req, res) => {
			let params = req.body

			ProductDao.save(params, (data) => {

				let response  =  {
					message: 'Saved product successfully',
					response:data
				}

				res.status(200).json(response)

			}, (err) => {
				res.send(err)
			})
		},

		list: (req, res) => {
			ProductDao.list({}, (data)=> {
				var response  =  {
					message: 'List of auctions',
					response:data
				}
				res.status(200).json(response)
			}, (err)=> {
				throw 'Error'
			})
		},
	}
}
module.exports = AuctionController()
