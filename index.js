/**
 * Created by jj on 3/27/16.
 */

const app = require('express')();
const router = require('./router');     // the routes that we wrote


// app setup
// middleware
app.use(require('morgan')('combined'));                // morgan logs stuff. for debugging.
app.use(require('body-parser').json({ type: '*/*' }));  // parse everything as json
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on:', port);