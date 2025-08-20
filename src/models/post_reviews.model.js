import mongoose from "mongoose";
import { availablePostReviewActions } from "../utils/constant.js";

const postReviewSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        action: {
            type: String,
            enum: availablePostReviewActions,
            required: true,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true },
);

export const PostReview = mongoose.model("PostReview", postReviewSchema);
