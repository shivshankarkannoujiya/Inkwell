import mongoose, { Schema } from "mongoose";
import { postStatusEnum, availablePostStatuses } from "../utils/constant.js";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        content: {
            type: String,
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        
        status: {
            type: String,
            enum: availablePostStatuses,
            default: postStatusEnum.PENDING,
        },

        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        publishedAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
