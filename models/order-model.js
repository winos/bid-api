'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let orderSchema = new Schema({  
    code: String,
    created_at: Date,
    payment: {
    	method: String,
    	transaction_code: String
    },
    shipping: {
    	user: String,
    	city: String,
    	address: String,
    	notes: String
    },

    tracking: {
    	company: String,
		tracking_code: String,
		status: String,
		estimate_delivery: Date
    }
    active: Boolean,
    product: [{
    		product_id: String,
    		quantity: Number
    	}]
})

module.exports = mongoose.model('Order', orderSchema)

