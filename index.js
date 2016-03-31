/**
 * Created by jj on 3/27/16.
 */

const app = require('express')();
const router = require('./router');     // the routes that we wrote
const mongoose = require('mongoose');


// DB setup
mongoose.connect('mongodb://localhost:auth/auth');      // locally hosted mongodb. creates a new db. db name: auth


// app setup and middleware.
app.use(require('morgan')('combined'));                // morgan logs stuff. for debugging.
app.use(require('body-parser').json({ type: '*/*' }));  // parse everything as json
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = require('http').createServer(app);
server.listen(port);
console.log('Server listening on:', port);