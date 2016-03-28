/**
 * Created by jj on 3/28/16.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
    email: String,
    password: String
});

// create the model class


// export the model