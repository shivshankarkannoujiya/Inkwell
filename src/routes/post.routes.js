import { Router } from "express";
import {
    createBlogPost,
    listAllPublishedPosts,
    getPublishedPost,
    updateNotApprovedPost,
    deleteNotApprovedPost,
} from "../controllers/post.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAPI_KEY } from "../middlewares/api_key.middleware.js";

const router = Router();

router.route("/").post(verifyAPI_KEY, authMiddleware, createBlogPost);
router.route("/").get(verifyAPI_KEY, authMiddleware, listAllPublishedPosts);
router.route("/:id").get(verifyAPI_KEY, authMiddleware, getPublishedPost);
router.route("/:id").put(verifyAPI_KEY, authMiddleware, updateNotApprovedPost);
router
    .route("/:id")
    .delete(verifyAPI_KEY, authMiddleware, deleteNotApprovedPost);

export default router;
