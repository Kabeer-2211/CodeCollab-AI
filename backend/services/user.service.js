import User from './../models/user.model.js';

export const createUser = async (username, email, password) => {
    if (!username || !email || !password) {
        throw new Error('Email and password are required');
    }

    const hashedPassword = await User.hashPassword(password);
    const newUser = await User.create({ username, email, password: hashedPassword });
    return newUser;
}

export const getAllUsers = async ({ userId }) => {
    const users = await User.find({
        _id: { $ne: userId }
    });
    return users;
}