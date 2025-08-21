import { ApiKey } from "../models/api_keys.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import crypto from "crypto";

const generateApiKey = asyncHandler(async (req, res) => {
    try {
        const rawApiKey = crypto.randomBytes(32).toString("hex");
        const hashedApiKey = crypto
            .createHash("sha256")
            .update(rawApiKey)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const apikey = await ApiKey.create({
            key: hashedApiKey,
            user: req.user?._id,
            isActive: true,
            expiresAt
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    api_key: rawApiKey,
                    expiresAt: apikey.expiresAt,
                },
                "New API key generated successfully. Please save it",
            ),
        );
    } catch (error) {
        console.error("Error in API key generation:", error);
        throw new ApiError(500, "Server Error: Could not generate API key.");
    }
});

export { generateApiKey };
