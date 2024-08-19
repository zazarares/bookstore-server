const mongoose = require('mongoose');
const bookItemSchema = new mongoose.Schema({
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true}, // Reference to the Book model
    quantity: {type: Number, required: true},  // Quantity of each book in the order
    price: {type: Number, required: true},
    name: {type: String, required: true}
}, {_id: false});
const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    books: [{type: bookItemSchema}],
    totalPrice: {type: Number, required: true},
    date: {type: Date, required: true},

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;