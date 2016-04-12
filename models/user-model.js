'use strict'

let mongoose = require('mongoose')
,   Schema = mongoose.Schema
,   jwtToken = require('jwt-simple')

const secret = process.env.SECRET || require('../config/setup').jwt.token

let userSchema = new Schema({
  token: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  city: {
    type: String
    //required: true
  },
  addresses: [{
      street: String,
      tag: String
  }],
  gifts: [{
      gift_id: Number,
      expired_at: Date,
      active: Boolean
  }]
})

userSchema.pre('save', function (next) {
  var token = {
    firstName: this.firstName,
    email: this.email,
    id: this._id,
    username: this.username,
    lastName: this.lastName
  }

  this.token = jwtToken.encode(token, secret)
  next()
})

module.exports = mongoose.model('User', userSchema)
