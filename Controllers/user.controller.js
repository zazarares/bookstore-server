const userService = require("../services/user.service");
const createFilter=require("../utils/create-filter");
const dotenv = require('dotenv');
dotenv.config();
class UserController {
    constructor() {
    }

    async getUserByUsername(req, res) {
        try {
            const userList = await userService.getUserByUsername({username: req.params.name});
            res.status(200).json(userList);
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }


    async getUsers(req, res) {
        try {
            const userList = await userService.getUsers();
            res.status(200).json(userList);
        } catch (err) {
            res.status(500).json("Internal Server Error");

        }
    }

    async createUser(req, res) {
        try {
            const sentUser =  {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            };
            const user = await userService.createUser(sentUser);
            const token= jwt.sign({ id: user._id, username: user.username,isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
                expiresIn: '1h', // Token expiration time
            });
            res.status(201).json({token:token, user});
        } catch (e) {
            res.status(500).json("Internal Server Error");

        }

    }

    async updateUser(req, res) {
        try {
            await userService.updateUser(req.params.id, {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            });
            res.status(200).json({message:`user with id ${req.params.id} was updated succesfully`, user:{name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,} })
        } catch (err) {
            res.status(200).json(`Could not update user with id ${req.params.id}`)

        }
    }

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id)
            res.status(200).json(`Deleted user with id ${req.params.id}`);
        } catch (e) {
            res.status(200).json(`Could not delete user with id ${req.params.id}`);

        }
    }
    async filterUsers(req, res) {
        {
            const {filters,sortBy,sortOrder,limit,ok}=createFilter.createFilter(req,"user");
            if(!ok)
            {
                res.status(500).json("invalid parameters");
                return;
            }
            try {
                const filteredUsers = (await userService.getUserByFilters(filters,sortBy,sortOrder,limit));
                res.status(200).json(filteredUsers);
            } catch (err) {
                res.status(500).json(`Could not delete user with id ${req.params.id}`);
            }
        }
    }
    errorNotFound(req, res) {
        res.status(404);
    }
}

module.exports = UserController;