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
const verifyAdminToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expect "Bearer token"

    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        if(req.params.id!==user.id) return res.sendStatus(403);
        if(req.params.isAdmin!==user.isAdmin) return res.sendStatus(403);
        if(req.params.isAdmin!==true) return res.sendStatus(403);

        req.user = user; // Add user info to request
        next();
    });
};

module.exports = {authenticateToken, verifyAdminToken};
