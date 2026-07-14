import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Banner1 from "../../assets/images/banner1.png";
import Banner2 from "../../assets/images/banner2.png";
import Banner3 from "../../assets/images/banner3.png";

const Slider = () => {
  const images = [Banner2, Banner1, Banner3];
  
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {images.map((d, i) => (
          <SwiperSlide key={i}>
            <img
              src={d}
              alt="bannerImages"
              style={{ 
                width: "100%", 
                height: "auto", 
                maxHeight: "550px", 
                objectFit: "cover" 
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;