'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let auctionSchema = new Schema({  
    code: String,
	credits_required: Number,
	product: { type: String, ref: "Product"}, 
	price: Number, 
	time_rules: {
		init: Number,
		start_at:Date // or now!
	},
	bids: [{
			time: Date, 
			user: Number
		}
	],
	winner: {
		user: String
	},
	active: Boolean
})

module.exports = mongoose.model('Auction', auctionSchema)
