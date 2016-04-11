'use strict'
let TransactionDao = require('../dao/transaction-dao')
let _ = require('underscore')

function TransactionController () {

  return {
    save: (req, res) => {

      TransactionDao.save(req.body, (transaction) => {
        let response  =  {
          message: 'Saved transaction successfully',
          response: _.omit(transaction, '__v')
        }

        res.status(200).json(response)
      }, (err)=> console.log(err))
    },

    list: (req, res) => {
      TransactionDao.list({}, (transactions) => {
        res.status(200).json(transactions)
      })
    },

    update: (req, res) => {
      var params = req.body

      TransactionDao.update(params.id, _.omit(params, 'id'), (transactions) => {
        res.status(200).json(transactions)
      }, (error) => {
        res.status(200).json(error)
      })
    }
  }
}

module.exports = TransactionController()
