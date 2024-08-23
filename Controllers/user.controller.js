const userService = require("../services/user.service");
const createFilter = require("../utils/create-filter");
const dotenv = require('dotenv');
const {generateToken} = require("../utils/auth-middleware");
const {urlToUser} = require("../utils/url-to-object");
dotenv.config();
const getUserByUsername = async (req, res) => {
    try {
        const userList = await userService.getUserByUsername({username: req.params.name});
        res.status(200).json(userList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}


const getUsers = async (req, res) => {
    try {
        const userList = await userService.getUsers();
        res.status(200).json(userList);
    } catch (err) {
        res.status(500).json("Internal Server Error");

    }
}
const getUsersById = async (req, res) => {
    try {
        const user = await userService.getUsersById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json("Internal Server Error");

    }
}

const createUser = async (req, res) => {
    try {
        const sentUser = urlToUser(req);
        const user = await userService.createUser(sentUser);
        const token = generateToken(user);
        res.status(201).json({token: token, user});
    } catch (e) {
        res.status(500).json("Internal Server Error");

    }

}

const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.user.id, urlToUser(req));
        res.status(200).json({
            message: `user with id ${req.params.id} was updated succesfully`,
            user: urlToUser(req)
        })
    } catch (err) {
        res.status(200).json(`Could not update user with id ${req.params.id}`)

    }
}

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.user.id)
        res.status(200).json(`Deleted user with id ${req.params.id}`);
    } catch (e) {
        res.status(200).json(`Could not delete user with id ${req.params.id}`);

    }
}
const filterUsers = async (req, res) => {
    {
        const {filters, sortBy, sortOrder, limit, ok} = createFilter.createFilter(req, "user");
        if (!ok) {
            res.status(500).json("invalid parameters");
            return;
        }
        try {
            const filteredUsers = (await userService.getUserByFilters(filters, sortBy, sortOrder, limit));
            res.status(200).json(filteredUsers);
        } catch (err) {
            res.status(500).json(`Could not delete user with id ${req.params.id}`);
        }
    }
}
const errorNotFound = (req, res) => {
    res.status(404);
};
module.exports = {
    getUserByUsername,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    filterUsers,
    getUsersById,
    errorNotFound
};