// authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expect "Bearer token"

    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Add user info to request
        next();
    });
};
const generateToken=(user)=>
{
    return jwt.sign({ id: user._id, username: user.username,isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
    });
}
const verifyAdminToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        if(user.isAdmin!==true) return res.sendStatus(403);

        req.user = user; // Add user info to request
        next();
    });
};

module.exports = {authenticateToken, verifyAdminToken,generateToken};
