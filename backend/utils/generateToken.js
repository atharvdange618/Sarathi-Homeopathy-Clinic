import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No Token Provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Unauthorized: Invalid Token" });
            }
            req.user = user; // Attach user info to request
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        console.error("Error in authenticateToken middleware:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};