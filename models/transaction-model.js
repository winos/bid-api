'use strict'

let mongoose = require('mongoose')
, Schema     = mongoose.Schema
, ObjectId   = mongoose.Types.ObjectId

const  Q = require("q")
, _ = require('underscore')

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

transactionSchema.statics.balance = function (userId) {
  return Q.nbind(this.aggregate, this)([
      {
        $match: { user: new ObjectId(userId)},
      },
      {
        $group: {
          _id: '$type',
          quantity: {$sum: '$quantity'}
        }
      }
  ]).then((results) => {

    var income = _([
      _.findWhere(results,{ _id: 'Income' }),
      _.findWhere(results, { _id: 'Gift' })
    ]).reduce((x,b) => {
      return x + (b && b.quantity) || 0
    }, 0)
    , spend = _.findWhere(results, {type:'Spend'})
    , expense = (spend && spend.quantity || 0)

    return {
      income: income,
      expense: expense,
      balance: income - expense
    }

  }).catch(er=>console.log(er))
}

module.exports = mongoose.model('Transaction', transactionSchema)
