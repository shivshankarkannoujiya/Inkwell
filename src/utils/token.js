import { User } from "../models/users.model.js";
import { ApiError } from "../utils/api-error.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User with userId does not exist");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("ERROR WHILE GENERATING TOKENS: ", error);
        throw new ApiError(500, "Failed to generate tokens");
    }
};

export { generateAccessAndRefreshToken };
