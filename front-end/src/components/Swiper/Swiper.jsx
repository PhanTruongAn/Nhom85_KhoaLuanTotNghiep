import React, { useEffect } from "react";
import "./style.scss";
import Swiper from "swiper";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpeg";
import image3 from "../../images/3.jpeg";
import TiltComponent from "../Vanilla/TiltComponent";
const SwiperSlide = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      // configure Swiper to use modules
      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      slidesPerView: 1,
      autoplay: {
        delay: 3000,
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 30, // Góc xoay
        stretch: 10, // Khoảng cách giữa các slide
        depth: 100, // Độ sâu của hiệu ứng
        modifier: 1, // Thay đổi độ mạnh của hiệu ứng
        slideShadows: true, // Hiển thị bóng cho slide
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // Other Swiper options
    });
  }, []);

  return (
    <div className="swiper">
      {/* Additional required wrapper */}
      <div className="swiper-wrapper">
        {/* Slides */}
        <div className="swiper-slide">
          <img src={image1} />
        </div>
        <div className="swiper-slide">
          <img src={image2} />
        </div>
        <div className="swiper-slide">
          <img src={image3} />
        </div>
        {/* Add more slides as needed */}
      </div>
      {/* If we need pagination */}
      <div className="swiper-pagination"></div>

      {/* If we need scrollbar */}
      <div className="swiper-scrollbar"></div>
    </div>
  );
};
export default SwiperSlide;
