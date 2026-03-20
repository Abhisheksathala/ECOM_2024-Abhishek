import express from "express";

import {
  applyCoupon,
  createCoupon,
} from "../Controllers/CouponcodeController.js";

const CouponRoute = express.Router();

CouponRoute.post("/create", createCoupon);
CouponRoute.post("/apply", applyCoupon);

export default CouponRoute;
