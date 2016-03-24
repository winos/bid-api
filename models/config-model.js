'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let configurationSchema = new Schema({  
    name: String,
    value: String,
    type: String,
    active: Boolean
})

module.exports = mongoose.model('Config', configurationSchema);  