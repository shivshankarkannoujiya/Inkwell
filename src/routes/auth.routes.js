import { Router } from "express";
import {
    getLoggedInUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controllers.js";
import { generateApiKey } from "../controllers/api_key.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAPI_KEY } from "../middlewares/api_key.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/api_key").post(authMiddleware, generateApiKey);
router.route("/me").get(verifyAPI_KEY, authMiddleware, getLoggedInUser);
router.route("/logout").post(verifyAPI_KEY, authMiddleware, logoutUser);

export default router;
