const mongoose = require('mongoose'); // Require the mongoose instance from db.js

const userSchema = new mongoose.Schema({
    name: {type: String, required: true,unique:true},
    username: {type: String, required: true},
    email: {type: String, required: true,unique:true,match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},

});

const User = mongoose.model('User', userSchema);

module.exports = User;