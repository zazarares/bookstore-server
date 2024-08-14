const mongoose = require('mongoose'); // Require the mongoose instance from db.js

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    url: {type: String, required: true},
    quantity: {type:Number,required:true}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;