import React, { useState } from "react";
import "./style.scss";
import Header from "../../components/Header/Header";
import { ThemeProvider } from "@mui/material";
import themeDark from "../../styles/themes/mui/themeDark";
import themeLight from "../../styles/themes/mui/themeLight";
import CssBaseline from "@mui/material/CssBaseline";
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

  return (
    <ThemeProvider theme={theme ? themeDark : themeLight}>
      <CssBaseline />
      <Header changeTheme={changeTheme} theme={theme} />
      <Outlet />
    </ThemeProvider>
  );
};

export default HomePage;
