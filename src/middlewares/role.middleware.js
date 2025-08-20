import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

const validatePermission = (roles = []) =>
    asyncHandler(async (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            throw new ApiError(401, "User role not found in request");
        }

        if (!roles.includes(userRole)) {
            throw new ApiError(
                403,
                "You do not have permission to perform this action",
            );
        }

        next();
    });

export { validatePermission };
