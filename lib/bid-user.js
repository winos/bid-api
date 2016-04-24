'use strict'
let RandomUser = require('randomuser')

function generateRandomUser (r) {
  return {
    get: function (callback) {
      r.getUsers(function(data) {
        callback(data[0].login.username)
      });
    }
  }
}

module.exports = generateRandomUser(new RandomUser())
