'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let productSchema = new Schema({
	sku: String,
	name: String,
	description: String,
	image: [String],
	created_at: Date,
	type: String,
	active: Boolean,
	pricing: {
		price: Number
	},

	manufacture_details: {
    	model_number: String,
    	release_date: Date
  	},
	
	shipping_details: {
		weight: Number,
		width: Number,
		height: Number,
		depth: Number
	}
})

module.exports = mongoose.model('Product', productSchema)
