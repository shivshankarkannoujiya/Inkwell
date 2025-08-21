import { Router } from "express";
import {
    createCategoty,
    deleteCategory,
    listAllCategories,
} from "../controllers/categorie.controllers.js";
import { authiddleware } from "../middlewares/auth.middleware.js";
import { validatePermission } from "../middlewares/role.middleware.js";
import { userRolesEnum } from "../utils/constant.js";

const router = Router();

router
    .route("/")
    .post(
        authiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        createCategoty,
    );
router.route("/").get(authiddleware, listAllCategories);
router
    .route("/:id")
    .delete(
        authiddleware,
        validatePermission([userRolesEnum.ADMIN]),
        deleteCategory,
    );

export default router;
