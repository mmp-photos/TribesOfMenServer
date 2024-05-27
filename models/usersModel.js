const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const currentDate = Date.now;
console.log(currentDate);

const userSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: currentDate,
    },
    lastLogin: {
        type: Date,
        required: false
    },
    lastLogout: {
        type: Date,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    termsAccepted: {
        type: String,
        required: true,
        default: "DNEY"
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    profile: {
        type: String,
        required: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);