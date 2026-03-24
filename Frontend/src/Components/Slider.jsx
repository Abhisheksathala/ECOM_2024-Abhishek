import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Slider() {
  const { products } = useContext(ShopContext);
  const [latestproducts, setLatestproducts] = useState([]);

  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, [products]);

  console.log("produc:", products);

  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={2}
      spaceBetween={20}
      coverflowEffect={{
        rotate: 50,
        stretch: 30,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow]}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2.5,
        },
      }}
      className="mySwiper"
    >
      {latestproducts.map((item, index) => (
        <SwiperSlide key={index}>
          <Link
            to={`/Product/${item._id}`}
            className="block h-full flex flex-col relative group"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-full h-[300px] object-cover rounded-xl"
            />
            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-md">
              ₹{item.price}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition">
              <p className="text-white text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
