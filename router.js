/**
 * Created by jj on 3/27/16.
 */

const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');     // to hook up the passport middleware

// authenticate the token
const requireAuth = passport.authenticate('jwt', { session: false });

// log in
const requireSignin = passport.authenticate('local', { session: false });



// NOTE: both requireAuth and requireSignin middleware inject "uesr" into the req object consumed by the Authentication controller.

module.exports = function(app)
{
    app.get('/', requireAuth, function(req, res)
    {
        console.log(req);
        res.send({ hi: 'there'});
    });

    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);
};