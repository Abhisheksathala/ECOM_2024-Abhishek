import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";

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
          <div className="flex-1 flex flex-col overflow-x-auto sm:overflow-y-auto gap-2">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="... w-16 sm:w-20 cursor-pointer"
                onClick={() => setImage(img)}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[70%]">
            <img src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2  whitespace-nowrap">
            {productData.name}
          </h1>
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
                    star <= rating ? assets.star_icon : assets.star_dull_icon
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

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
