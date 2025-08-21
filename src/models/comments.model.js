import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
            index: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentComment",
});

commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });

export const Comment = mongoose.model("Comment", commentSchema);
