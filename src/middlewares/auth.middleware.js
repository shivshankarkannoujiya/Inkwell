import { User } from "../models/users.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken",
        );
        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error: ", error);

        if (error.name === "TokenExpiredError") {
            throw new ApiError(
                401,
                "Access token expired. Please refresh your token.",
            );
        }

        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Malformed or invalid token");
        }
        throw new ApiError(401, "Invalid token");
    }
});

export { authMiddleware };
