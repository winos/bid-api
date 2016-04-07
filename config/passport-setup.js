'use strict'
const secret = require('./setup').jwt.token
,	JwtStrategy = require('passport-jwt').Strategy
, ExtractJwt = require('passport-jwt').ExtractJwt

var opts = {
	jwtFromRequest : ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'}),
	secretOrKey : secret
}

module.exports = (passport, userDao) => {
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		userDao.me(jwt_payload.id, (err, user) => {
			if (err) done(err, false)

			done(null, user)
		})
	}))
}
