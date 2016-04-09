'use strict'

let mongoose    = require('mongoose')
,   Schema      = mongoose.Schema
,   ObjectId    = mongoose.Types.ObjectId;

let transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: 'Income Gift Spend'.split(' ')
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sign: {
      type: String
      //required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)
