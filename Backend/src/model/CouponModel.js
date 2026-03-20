import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discountType: {
      type: String, // "percentage" or "flat"
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    usageLimit: {
      type: Number,
      default: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const CouponModel =
  mongoose.models.coupon || mongoose.model("coupon", couponSchema);

export default CouponModel;