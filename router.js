/**
 * Created by jj on 3/27/16.
 */

const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

// use the 'jwt' strategy
const requireAuth = passport.authenticate('jwt', { session: false });



module.exports = function(app)
{
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there'});
    });

    app.post('/signup', Authentication.signup);
};