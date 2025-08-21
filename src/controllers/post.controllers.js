import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { postStatusEnum } from "../utils/constant.js";
import { isAuthor } from "../utils/check_author.js";

const createBlogPost = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        throw new ApiError(400, "All fields are required");
    }

    const post = await Post.create({
        title,
        content,
        category,
        author: req.user?._id,
        status: postStatusEnum.PENDING,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                post: post,
                status: post.status,
            },
            "Post created successfully",
        ),
    );
});

const listAllPublishedPosts = asyncHandler(async (_, res) => {
    const posts = await Post.find({
        status: postStatusEnum.APPROVED,
        publishedAt: { $lte: new Date() },
    })
        .populate("author", "username email")
        .populate("category", "title");

    if (!posts || posts.length <= 0) {
        throw new ApiError(404, "No approved post exist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                posts,
                "All approved posts fetched successfully",
            ),
        );
});

const getPublishedPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({
        _id: id,
        status: postStatusEnum.APPROVED,
    });

    if (!post) {
        throw new ApiError(404, "Post not found or not approved");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const updateNotApprovedPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!isAuthor(post, req.user?._id)) {
        throw new ApiError(403, "Not authorized to edit this post");
    }

    if (post.status === postStatusEnum.APPROVED) {
        throw new ApiError(400, "Approved posts cannot be edited");
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    await post.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post updated successfully"));
});

const deleteNotApprovedPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!isAuthor(post, req.user?._id)) {
        throw new ApiError(403, "Not authorized to delete this post");
    }

    if (post.status === postStatusEnum.APPROVED) {
        throw new ApiError(400, "Approved posts cannot be deleted");
    }

    await post.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export {
    createBlogPost,
    listAllPublishedPosts,
    getPublishedPost,
    updateNotApprovedPost,
    deleteNotApprovedPost,
};
