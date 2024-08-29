const orderService = require("../services/order.service");
const bookService = require("../services/book.service");
const getOrdersByUserID = async (req, res) => {
    try {
        let orderList
        if (req.user.isAdmin === true)
             orderList = await orderService.getOrders();
        else
             orderList = await orderService.getOrders({userId:req.user.id});
        res.status(200).json(orderList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}
const getOrderByID = async (req, res) => {
    try {
        const orderList = await orderService.getOrderById(req.params.id);
        if(orderList[0].userId===req.user.id || req.user.isAdmin === true)
            res.status(200).json(orderList);
        else
            res.status(403).json("nonono");
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

const createOrder = async (req, res) => {
    const {books} = req.body;
    const user = req.user;
    if(req.user.isAdmin === false) {
        try {
            const {finalBookList, totalPrice} = await bookService.getOrderedBooksByID(books)
            const order = {
                userId: user.id,
                books: finalBookList,
                totalPrice: totalPrice,
                date: Date.now(),
            };
            await bookService.checkQuantities(books);
            const finalOrder = await orderService.createOrder(order);
            await bookService.updateQuantities(books);

            res.status(201).json({message: "order Created Successfully\norder: ", order: finalOrder});
        } catch (err) {
            res.status(500).json({error: ["Internal Server Error", err.message]});
        }
    }
}

const updateOrder = async (req, res) => {
    try {
        const {books, date} = req.body;
        const user = req.user;
        const {finalBookList, totalPrice} = await bookService.getOrderedBooksByID(books)

        const order=await orderService.updateOrder(req.params.id, {
            userId: user.id,
            books: finalBookList,
            totalPrice: totalPrice,
            date: date,
        });
        res.status(200).json({
            message: `Book with id ${req.params.id} was updated successfully`, order
        });
    } catch (err) {
        res.status(500).json(`Could not update book with id ${req.params.id}`);
    }
}

const deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.status(200).json(`Deleted book with id ${req.params.id}`);
    } catch (err) {
        res.status(500).json(`Could not delete book with id ${req.params.id}`);
    }
}
const errorNotFound = (req, res) => {
    res.status(404).json({message: 'Not Found'});
}


module.exports = {
    getOrdersByUserID,
    getOrderByID,
    createOrder,
    updateOrder,
    deleteOrder,
    errorNotFound
};