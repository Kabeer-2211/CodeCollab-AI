import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: [6, "username must be 6 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, "email must be 6 characters long"],
        maxLength: [50, "email must not be longer than 50 characters long"]
    },
    password: {
        type: String,
        select: false,
    }
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    return await jwt.sign(
        { username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

const User = mongoose.model('user', userSchema);

export default User;