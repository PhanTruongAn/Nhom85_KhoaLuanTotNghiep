import React, { useState } from "react";
import SwiperSlide from "../../components/Swiper/Swiper.jsx";
import TiltComponent from "../../components/Vanilla/TiltComponent.jsx";
import imageLeft from "../../images/4.avif";
import imageRight from "../../images/goals.jpg";
import imageBottom from "../../images/5.jpg";
import Footer from "../../components/Footer/Footer.jsx";
import BackgroundContainer from "./theme/Container.jsx";
import { Box } from "@mui/material";
const Home = () => {
  return (
    <BackgroundContainer direction="column" justifyContent="space-between">
      <SwiperSlide />

      <TiltComponent
        srcLeft={imageLeft}
        srcRight={imageRight}
        srcBottom={imageBottom}
      />

      <Footer />
    </BackgroundContainer>
  );
};

export default Home;
