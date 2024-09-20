import ProductModel from "../model/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

const AddProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Check if req.files exists
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!subCategory) {
      return res.status(400).json({ message: "SubCategory is required" });
    }

    if (!sizes) {
      return res.status(400).json({ message: "Sizes is required" });
    }

    if (!bestseller) {
      return res.status(400).json({ message: "Bestseller is required" });
    }

    const NewProduct = new ProductModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageURL,
      date: Date.now(),
    });
    console.log(NewProduct);

    await NewProduct.save();
    res.status(201).json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const ListProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products not found" });
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const RemoveProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const SingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { AddProduct, ListProduct, SingleProduct, RemoveProduct };
