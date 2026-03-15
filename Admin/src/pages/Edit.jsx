import React, { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "../App";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = ({ token }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(
        `${BackendUrl}/api/product/single`,
        {
          productId: id,
        },
        { headers: { token } },
      );

      const product = response.data.product;

      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setSubCategory(product.subCategory);
      setSizes(product.sizes);
      setBestseller(product.bestseller);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name,
        description,
        price,
        category,
        subCategory,
        bestseller,
        sizes,
      };

      const response = await axios.put(
        `${BackendUrl}/api/product/update/${id}`,
        data,
      );

      if (response.data.success) {
        toast.success("Product updated");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <form
      onSubmit={updateHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category Row */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>

        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size],
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label className="cursor-pointer">Add to bestseller</label>
      </div>

      {/* Button */}
      <button type="submit" className="w-32 py-3 mt-4 bg-black text-white">
        UPDATE
      </button>
    </form>
  );
};

export default Edit;
