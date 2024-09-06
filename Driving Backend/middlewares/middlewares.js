const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized. Token not provided.',
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({
                status: 403,
                error: 'Forbidden. Invalid token.',
            });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
};