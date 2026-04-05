import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";
import BlogSlider from "../Components/Blog";

const Product = () => {
  const { backendURL } = useContext(ShopContext);

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/review/${productId}`);

      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = async () => {
    try {
      const token = localStorage.getItem("token");
      if (rating === 0) {
        toast.error("Please select rating");
        return;
      }
      const response = await axios.post(
        `${backendURL}/api/review/add`,
        {
          productId,
          comment,
          rating,
        },
        {
          headers: { token },
        },
      );
      if (response.data.success) {
        setComment("");
        setRating(0);
        fetchReviews();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products]);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (!productData) {
    return <div>Loading...</div>; // Handle the loading state
  }

  return (
    <div className="border-t-2 pt-4 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gp-12 flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-y-auto max-h-[600px] order-2 sm:order-1">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover cursor-pointer rounded-lg border-2 hover:border-orange-500 transition-all"
                onClick={() => setImage(img)}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[70%]">
            <img
              src={image}
              alt=""
              className="w-full h-[400px] sm:h-[500px] md:h-[700px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2  whitespace-nowrap">
            {productData.name}
          </h1>
          <div className="flex flex-col gap-4">
            <p>select size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-300" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={
                  star <= avgRating ? assets.star_icon : assets.star_dull_icon
                }
                className="w-4"
              />
            ))}
            <p className="text-sm text-gray-500 ml-2">({reviews.length})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
      
            <button
              onClick={() => {
                addToCart(productData._id, size);
              }}
              className="bg-black text-white px-8  py-3 text-sm active:bg-gray-700"
            >
              Add to cart
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-small  text-gray-500 mt-5  flex flex-col gap-1">
              <p>100% original product</p>
              <p>cash ondelivery is avaliable on this </p>
              <p>easy return and exchnage policy in 7 days</p>
            </div>
          </div>
        </div> */}

        <div className="flex-1">
          {/* Product Card - Black & White Theme */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 md:p-8">
            {/* Product Title */}
            <h1 className="font-bold text-3xl md:text-4xl text-black mb-3 leading-tight tracking-tight">
              {productData.name}
            </h1>

            {/* Rating Section */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= avgRating
                        ? "text-black fill-black"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">
                ({reviews.length} reviews)
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-4xl md:text-5xl font-bold text-black">
                {currency}
                {productData.price}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-600 leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-black">Select Size</p>
                <button className="text-xs text-gray-500 hover:text-black font-medium transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`relative py-2.5 px-5 rounded-none font-medium transition-all duration-200 ${
                      item === size
                        ? "bg-black text-white"
                        : "bg-white text-black border border-gray-300 hover:border-black"
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="text-xs text-red-500 mt-2">
                  Please select a size
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!size) {
                  toast.error("Please select a size");
                  return;
                }
                addToCart(productData._id, size);
              }}
              className="w-full bg-black text-white px-8 py-4 text-base font-semibold rounded-none hover:bg-gray-900 transition-all duration-200 border border-black mb-6"
            >
              Add to Cart
            </button>

            {/* Product Features */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 border border-gray-300 rounded-none flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span>100% original product</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 border border-gray-300 rounded-none flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <span>Cash on delivery available</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 border border-gray-300 rounded-none flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
                <span>Easy return & exchange in 7 days</span>
              </div>
            </div>
          </div>

          <div className="mt-20  mb-20">
            <div className="flex">
              <button
                onClick={() => setActiveTab("description")}
                className={`border px-5 py-3 text-sm ${
                  activeTab === "description" ? "bg-black text-white" : ""
                }`}
              >
                Description
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`border px-5 py-3 text-sm ${
                  activeTab === "reviews" ? "bg-black text-white" : ""
                }`}
              >
                Reviews
              </button>
            </div>

            {activeTab === "description" && (
              <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray">
                <p>{productData?.description}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="mt-10 border px-6 py-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>

                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      onClick={() => setRating(star)}
                      src={
                        star <= rating
                          ? assets.star_icon
                          : assets.star_dull_icon
                      }
                      className={`w-5 cursor-pointer ${
                        rating === 0 ? "opacity-70" : ""
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a review..."
                    className="border p-2 flex-1"
                  />
                  <button
                    onClick={handleAddReview}
                    className="bg-black text-white px-4"
                  >
                    Post
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {reviews.map((rev, index) => (
                    <div
                      key={index}
                      className="border p-3 rounded flex gap-3 items-start"
                    >
                      <img
                        src={rev.userId?.profile_img}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">
                          {rev.userId?.name || "User"}
                        </p>
                        <p className="text-gray-600 text-sm">{rev.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Section - Static */}
      <BlogSlider />

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
