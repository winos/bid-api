'use strict'

let mongoose = require('mongoose')
,   Schema = mongoose.Schema
,   jwtToken = require('jwt-simple')

const secret = process.env.SECRET || require('../config/setup').jwt.token

let userSchema = new Schema({
    id: Number,
    name: String,
    token: String,
    username: String,
    lastname: String,
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

userSchema.pre('save', function (next) {

    var token = {
        username: this.username,
        credits: this.credits,
        email: this.email,
        id: this._id,
        name: this.name,
        lastname: this.lastname
    }

    this.token = jwtToken.encode(token, secret)
    next()
})

module.exports = mongoose.model('User', userSchema)
