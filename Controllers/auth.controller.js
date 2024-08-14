const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userService = require("../services/user.service");
dotenv.config();
class AuthController {
    constructor() {
    }
    async CheckCredentials(req, res) {
        try {
            const user = await userService.CheckCredentials({username: req.params.username, password: req.params.password});
            const token= jwt.sign({ id: user._id, username: user.username,isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
                expiresIn: '1h', // Token expiration time
            });
            res.status(200).json({token:token,user:user});
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }
}
module.exports= AuthController