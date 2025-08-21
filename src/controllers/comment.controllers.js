import { Comment } from "../models/comments.model.js";
import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { isAuthor } from "../utils/check_author.js";

const addCommentToPost = asyncHandler(async (req, res) => {
    const { postId, content, parentComment } = req.body;

    if (!postId || !content) {
        throw new ApiError(400, "Post ID and content are required");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not fouund");
    }

    const comment = await Comment.create({
        post: postId,
        user: req.user?._id,
        content,
        parentComment: parentComment || null,
    });

    return res
        .status(201)
        .json(new ApiResponse(200, comment, "Comment added successfully"));
});

const getPostComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        throw new ApiError("Id is required");
    }

    const postComments = await Comment.find({
        post: postId,
        parentComment: null,
        isDeleted: false,
    })
        .populate("user", "username email")
        .populate({
            path: "replies",
            match: { isDeleted: false },
            populate: { path: "user", select: "username email" },
        })
        .lean();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                postComments,
                "Post comments fetched successfully",
            ),
        );
});

const updatePostComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(id);

    if (!comment || comment.isDeleted) {
        throw new ApiError(404, "Comment not found");
    }

    if (!isAuthor(comment, req.user?._id)) {
        throw new ApiError(403, "Not authorized to delete this comment");
    }

    comment.content = content || comment.comment;
    await comment.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deletePostComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment || comment.isDeleted) {
        throw new ApiError(404, "Comment not found");
    }

    if (!isAuthor(comment, req.user?._id)) {
        throw new ApiError(403, "Not authorized to delete this comment");
    }

    comment.isDeleted = true;
    await comment.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

const toggleLikeOnComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!id) {
        throw new ApiError(400, "Comment ID is required");
    }

    const comment = await Comment.findById(id);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    const isAlreadyLiked = comment.likes.includes(userId);

    if (isAlreadyLiked) {
        comment.likes.pull(userId);
    } else {
        comment.likes.push(userId);
    }

    await comment.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                commentId: comment._id,
                totalLikes: comment.likes.length,
                liked: !isAlreadyLiked,
            },
            isAlreadyLiked
                ? "Like removed from comment"
                : "Like added to comment",
        ),
    );
});


export {
    addCommentToPost,
    getPostComment,
    updatePostComment,
    deletePostComment,
    toggleLikeOnComment,
};
