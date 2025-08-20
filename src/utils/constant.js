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

export const DB_NAME = "inkwell";

export {
    userRolesEnum,
    availableUserRoles,
    postStatusEnum,
    availablePostStatuses,
    postReviewActionEnum,
    availablePostReviewActions,     
};
