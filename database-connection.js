const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URL+process.env.DB_NAME;
function connectToDatabase() {
    mongoose.connect(uri);
    const db=mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to the database');
    });
    return mongoose;
}

module.exports = connectToDatabase;
