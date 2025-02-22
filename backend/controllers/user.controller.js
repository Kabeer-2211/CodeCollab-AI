import { validationResult } from 'express-validator';

import { createUser, getAllUsers } from '../services/user.service.js';
import User from '../models/user.model.js';
import redisClient from '../services/redis.service.js';

export const registerUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const { username, email, password } = req.body;
        const user = await createUser(username, email, password);
        const token = await user.generateToken();
        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordMatched = await user.isValidPassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = await user.generateToken();
        return res.status(201).json({ user, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const profileController = (req, res) => {
    return res.status(200).json(req.user);
}

export const logoutController = (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({ message: "logout successfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ email: req.user.email });
        const users = await getAllUsers({ userId: loggedInUser._id });
        res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
}