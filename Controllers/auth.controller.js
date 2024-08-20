const dotenv = require('dotenv');
const userService = require("../services/user.service");
const {generateToken} = require("../utils/auth-middleware");
dotenv.config();
    const CheckCredentials=async(req, res)=>
    {
        try {
            const user = await userService.CheckCredentials({username: req.params.username, password: req.params.password});
            const token= generateToken(user);
            res.status(200).json({token:token,user:user});
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

module.exports= {CheckCredentials}