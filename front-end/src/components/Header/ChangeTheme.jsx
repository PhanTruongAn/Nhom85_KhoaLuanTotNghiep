import PropTypes from "prop-types";
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

// Define prop types for ChangeTheme
ChangeTheme.propTypes = {
  theme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default ChangeTheme;
