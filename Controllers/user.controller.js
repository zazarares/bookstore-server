const userService = require("../services/user.service");
const createFilter=require("../utils/create-filter");
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
    async CheckCredentials(req, res) {
        try {
            const userExists = await userService.CheckCredentials({username: req.params.username, password: req.params.password});
            res.status(200).json(userExists);
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
            const user =  {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            };
            await userService.createUser(user);
            res.status(201).json({message:"User Created Succesfully", user: user});
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