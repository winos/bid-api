'use strict'

let mongoose = require('mongoose')

let Schema = mongoose.Schema

let guestsSchema = new Schema({  
    name: String,
    email: String,
    invite_at: Date,
    active: Boolean
    invited_id: Number
})

module.exports = mongoose.model('Guest', guestsSchema);  
