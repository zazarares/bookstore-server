const orderService = require("../services/order.service");
const Book = require("../model/Book");
class OrderController {
    constructor() {

    }
    async getOrders(req, res) {
        try {
            const orderList = await orderService.getOrders();
            res.status(200).json(orderList);
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }
    async getOrdersByUserID(req, res) {
        try {
            const orderList = await orderService.getOrdersByUserId(req.params.id);
            res.status(200).json(orderList);
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

    async createOrder(req, res) {
        const { userId, books } = req.body;
        let totalPrice = 0;
        console.log(books);
        for (let item of books) {
            const book = await Book.findById(item.book._id); // Find the book by its ID
            if (!book) {
                return res.status(400).json({ message: `Book with ID ${item.book} not found` });
            }
            totalPrice += book.price * item.quantity;
        }
        try {
            const order = {
                userId: userId,
                books: books,
                totalPrice: totalPrice,
                date: Date.now(),
            };
            await orderService.createOrder(order);
            res.status(201).json({message: "order Created Successfully\norder: ", order: order});
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

    async updateOrder(req, res) {
        try {
            const { userId, books,date } = req.body;
            let totalPrice = 0;

            for (let item of books) {
                const book = await Book.findById(item.book); // Find the book by its ID
                if (!book) {
                    return res.status(400).json({ message: `Book with ID ${item.book} not found` });
                }
                totalPrice += book.price * item.quantity;
            }
            await orderService.updateOrder(req.params.id, {
                userId: userId,
                books: books,
                totalPrice: totalPrice,
                date: date,
            });
            res.status(200).json({
                message: `Book with id ${req.params.id} was updated successfully`, order: {
                    userId: userId,
                    books: books,
                    totalPrice: totalPrice,
                    date: date,

                }
            });
        } catch (err) {
            res.status(500).json(`Could not update book with id ${req.params.id}`);
        }
    }

    async deleteOrder(req, res) {
        try {
            await orderService.deleteOrder(req.params.id);
            res.status(200).json(`Deleted book with id ${req.params.id}`);
        } catch (err) {
            res.status(500).json(`Could not delete book with id ${req.params.id}`);
        }
    }
    errorNotFound(req, res) {
        res.status(404).json({message: 'Not Found'});
    }
}



module.exports = OrderController;