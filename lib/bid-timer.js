'use strict'

const _ = require('underscore')
,	util = require('util')

const EventEmitter = require('events')

function Timer (options) {
	this.options = options || {increment: 1000}
  this.timers = []
	this.isActive = true
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
	if (!this.isActive)	return

	var searchTimer = this.findById(id)
	if (searchTimer)
		searchTimer.countdown = time
	else
		this.emit('resetAuction', new Error('the counter has finished'), searchTimer)

	this.emit('resetAuction', null, searchTimer)

	return true
}

Timer.prototype.Run =  function() {
	var self = this

	var counter = setInterval(function () {

		if (!self.timers.length) {
			self.isActive = false
			clearInterval(counter)
		}	else {
			for(var i in self.timers) {
				var timer = self.timers[i]

				if (timer.countdown > 0) {
					timer.countdown--

					self.emit('changeTimeAuction', {
						id:timer._id,
						countdown:timer.countdown
					})
				} else if (timer.countdown === 0) {
					self.emit('preFinishAuction', null, timer, (result) => {
						if (result) {
							self.emit('finishAuction', null, timer)
							self.remove(timer._id)
						}
					})
				}
			}
		}
	}, this.options.increment)
}

module.exports = Timer
