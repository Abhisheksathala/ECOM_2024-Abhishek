// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// // import required modules
// import { EffectCoverflow, Pagination } from "swiper/modules";

// export default function Slider() {
//   return (
//     <>
//       <Swiper
//         effect={"coverflow"}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={2}
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 30,
//           depth: 100,
//           modifier: 1,
//           slideShadows: true,
//         }}
//         pagination={false}
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D" />
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";

export default function Slider() {
  const { products } = useContext(ShopContext);
  const [latestproducts, setLatestproducts] = useState([]);

  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, [products]);

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
      className="mySwiper"
    >
      {latestproducts.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item.image[0]} // if array → use [0]
            alt={item.name}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}