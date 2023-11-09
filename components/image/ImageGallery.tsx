import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../styles/swiperStyles.module.css";

// Import Swiper styles

import ImageComponent from "./ImageComponent";
import ImageHero from "./ImageHero";
const ImageGallery = ({ images }) => {
  console.log(images);
  const [activeSlide, setActiveSlide] = useState(0);
  const [before, after] = useState(window.innerWidth);
  const smallerDeviceWidth = 640;
  useEffect(() => {
    const resizeMe = () => {
      after(window.innerWidth);
    };
    window.addEventListener("resize", resizeMe);
    return () => window.removeEventListener("resize", resizeMe);
  });
  const renderImages =
    images &&
    images.map((e, index) => {
      return (
        <SwiperSlide
          key={index}
          onClick={(e) => {
            console.log(index);
            setActiveSlide(index);
          }}
          style={{
            cursor: "pointer",

            transition: "opacity .2s ease-in-out",
            opacity:
              before >= smallerDeviceWidth
                ? activeSlide === index
                  ? "1"
                  : "0.5"
                : "1",
          }}
        >
          <ImageComponent image={e} />
        </SwiperSlide>
      );
    });
  return (
    <section className="relative flex h-full flex-col gap-6">
      <div
        className=" 
      relative hidden
      h-full  overflow-hidden  sm:flex "
      >
        <ImageHero image={images[activeSlide]} />
        {/* {renderImages} */}
      </div>
      <div
        id="swiper--container"
        className="flex h-[40svh] w-[100%] sm:h-[20%] lg:h-[auto]  "
      >
        <Swiper
          modules={[Navigation]}
          style={{
            width: "100%",
          }}
          navigation
          spaceBetween={25}
          slidesPerView={before >= smallerDeviceWidth ? 3 : 1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {renderImages}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageGallery;
