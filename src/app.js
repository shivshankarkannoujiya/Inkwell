import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.BASE_URL || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "device-remember-token",
            "Access-Control-Allow-Origin",
            "Origin",
            "Accept",
        ],
    }),
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too Many reuest from this IP, Please try later ",
});

app.use("/api", limiter);

import healthCheckRouter from "./routes/health_check.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import commentRouter from "./routes/comment.routes.js";
import post_reviewRouter from "./routes/post_review.routes.js";

app.use("/api/v1/health", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/post_reviews", post_reviewRouter);
app.use("/api/v1/comments", commentRouter);

export default app;
