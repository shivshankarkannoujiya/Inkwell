import { Router } from "express";
import {
    addCommentToPost,
    getPostComment,
    updatePostComment,
    deletePostComment,
    toggleLikeOnComment,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { verifyAPI_KEY } from "../middlewares/api_key.middleware.js";

const router = Router();

router.route("/").post(verifyAPI_KEY, authMiddleware, addCommentToPost);
router.route("/:postId").get(verifyAPI_KEY, authMiddleware, getPostComment);
router.route("/:id").put(verifyAPI_KEY, authMiddleware, updatePostComment);
router.route("/:id").delete(verifyAPI_KEY, authMiddleware, deletePostComment);
router
    .route("/:id/like")
    .put(verifyAPI_KEY, authMiddleware, toggleLikeOnComment);

export default router;
