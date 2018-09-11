const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    username: {
        type: String,
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            default: Date.now() + "@gmail.com",
            unique: true,
            validate: {
                validator: function (value) {
                    // Test against the regEx
                    let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return emailRegEx.test(value);
                },
                message: '{VALUE} is not a valid email address'
            }
        },
        password: String,
    },
    google: {
        id: String,
        token: String,
        name: String
    },
    name: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);