'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({  
    id: Number,
    name: String,
    lastname: String ,
    birthday: Date,
    password: String,
    email: String,
    register_at: Date,
    active: Boolean,
    gender: String,
    city: String,
    addresses: [
        {
            street: String,
            tag: String
        }
    ],
    credits: {
        general: Number,
        by_exchange: Number
        /*history: [
            { 
                code: '123133ooska78',
                payment_method: 'efecty',
                created_at: '23-03-2016',
            }
        ]*/
    },
    gifts: [
        {
            gift_id: Number,
            expired_at: Date,
            active: Boolean 
        }
    ],
    winner_auctions: [String]
})

module.exports = mongoose.model('User', userSchema)
