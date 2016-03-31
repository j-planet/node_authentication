/**
 * Created by jj on 3/28/16.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


// Define our model. Mongoose schema.
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String
});

// on pre-save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    // generate a salt, then run callback. 10: computational complexity of the hashing
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        })
    });
});


// create the model class. represents all users.
const UserModelClass = mongoose.model('user', userSchema);


// export the model
module.exports = UserModelClass;