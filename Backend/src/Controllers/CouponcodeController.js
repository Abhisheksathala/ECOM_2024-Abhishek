import CouponModel from "../model/CouponModel.js";

export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, usageLimit, expiryDate } =
      req.body;

    const coupon = await CouponModel.create({
      code,
      discountType,
      discountValue,
      usageLimit,
      expiryDate,
    });

    res.json({ success: true, coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon = await CouponModel.findOne({ code });

    if (!coupon) {
      return res.json({ success: false, message: "Invalid coupon" });
    }

    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return res.json({ success: false, message: "Coupon expired" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.json({ success: false, message: "Coupon limit reached" });
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (amount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = amount - discount;

    coupon.usedCount += 1;
    await coupon.save();

    res.json({
      success: true,
      discount,
      finalAmount,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
