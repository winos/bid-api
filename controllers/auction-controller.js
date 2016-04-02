'use strict'

let AuctionDao = require('../dao/auction-dao')
let _ = require('underscore')

function AuctionController () {
	
	return {
		save : (req, res) => {
			let params = req.body

			AuctionDao.save(params, (data) => {

				let response  =  {
					message: 'Saved auction successfully',
					response:data 
				}

				res.status(200).json(response)

			}, (err) => {
				res.send(err)
			})
		},

		list: (req, res) => {
			AuctionDao.list({}, (data)=> {
				var response  =  {
					message: 'List of auctions',
					response:data 
				}
				res.status(200).json(response)
			}, (err)=> {
				res.send(err)
			})
		},
	}
}
module.exports = AuctionController()
