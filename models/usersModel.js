const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const  userSchema = new mongoose.Schema({
    accountType: {
        type: String,
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
    },
    lastLogout: {
        type: Date,
    },
    dob: {
        type: Date,
    },
    termsAccepted: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    avatar: {
        type: String,
        required: false
    },
    email: {
        type: String,
    },
    profile: {
        type: String,
        required: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);