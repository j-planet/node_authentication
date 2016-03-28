/**
 * Created by jj on 3/28/16.
 */

const mongoose = require('mongoose');


// Define our model. Mongoose schema.
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
});


// create the model class. represents all users.
const UserModelClass = mongoose.model('user', userSchema);


// export the model
module.exports = UserModelClass;