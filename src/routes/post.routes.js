import { Router } from "express";
import { authiddleware } from "../middlewares/auth.middleware.js";
import {
    createBlogPost,
    listAllPublishedPosts,
    getPublishedPost,
    updateNotApprovedPost,
    deleteNotApprovedPost,
} from "../controllers/post.controllers.js";

const router = Router();

router.route("/").post(authiddleware, createBlogPost);
router.route("/").get(authiddleware, listAllPublishedPosts);
router.route("/:id").get(authiddleware, getPublishedPost);
router.route("/:id").put(authiddleware, updateNotApprovedPost);
router.route("/:id").delete(authiddleware, deleteNotApprovedPost);

export default router;
