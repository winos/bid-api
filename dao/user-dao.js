'use strict'

let UserModel = require('../models/user-model')
let bcrypt = require('bcrypt-nodejs')
let jwtToken = require('jwt-simple')
let secret = process.env.SECRET || require('../config/setup').jwt.token

function userDao(Model) {

	// Public methods
	return {

		list: (criteria, success, error) => {

			Model.find(criteria, function(err, user) {
	    		if (err) error(err)

	    		if (typeof success === 'function')
	    			success(user)        		
			})
		},

		find: (criteria, success, error) => {
			
			Model.findOne({email:criteria.email}, function(err, user) {

	    		if (err) error(err)

	    		if (typeof success === 'function')
	    			
	    			if (!user) 
	    				return success({status: false, 'message': 'user not found', data:null})        		
	    			
	    			bcrypt.compare(criteria.password, user.password,

	    				(err, res) => {
							if (res === true)
		    					success({
		    						status: true, 
		    						message: 'success',
		    						data: {
		    							token:user.token
		    						}
		    					})        		
							else
		    					success({status: false, message: 'Authentication failed. wrong password', data: null})        		
					})
			})
		},

		save: (data, success, error) => {
			data.password = bcrypt.hashSync(data.password)
			//data.token =  "Dawin" //jwtToken.encode(data, secret)
			let tmp = new Model(data)

			tmp.save(data)
				.then((user)=> {
					if (user) {
						if (typeof success === 'function'){
							var userDecode = user.toObject()
							
							var token = {
								username: userDecode.username,
								credits: userDecode.credits,
								email: userDecode.email,
								id: userDecode._id,
								name: userDecode.name,
								lastname: userDecode.lastname,
							}

							token = jwtToken.encode(token, secret)
							//user.updateToken()
	    					Model.findOneAndUpdate(userDecode._id.toString(), {token: token}, (err, data) =>{
	    						console.log('here exists token', err)
	    						success(user.toObject())  
	    					})
						}
					}
				})
		},

		update: (id, data, success) => {
			Model
			.findByIdAndUpdate(id, data, 
	        	{safe: true, upsert: true, new : true},
	        	(err, result) => {
	        		if (err) success(new Error(err), null)
	        		
	        		success(null, result.toObject())
	        	})
		},

		me: (id, success) => {
			Model.findOne({_id:id}, (err, user) => {
				if (err) success(new Error(err), null)

	        	success(null, user.toObject())
			})
		}
	}
}

module.exports = new userDao(UserModel) 
