const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("Authorization header missing or malformed.");
        req.user = null;
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token successfully decoded:", decoded);
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (error) {
        console.error("Invalid token:", error.message);
        req.user = null;
        return next();
    }
};
