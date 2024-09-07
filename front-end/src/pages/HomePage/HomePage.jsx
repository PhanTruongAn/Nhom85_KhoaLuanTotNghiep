import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./style.scss";
import Header from "../../components/Header/Header";
import { ThemeProvider } from "@mui/material";
import themeDark from "../../styles/Themes/themeDark.jsx";
import themeLight from "../../styles/Themes/themeLight.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SwiperSlide from "../../components/Swiper/Swiper.jsx";
import TiltComponent from "../../components/Vanilla/TiltComponent.jsx";
import imageLeft from "../../images/4.avif";
import imageRight from "../../images/goals.jpg";
import imageBottom from "../../images/5.jpg";
import Footer from "../../components/Footer/Footer.jsx";
const HomePage = () => {
  const [theme, setTheme] = useState(false);
  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme); // Đảo ngược giá trị hiện tại
  };
  return (
    <ThemeProvider theme={theme ? themeDark : themeLight}>
      <CssBaseline />
      <Header changeTheme={changeTheme} theme={theme} />
      <SwiperSlide />
      <TiltComponent
        srcLeft={imageLeft}
        srcRight={imageRight}
        srcBottom={imageBottom}
      />
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
