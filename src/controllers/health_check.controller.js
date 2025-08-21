import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const healthCheck = asyncHandler(async (_, res) => {
    res.status(200).json(
        new ApiResponse(200, { message: "Server is running" }),
    );
});

export { healthCheck };
