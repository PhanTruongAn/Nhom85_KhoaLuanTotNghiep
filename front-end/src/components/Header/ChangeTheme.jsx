import React from "react";
import "./ChangeTheme.scss";
import {
  LightMode as SunIcon,
  DarkMode as MoonIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";

function ChangeTheme({ theme, changeTheme }) {
  return (
    <Box
      className={`theme-toggle ${theme ? "light" : ""}`}
      onClick={changeTheme}
    >
      <Box className={`toggle-thumb ${theme ? "light" : ""}`}></Box>
      <MoonIcon className="icon icon-moon" />
      <SunIcon className="icon icon-sun" />
    </Box>
  );
}

export default ChangeTheme;
