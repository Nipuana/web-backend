const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = adminMiddleware;
