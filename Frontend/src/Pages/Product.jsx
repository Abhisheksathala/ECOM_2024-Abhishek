import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]); // Fetch product data when productId or products change

  if (!productData) {
    return <div>Loading...</div>; // Handle the loading state
  }

  return (
    <div className="border-t-2 pt-1- transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gp-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* <!-- Thumbnail Container --> */}
          <div className="flex-1 flex flex-col overflow-x-auto sm:overflow-y-auto gap-2">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="..."
                onClick={() => setImage(img)}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>

          {/* <!-- Main Image Container --> */}
          <div className="w-full sm:w-[70%]">
            <img src={image} alt="" />
          </div>
        </div>
        {/* product  info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2  whitespace-nowrap">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
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

      {/* product description  rv section */}
      <div className="mt-20  mb-20">
        <div className="flex ">
          <b className="border px-5 py-3  text-sm ">Description</b>
          <p className="border px-5 py-3 text-sm">revies(122)</p>
        </div>
        <div className="flex  flex-col gap-4  border px-6 py-6  text-sm text-gray ">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
            vitae.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
            vitae.
          </p>
        </div>
      </div>
      {/* display  related  products */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
