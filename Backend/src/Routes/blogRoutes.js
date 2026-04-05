import express from "express";
import {
  createBlogPost,
  getBlogPosts,
  deleteBlogPost,
  getBlogPostById,
} from "../controllers/blogController.js";
import upload from "./../Middleware/Multer.js";

const blogrouter = express.Router();
blogrouter.post("/add", upload.fields([{ name: "image", maxCount: 1 }]), createBlogPost);
blogrouter.get("/list", getBlogPosts);
blogrouter.delete("/delete/:id", deleteBlogPost);
blogrouter.get("/:id", getBlogPostById);

export default blogrouter;
