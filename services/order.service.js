const Order = require("../model/Order");
const getOrders = async () => {
    try {
        return await Order.find();
    } catch (err) {
        console.error('Error retrieving Orders:', err);
    }
};
const createOrder = async (order) => {
    try {
        const SavedOrder=new Order(order);
        SavedOrder.save();
    } catch (err) {
        console.error('Error creating Orders:', err);
    }
}
const updateOrder = async (id, order) => {
    try {
        await Order.findByIdAndUpdate(id, order, {new: true}).exec();
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
const getOrdersByUserId = async (id) => {
    try {
        return await Order.find({userId:id});
    } catch (err) {
        console.log("Error")
    }
}
module.exports = {getOrders, createOrder, updateOrder, deleteOrder,getOrdersByUserId};