/**
 * Created by jj on 3/30/16.
 */

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserModel = require('../models/user');
const config = require('../config');


// for configuring "strategy"
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),     // how to extracted ENCRYPTED token
    secretOrKey: config.secret                                  // key to DECRYPT token
};


// create jwt strategy. function: called everytime for authentication
// payload: decrypted token: {sub:..., iat:...}
// done: call back
const jwtLoginStrategy = new JwtStrategy(jwtOptions, function(payload, done) {

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
passport.use(jwtLoginStrategy);