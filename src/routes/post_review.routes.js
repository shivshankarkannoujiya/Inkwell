import { Router } from "express";
import {
    approvePendingPost,
    listAllPendingPost,
    rejectPendingPost,
} from "../controllers/post_rreview.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validatePermission } from "../middlewares/role.middleware.js";
import { userRolesEnum } from "../utils/constant.js";
import { verifyAPI_KEY } from "../middlewares/api_key.middleware.js";

const router = Router();

router
    .route("/posts/pending")
    .get(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        listAllPendingPost,
    );
router
    .route("/posts/:id/approve")
    .put(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        approvePendingPost,
    );
router
    .route("/posts/:id/reject")
    .put(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        rejectPendingPost,
    );

export default router;
