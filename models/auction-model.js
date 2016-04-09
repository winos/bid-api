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
		start_at:{type:Date, default: Date.now}
	},
	bids: [
		{
			time: {type:Date, default: Date.now},
			user: String
		}
	],
	winner: {
		user: String,
		time: {type:Date, default: Date.now}
	},
	active: Boolean
})

module.exports = mongoose.model('Auction', auctionSchema)
