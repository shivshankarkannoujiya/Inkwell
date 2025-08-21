import { Router } from "express";
import {
    getLoggedInUser,
    loginUser,
    registerUser,
} from "../controllers/auth.controllers.js";
import { authiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(authiddleware, getLoggedInUser);

export default router;
