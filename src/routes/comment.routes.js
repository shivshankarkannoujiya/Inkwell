import { Router } from "express";
import {
    addCommentToPost,
    getPostComment,
    updatePostComment,
    deletePostComment,
    toggleCommentLike,
} from "../controllers/comment.controllers.js";
import { authiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(authiddleware, addCommentToPost);
router.route("/:postId").get(authiddleware, getPostComment);
router.route("/:id").put(authiddleware, updatePostComment);
router.route("/:id").delete(authiddleware, deletePostComment);
router.route("/:id/like").put(authiddleware, toggleCommentLike);

export default router;
