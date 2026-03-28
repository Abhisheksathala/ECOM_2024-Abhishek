import WishlistModel from "../model/AddtolistModel.js";

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const existing = await WishlistModel.findOne({
      user: userId,
      product: productId,
    });
    if (existing) {
      return res.json({
        success: false,
        message: "Already in wishlist",
      });
    }
    const newItem = new WishlistModel({
      user: userId,
      product: productId,
    });
    await newItem.save();
    res.json({
      success: true,
      message: "Added to wishlist",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const wishlist = await WishlistModel.find({ user: userId })
      .populate("product")
      .populate("user", "-password");
    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    // console.log(userId, productId, "productId");

    await WishlistModel.findOneAndDelete({
      user: userId,
      product: productId,
    });

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToWishlist, getWishlist, removeFromWishlist };
