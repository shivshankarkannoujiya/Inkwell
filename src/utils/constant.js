const userRolesEnum = {
    USER: "user",
    ADMIN: "admin",
};

const postStatusEnum = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
};

const postReviewActionEnum = {
    APPROVED: "approved",
    REJECTED: "rejected",
};

const availableUserRoles = Object.values(userRolesEnum);
const availablePostStatuses = Object.values(postStatusEnum);
const availablePostReviewActions = Object.values(postReviewActionEnum);

const DB_NAME = "inkwell";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
};

export {
    userRolesEnum,
    availableUserRoles,
    postStatusEnum,
    availablePostStatuses,
    postReviewActionEnum,
    availablePostReviewActions,
    cookieOptions,
    DB_NAME,
};
