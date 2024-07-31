const User = require("../model/User");
const getUsers = async () => {
    try {
        return await User.find();
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const getUserByUsername = async (filter = {}) => {
    try {
        console.log(filter);
        return await User.find(filter);
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const createUser = async (user) => {
    try {
        const savedUser=new User(user);
        savedUser.save();
    } catch (err) {
        console.error('Error retrieving Users:', err);
    }
}
const updateUser = async (id, user) => {
    try {
        await User.findByIdAndUpdate(id, user, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const deleteUser = async (id) => {
    try {
        console.log(id);
        await User.findByIdAndDelete(id, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const getUserByFilters=async(filters,sortBy,sortOrder,limit) =>
{
    try{
        return await User.find(filters).sort({ [sortBy]: sortOrder }).limit(limit);
    }
    catch (e) {

    }
}
module.exports = {getUsers, getUserByUsername, createUser, updateUser, deleteUser,getUserByFilters};