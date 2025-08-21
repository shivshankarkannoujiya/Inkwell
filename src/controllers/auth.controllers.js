import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { generateAccessAndRefreshToken } from "../utils/token.js";
import { cookieOptions } from "../utils/constant.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(401, "All Fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User already registered with this email");
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError(404, "User not created");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, "User registered successfully"),
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not regitered");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id,
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { userId: loggedInUser._id, accessToken },
                "User loggedIn successfully !!",
            ),
        );
});

const getLoggedInUser = asyncHandler(async (req, res) => {
    console.log(req?.user);
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: req?.user },
                "loggedIn user fetched successfully !! ",
            ),
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        { new: true },
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, getLoggedInUser, logoutUser };
