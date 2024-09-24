import express from "express";
import {
  AddProduct,
  ListProduct,
  SingleProduct,
  RemoveProduct,
} from "./../Controllers/ProductController.js";
import upload from "./../Middleware/Multer.js";
import adminAuth from "../Middleware/AdminAuth.js";

const ProductRouter = express.Router();

ProductRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AddProduct
);
ProductRouter.post("/remove", adminAuth, RemoveProduct);
ProductRouter.get("/list", ListProduct);
ProductRouter.get("/single", SingleProduct);

export default ProductRouter;
