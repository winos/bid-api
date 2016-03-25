'use strict'

let express = require('express')
, 	bodyParser = require('body-parser')
, 	cors = require('cors')
, 	config = require('./config/setup')

,	app = express()
,   routerApp = require('./routes/routes-map')

, 	mongoose = require('mongoose')

const port = process.env.PORT || 8080

mongoose.connect(config.dbConnection);

// config express
app
	.use(bodyParser.json())
	.use(cors())

// load routes
app.use(routerApp(express.Router()))


app
	.listen(port, (err) => {
		if(err) throw err
		console.log(`listen in ${port}`)
	})
