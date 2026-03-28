import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "../../libs/utiles";
import { Link } from "react-router-dom";

const SwipeableCards = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}) => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className={cn("relative w-full mx-auto", className)}>
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1000,
                  disableOnInteraction: false,
                }
              : false
          }
          effect="cards"
          grabCursor={true}
          loop={loop}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  dynamicBullets: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          modules={[EffectCards, Autoplay, Pagination, Navigation]}
          breakpoints={{
            320: {
              width: 280,
              slidesPerView: 1,
            },
            480: {
              width: 320,
              slidesPerView: 1,
            },
            640: {
              width: 380,
              slidesPerView: 1,
            },
            768: {
              width: 420,
              slidesPerView: 1,
            },
            1024: {
              width: 480,
              slidesPerView: 1,
            },
            1280: {
              width: 520,
              slidesPerView: 1,
            },
          }}
          className="w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[480px]"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              <Link
                to={`/Product/${item._id}`}
                className="block h-full w-full relative group"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md">
                  ₹{item.price}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-2 sm:p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">
                    {item.name}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden absolute top-1/2 -right-2 sm:-right-4 md:-right-6 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1 sm:p-2 transition-all duration-200 cursor-pointer z-10">
              <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden absolute top-1/2 -left-2 sm:-left-4 md:-left-6 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-1 sm:p-2 transition-all duration-200 cursor-pointer z-10">
              <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableCards;