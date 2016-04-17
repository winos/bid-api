'use strict'

let mongoose    = require('mongoose')
,   Schema      = mongoose.Schema;

let bidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  transaction: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Transaction'
  },
  auction: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Auction'
  }
})

module.exports = mongoose.model('Bid', bidSchema)
