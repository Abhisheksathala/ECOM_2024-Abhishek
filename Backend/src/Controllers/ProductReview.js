import ReviewModel from "../model/ProductReview.js";

export const addReview = async (req, res) => {
  try {
    const { productId, comment } = req.body;
    const userId = req.body.userId;
    if (!productId || !comment) {
      return res.json({
        success: false,
        message: "Missing fields",
      });
    }
    const review = new ReviewModel({
      productId,
      userId,
      comment,
    });
    await review.save();
    res.json({
      success: true,
      message: "Review added",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ productId })
      .populate("userId", "name profile_img")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
