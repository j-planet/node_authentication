/**
 * Created by jj on 3/27/16.
 */

const Authentication = require('./controllers/authentication');



module.exports = function(app) {
    app.post('/signup', Authentication.signup);
};