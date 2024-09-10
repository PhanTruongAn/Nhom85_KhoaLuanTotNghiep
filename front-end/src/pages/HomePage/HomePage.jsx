import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./style.scss";
import Header from "../../components/Header/Header";
import { ThemeProvider } from "@mui/material";
import themeDark from "../../styles/Themes/themeDark.jsx";
import themeLight from "../../styles/Themes/themeLight.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import SwiperSlide from "../../components/Swiper/Swiper.jsx";
import TiltComponent from "../../components/Vanilla/TiltComponent.jsx";
import imageLeft from "../../images/4.avif";
import imageRight from "../../images/goals.jpg";
import imageBottom from "../../images/5.jpg";
import Footer from "../../components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("themeDark");
    return storedTheme === "true";
  });
  const changeTheme = () => {
    setTheme(!theme);
    localStorage.setItem("themeDark", !theme);
  };
  console.log(theme);
  return (
    <ThemeProvider theme={theme ? themeDark : themeLight}>
      <CssBaseline />
      <Header changeTheme={changeTheme} theme={theme} />
      <Outlet />
    </ThemeProvider>
  );
};

export default HomePage;
