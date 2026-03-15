import ProductModel from "../model/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

// AddProduct Controller

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

    const parsedSizes = sizes ? JSON.parse(sizes) : [];
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    // Use ProductModel instead of productModel
    const product = new ProductModel(productData); // Corrected here
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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
    if (!id) {
      return res.status(400).json({ success: false, message: "plz send id " });
    }
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product removed", product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const SingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(500).json({ success: false, message: "plz give id" });
    }
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

const editproduct = async (req, res) => {
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

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "there is no id plz send it ",
      });
    }

    const findproduct = await ProductModel.findById(id);

    if (!findproduct) {
      res.status(400).json({
        success: false,
        message: "no product found",
      });
    }

    if (name) findproduct.name = name;
    if (description) findproduct.description = description;
    if (price) findproduct.price = price;
    if (category) findproduct.category = category;
    if (subCategory) findproduct.subCategory = subCategory;
    if (sizes) findproduct.sizes = sizes ? sizes : [];
    if (bestseller !== undefined) findproduct.bestseller = bestseller;

    await findproduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: findproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { AddProduct, ListProduct, SingleProduct, RemoveProduct, editproduct };
