'use strict'

const _ = require('underscore')
,	util = require('util')

let EventEmitter = require('events')

function Timer (options) {
	this.options = options || {increment: 1000}
  	this.timers = []
	EventEmitter.call(this)
}

// extends Timer from EventEmitter
util.inherits(Timer, EventEmitter)

Timer.prototype.add = function (timer) {
	
	if (Array.isArray(timer)) {
		for (var i in timer) {
			this.timers.push(timer[i])
		}
	} else {
		this.timers.push(timer)
	}
	return this
}

Timer.prototype.list = function () {
	return this.timers
}

Timer.prototype.findById = function (id) {
	return _.find(this.timers, (timer)=>{
		return timer._id === id
	})
}

Timer.prototype.remove = function (id) {
	let searchTimer =  this.findById(id)
	this.timers
		.splice(this.timers.indexOf(searchTimer), 1)
}

Timer.prototype.reset = function (id, time) {
	var searchTimer = this.findById(id.toString())
	
	if (searchTimer)
		searchTimer.countdown = time
	else 	
		this.emit('resetAuction', new Error('failed'), searchTimer)
	
	this.emit('resetAuction', null, searchTimer)

	return true 
}

Timer.prototype.Run =  function() {
	var self = this

	var counter = setInterval(function () {
		
		if (!self.timers.length) 
			clearInterval(counter)
		else {
			for(var i in self.timers) {
				if (self.timers[i].countdown > 0) {
					self.timers[i].countdown--
					self.emit('changeTimeAuction', { id:self.timers[i]._id, countdown:self.timers[i].countdown})			
				} else if (self.timers[i].countdown === 0) {
					self.emit('finishAuction', null, { id:self.timers[i]._id})
					self.remove(self.timers[i]._id)
				}
			}
		}
	}, this.options.increment)
}

module.exports = Timer

/**
 * HOW TO USE?

var auction = {
	_id:1, 
	time_init: 10
}

var auction2 = {
	_id:2, 
	time_init: 20,
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
