import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    listAllCategories,
} from "../controllers/categorie.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validatePermission } from "../middlewares/role.middleware.js";
import { userRolesEnum } from "../utils/constant.js";
import { verifyAPI_KEY } from "../middlewares/api_key.middleware.js";

const router = Router();

router
    .route("/")
    .post(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        createCategory,
    );
router.route("/").get(authMiddleware, verifyAPI_KEY, listAllCategories);
router
    .route("/:id")
    .delete(
        verifyAPI_KEY,
        authMiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        deleteCategory,
    );

export default router;
