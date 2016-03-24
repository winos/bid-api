'use strict'

let express = require('express')
, 	bodyParser = require('body-parser')

,	app = express()
,   routerApp = require('./routes/routes-map')

, 	mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bidking');

// config express
app.use(bodyParser.json())

// load routes
app.use(routerApp(express.Router()))

const port = process.env.PORT || 8080

app
	.listen(port, (err) => {
		if(err) throw err
		console.log(`listen in ${port}`)
	})
