import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { BackendUrl } from "./../App";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [size, setSize] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const validateForm = () => {
    if (!name || !description || !price || size.length === 0) {
      toast.error(
        "Please fill in all required fields and select at least one size."
      );
      return false;
    }
    return true;
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (image1) URL.revokeObjectURL(image1);
      if (image2) URL.revokeObjectURL(image2);
      if (image3) URL.revokeObjectURL(image3);
      if (image4) URL.revokeObjectURL(image4);
    };
  }, [image1, image2, image3, image4]);

  const OnSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("size", JSON.stringify(size));
      formData.append("bestseller", bestseller);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const response = await axios.post(
        `${BackendUrl}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("men");
        setSubCategory("Topwear");
        setSize([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }

      if (!response.data.success) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong", error);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={OnSubmit}
        className="flex w-full flex-col gap-6 bg-white p-6 shadow-lg rounded-lg max-w-[600px]"
      >
        <div>
          <p className="mb-2 text-lg font-semibold">Upload Images</p>
          <div className="flex gap-4">
            {["image1", "image2", "image3", "image4"].map((img, idx) => (
              <label key={img} htmlFor={img}>
                <img
                  className="w-20 cursor-pointer"
                  src={
                    img === "image1" && image1
                      ? URL.createObjectURL(image1)
                      : img === "image2" && image2
                      ? URL.createObjectURL(image2)
                      : img === "image3" && image3
                      ? URL.createObjectURL(image3)
                      : img === "image4" && image4
                      ? URL.createObjectURL(image4)
                      : assets.upload_area
                  }
                  alt="Upload"
                />
                <input
                  onChange={(e) =>
                    img === "image1"
                      ? setImage1(e.target.files[0])
                      : img === "image2"
                      ? setImage2(e.target.files[0])
                      : img === "image3"
                      ? setImage3(e.target.files[0])
                      : setImage4(e.target.files[0])
                  }
                  type="file"
                  id={img}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          className="border border-gray-300 w-full max-w-[500px] p-3 rounded-lg focus:outline-none focus:border-blue-500"
          required
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border border-gray-300 w-full max-w-[500px] p-3 rounded-lg focus:outline-none focus:border-blue-500"
          required
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col gap-4">
          <div className="w-full">
            <p className="mb-2 text-lg font-semibold">Product Category</p>
            <select
              className="border border-gray-300 w-full max-w-[500px] p-3 rounded-lg focus:outline-none focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="w-full">
            <p className="mb-2 text-lg font-semibold">Subcategory</p>
            <select
              className="border border-gray-300 w-full max-w-[500px] p-3 rounded-lg focus:outline-none focus:border-blue-500"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottom">Bottom</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="w-full">
            <p className="mb-2 text-lg font-semibold">Price</p>
            <input
              type="number"
              className="border border-gray-300 w-full max-w-[500px] p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">Product Sizes</p>
            <div className="flex gap-4">
              {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                <div
                  key={sizeOption}
                  className={`w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 ${
                    size.includes(sizeOption) ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes(sizeOption)
                        ? prev.filter((s) => s !== sizeOption)
                        : [...prev, sizeOption]
                    )
                  }
                >
                  <p>{sizeOption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
            />
            <label
              htmlFor="bestseller"
              className="text-lg font-semibold ml-2 cursor-pointer"
            >
              Bestseller
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-2 rounded-lg ${
            isSubmitting ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;
