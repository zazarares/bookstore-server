const Order = require("../model/Order");
const createOrder = async (order) => {
    try {
        const SavedOrder=new Order(order);
        return await SavedOrder.save();
    } catch (err) {
        console.error('Error creating Orders:', err);
    }
}
const updateOrder = async (id, order) => {
    try {
        return await Order.findByIdAndUpdate(id, order, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const deleteOrder = async (id) => {
    try {
        await Order.findByIdAndDelete(id, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const getOrders = async (filter) => {
    try {
        return await Order.find(filter);
    } catch (err) {
        console.log("Error")
    }
}
const getOrderById = async (id) => {
    try {
        return await Order.find({_id:id});
    } catch (err) {
        console.log("Error")
    }
}
module.exports = {getOrders, createOrder, updateOrder, deleteOrder,getOrderById};