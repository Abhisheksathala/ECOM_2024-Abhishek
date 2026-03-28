import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product", 
      required: true,
    },
  },
  { timestamps: true }
);


const WishlistModel =
  mongoose.models.wishlist || mongoose.model("wishlist", WishlistSchema);

export default WishlistModel;