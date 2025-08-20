import mongoose from "mongoose";
import { userRolesEnum, availableUserRoles } from "../utils/constant.js";

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
    },
    { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
