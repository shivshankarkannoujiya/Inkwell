import { Router } from "express";
import {
    approvePendingPost,
    listAllPendingPost,
    rejectPendingPost,
} from "../controllers/post_rreview.controllers.js";
import { authiddleware } from "../middlewares/auth.middleware.js";
import { validatePermission } from "../middlewares/role.middleware.js";
import { userRolesEnum } from "../utils/constant.js";

const router = Router();

router
    .route("/posts")
    .post(
        authiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        listAllPendingPost,
    );
router
    .route("/posts/:id/approve")
    .put(
        authiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        approvePendingPost,
    );
router
    .route("/posts/:id/reject")
    .put(
        authiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        rejectPendingPost,
    );

export default router;
