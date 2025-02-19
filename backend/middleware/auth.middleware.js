import jwt from "jsonwebtoken";

import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "unauthorized user" });
        }
        const isBlackListed = await redisClient.get(token);
        if (isBlackListed) {
            return res.status(401).json({ message: "unauthorized user" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "unauthorized user" });
    }
}