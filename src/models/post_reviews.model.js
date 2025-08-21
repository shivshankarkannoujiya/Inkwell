import mongoose from "mongoose";
import {
    availablePostReviewActions,
    postReviewActionEnum,
} from "../utils/constant.js";

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
            trim: true,
            required: function () {
                return this.action !== postReviewActionEnum.APPROVED;
            },
        },
    },
    { timestamps: true },
);

postReviewSchema.index({ post: 1, reviewer: 1 }, { unique: true });

export const PostReview = mongoose.model("PostReview", postReviewSchema);
