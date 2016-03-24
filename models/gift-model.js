'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let giftSchema = new Schema({  
    id:Number,
    name: String,
    description: String,
    active: Boolean,
    credits: Number
})

module.exports = mongoose.model('Gift', giftSchema)
