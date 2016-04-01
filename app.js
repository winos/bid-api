'use strict'
// lib, config
let express = require('express')
, 	bodyParser = require('body-parser')
, 	cors = require('cors')
, 	config = require('./config/setup')

// server
,	app = express()
,	http = require('http').createServer(app)
,	io = require('socket.io').listen(http)
,   routerApp = require('./routes/routes-map')
// db
, 	mongoose = require('mongoose')

const port = process.env.PORT || 8080

mongoose.connect(config.dbConnection);

// config express
app
	.use(bodyParser.json())
	.use(cors())

// load routes
app.use(routerApp(express.Router()))

io.on('connection', (socket)=> {
	let serviceSocket  =  require('./service/')(io)
  	socket.on('auction:newbid', serviceSocket.bid)
})

http
	.listen(port, (err) => {
		if(err) throw err
		console.log(`listen in ${port}`)
	})
