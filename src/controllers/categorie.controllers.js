import { Category } from "../models/categories.model.js";
import { Post } from "../models/posts.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const createCategoty = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        throw new ApiError(401, "Category Title is required");
    }

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
        throw new ApiError(
            409,
            `Category with title ${existingCategory.title} already exist`,
        );
    }

    const category = await Category.create({
        title,
        description,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { categoryId: category._id },
                "Category created successfully",
            ),
        );
});

const listAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 });
    if (!categories || categories.length <= 0) {
        throw new ApiError(404, "No categories found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, categories, "Categories fetched successfully"),
        );
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const linkedPost = await Post.findOne({ category: id });
    if (linkedPost) {
        throw new ApiError(
            400,
            "Cannot delete category, it is assigned to posts",
        );
    }

    await category.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Category deleted successfully"));
});

export { createCategoty, listAllCategories, deleteCategory };
