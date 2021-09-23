const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose); // passportLocalMongoose adds a username, hash and salt fields into the Schema

module.exports = mongoose.model('User', userSchema);