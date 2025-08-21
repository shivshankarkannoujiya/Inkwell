import { PostReview } from "../models/post_reviews.model.js";
import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { postReviewActionEnum, postStatusEnum } from "../utils/constant.js";

const listAllPendingPost = asyncHandler(async (req, res) => {
    const posts = await Post.find({ status: postStatusEnum.PENDING })
        .populate("author", "username email")
        .populate("category", "title");

    if (!posts || posts.length <= 0) {
        throw new ApiError(404, "No pending posts found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, posts, "Pending posts fetched successfully"),
        );
});

const approvePendingPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.status === postStatusEnum.APPROVED) {
        throw new ApiError(400, "Post already approved");
    }

    post.status = postStatusEnum.APPROVED;
    post.approvedBy = req.user?._id;
    post.publishedAt = new Date();

    await post.save();

    const postReviewLog = await PostReview.create({
        post: id,
        reviewer: req.user?._id,
        action: postReviewActionEnum.APPROVED,
        comment: req.body.comment || "Approved",
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, postReviewLog, "Post approved successfully"),
        );
});

const rejectPendingPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.status === postStatusEnum.REJECTED) {
        throw new ApiError(400, "Post already rejected");
    }

    post.status = postStatusEnum.REJECTED;
    post.approvedBy = req.user?._id;
    await post.save({ validateBeforeSave: false });

    const postReviewLog = await PostReview.create({
        post: id,
        reviewer: req.user?._id,
        action: postReviewActionEnum.REJECTED,
        comment: comment || "Rejected",
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { post, postReviewLog },
                "Post rejected successfully",
            ),
        );
});

export { listAllPendingPost, approvePendingPost, rejectPendingPost };
