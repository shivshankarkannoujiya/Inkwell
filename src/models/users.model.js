import mongoose from "mongoose";
import { userRolesEnum, availableUserRoles } from "../utils/constant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: availableUserRoles,
            default: userRolesEnum.USER,
        },

        refreshToken: {
            type: String
        }
    },
    { timestamps: true },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                role: this.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
        );
    } catch (error) {
        console.error("ERROR WHILE GENERATING ACCESS TOKEN");
    }
};

userSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
        );
    } catch (error) {
        console.error("ERROR WHILE GENERATING ACCESS TOKEN");
    }
};

export const User = mongoose.model("User", userSchema);
