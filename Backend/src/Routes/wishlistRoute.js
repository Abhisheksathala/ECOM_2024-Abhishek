import { addToWishlist, getWishlist,removeFromWishlist } from "../Controllers/Addtowishlist.js";
import auth from "../middleware/auth.js";
import express from "express";

const wishlistRouter = express.Router();

wishlistRouter.post("/addtowishlist", auth, addToWishlist);
wishlistRouter.get("/getwishlist", auth, getWishlist);
wishlistRouter.delete("/remove/:productId", auth, removeFromWishlist);

export default wishlistRouter;
