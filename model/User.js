const mongoose = require('mongoose'); // Require the mongoose instance from db.js

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},

});

const User = mongoose.model('User', userSchema);

module.exports = User;