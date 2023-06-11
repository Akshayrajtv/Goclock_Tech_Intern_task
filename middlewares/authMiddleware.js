// authMiddleware.js

import { verify } from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Set the decoded token directly to req.user
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default authMiddleware;
