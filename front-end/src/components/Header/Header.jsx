import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import logoIUH from "../../images/logo-iuh.avif";
import logoIUHWhite from "../../images/Logo-White.avif";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import ChangeTheme from "./ChangeTheme"; // Import the ChangeTheme component

const Header = ({ theme, changeTheme }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState("/login");
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const validPaths = ["/home", "/notification", "/information", "/login"];
    const initialPath = window.location.pathname;
    if (validPaths.includes(initialPath)) {
      setValue(initialPath);
    }
  }, []); // Chỉ chạy 1 lần khi component mount

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
    setDrawerOpen(false); // Close the drawer after selecting an item
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open); // Open or close the drawer
  };

  return (
    <Box
      className="header container-fluid"
      sx={[
        (theme) => ({
          backgroundColor: "#fff",
          ...theme.applyStyles("dark", {
            backgroundColor: "#09223b",
          }),
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
        }}
      >
        {/* Menu button for mobile screens */}
        <IconButton
          sx={{
            display: { xs: "block", sm: "none" },
            color: "#0c3b81",
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer component for mobile menu */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              alignItems: "center", // Aligns items to the left
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              orientation="vertical"
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <Tab value="/home" label="TRANG CHỦ" disableRipple />
              <Tab value="/notification" label="THÔNG BÁO" disableRipple />
              <Tab
                value="/information"
                label="SỰ KIỆN - TIN TỨC"
                disableRipple
              />
              <Tab value="/login" label="ĐĂNG NHẬP" disableRipple />
            </Tabs>

            {/* Theme toggle button inside Drawer */}
            <ChangeTheme theme={theme} changeTheme={changeTheme} />
          </Box>
        </Drawer>

        {/* Logo and title section */}
        <Box className="logo" sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={theme ? logoIUHWhite : logoIUH}
            alt="Logo"
            style={{ width: "100px" }}
          />
          <Box className="content">
            <Box sx={{ color: "#0c3b81" }}>
              <b className="title-1">
                TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH
              </b>
            </Box>
            <Box sx={{ color: "#920000" }}>
              <b className="title-2">KHÓA LUẬN TỐT NGHIỆP</b>
            </Box>
          </Box>
        </Box>

        {/* Desktop navigation and theme toggle */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              padding: "10px 0",
            }}
          >
            <Tab value="/home" label="TRANG CHỦ" disableRipple />
            <Tab value="/notification" label="THÔNG BÁO" disableRipple />
            <Tab value="/information" label="SỰ KIỆN - TIN TỨC" disableRipple />
            <Tab
              value="/login"
              label="ĐĂNG NHẬP"
              disableRipple
              sx={{
                marginRight: { xs: "0px", sm: "10px" },
                "&:hover": {
                  color: "#0c3b81",
                  backgroundColor: "transparent",
                },
              }}
            />
          </Tabs>

          {/* Theme toggle icon for desktop */}
          <ChangeTheme theme={theme} changeTheme={changeTheme} />
        </Box>
      </Box>
    </Box>
  );
};

// Define prop types for Header
Header.propTypes = {
  theme: PropTypes.bool.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

export default Header;
