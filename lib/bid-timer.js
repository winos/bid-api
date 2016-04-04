'use strict'

const _ = require('underscore')
const util = require('util');

let EventEmitter = require('events');

function Timer (options) {
	this.options = options || {increment: 1000}
  	this.timers = []
	EventEmitter.call(this);
}

// extends Timer from EventEmitter
util.inherits(Timer, EventEmitter);

Timer.prototype.addTimer = function (timer) {
	this.timers.push(timer)
	return this
}

Timer.prototype.listTimer = function () {
	return this.timers
}

Timer.prototype.removeTimer = function (id) {
	let searchTimer =  _.find(this.timers, (timer)=>{
		return timer._id === id
	})

	this.timers = _.without(this.timers, searchTimer)
}

Timer.prototype.run =  function() {
	var self = this

	var counter = setInterval(function () {

		for(var i in self.timers) {
			if (self.timers[i].time_init > 0) {
				self.emit('changeTimeAuction', { id:self.timers[i]._id, time:self.timers[i].time_init})			
				self.timers[i].time_init--
			} else {
				self.emit('finishAuction', { id:self.timers[i]._id})
				self.removeTimer(self.timers[i]._id)
			}
		}

		if (self.timers.length === 0) clearInterval(counter)

	}, this.options.increment)
}

module.exports = Timer

/**
 * HOW TO USE?

var auction = {
	_id:1, 
	time_init: 10, 
	tick : function() {
		console.log('i am auction one', this.counter--)	
	}
}

var auction2 = {
	_id:2, 
	time_init: 20,
	tick : function() {
		console.log('i am auction two', this.counter--)	
	},
	reset : function () {
	}
}

const timer = new Timer()

timer.on('finishAuction', function(auction) {
	console.log('finish auction', auction.id)
})

timer
	.addTimer(auction2)
	.addTimer(auction)
	.run()
 *
 *
 */
