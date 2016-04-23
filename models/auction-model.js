'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let auctionSchema = new Schema({
  code: {
    type: String
  },
  credits_required: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  price: {
    type: Number,
    default: 0
  },
  time_rules: {
    init: {
      type: Number,
      required: true,
      default: 30
    },
    start_at:{
      type:Date,
      default: Date.now
    }
  },
  bidsRequired: {
    type: Number,
    required: true
  },
  bids: [
    {
      time: {type:Date, default: Date.now},
      user: String
    }
  ],
  winner: {
    user: String,
    time: {
      type:Date,
      default: Date.now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Auction', auctionSchema)
