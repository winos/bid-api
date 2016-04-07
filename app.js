'use strict'
// lib, config
let express = require('express')
,	bodyParser = require('body-parser')
, cors = require('cors')
, config = require('./config/setup')

// server
,	app = express()
,	http = require('http').createServer(app)
,	io = require('socket.io').listen(http)
, routerApp = require('./routes/routes-map')
// db
, mongoose = require('mongoose')

// constants
const port = process.env.PORT || 8080
const isDev = process.env.DEV || false

const BidTimer = require('./lib/bid-timer')
const timer = new BidTimer()

mongoose.connect(config.dbConnection);

// config express
app
	.use(bodyParser.json())
	.use(cors())

// load routes
app.use(routerApp(express.Router()))

var auctionsCollection = [
	{countdown: 10, _id:'56feef953caa2b7b2864f17e'},
	{countdown: 10, _id:'56fef1fa3caa2b7b2864f198'}
]

timer
	.add(auctionsCollection)
	.Run()


let serviceSocket  =  require('./service/')(io, isDev, timer)

timer.on('changeTimeAuction', serviceSocket.changeTimeAuction)

// reset timer auction
timer.on('resetAuction', (error, timer) => {
	if (error) throw error.message
})


timer.on('finishAuction', serviceSocket.finishAuction)

io.on('connection', (socket) => {
	socket.on('auction:newbid', serviceSocket.bidAuction)
})

http.listen(port, (err) => {
	if(err) throw err
	console.log(`listen in ${port}`)
})
