'use strict'
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let creditsSchema = new Schema({
  code: {
    required: true,
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type:  Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
})

module.exports = mongoose.model('Credits', creditsSchema)
