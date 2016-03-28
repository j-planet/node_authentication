/**
 * Created by jj on 3/27/16.
 */

module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.send(['blah', 'h']);
    });
};