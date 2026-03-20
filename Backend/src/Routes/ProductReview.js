import express from "express";
import { addReview, getReviews } from "../controllers/ProductReview.js";
import auth from "../middleware/auth.js";

const Reviwerouter = express.Router();

Reviwerouter.post("/add", auth, addReview);
Reviwerouter.get("/:productId", getReviews);

export default Reviwerouter;