'use strict'

let BidModel = require('../models/bid-model')

function bidDao (Model) {

  return {
    save: (data, success) => {
      var tmp = new Model(data)
      tmp.save().then((bid) => {
        if (bid) {
          if (success && typeof success === 'function')
              success(bid.toObject())
        }
      })
    }
  }
}

module.exports = new bidDao(BidModel)
