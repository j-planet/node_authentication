/**
 * Created by jj on 3/30/16.
 */

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const UserModel = require('../models/user');
const config = require('../config');



// Log In
const localOptions = {usernameField: 'email'};
const loginStrategy = new LocalStrategy(localOptions, function(email, password, done) {
    UserModel.findOne({email: email}, function(err, user) {

        // db error
        if (err) { return done(err); }

        // no such user
        if (!user) { return done(null, false);}

        // user exists => check password
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }

            return done(null, isMatch ? user : false);
        })

    })
});


// for configuring "strategy"
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),     // how to extracted ENCRYPTED token
    secretOrKey: config.secret                                  // key to DECRYPT token
};


// create jwt strategy. function: called everytime for authentication
// payload: decrypted token: {sub:..., iat:...}
// done: call back
const jwtAuthStrategy = new JwtStrategy(jwtOptions, function(payload, done)
{
    // check whether user ID is legit
    UserModel.findById(payload.sub, function(err, user) {

        if (err)    // err: only if there's sth wrong with the DB itself. NOT when the user isn't found.
        {
            return done(err, false);
        }

        done(null, user || false);
    });
});


// tell passport to use this strategy
passport.use(jwtAuthStrategy);
passport.use(loginStrategy);