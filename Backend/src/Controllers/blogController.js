import BlogPost from "../model/BlogPost.js";
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary (make sure this is in your main server file too)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// Create a new blog post with image upload
export const createBlogPost = async (req, res) => {
  try {
    console.log("Files:", req.files); // Debug log
    console.log("Body:", req.body); // Debug log
    
    const { title, excerpt, category, readTime } = req.body;

    // Change this - access like your product upload does
    const imageFile = req.files && req.files.image && req.files.image[0];

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary (same as your product upload)
    const result = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "blog_images",
    });

    const newPost = new BlogPost({
      title,
      excerpt,
      category,
      image: result.secure_url, 
      readTime: readTime || "5 min read",
    });

    await newPost.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Blog post created successfully",
        data: newPost,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Delete image from Cloudinary as well
    const post = await BlogPost.findById(id);
    if (post && post.image) {
      // Extract public ID from Cloudinary URL
      const publicId = post.image.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await BlogPost.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single blog post
export const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Blog post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
