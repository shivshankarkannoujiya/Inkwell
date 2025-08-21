import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        key: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            expires: 0,
        },
    },
    { timestamps: true },
);

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);
