import React, { useState, useEffect } from "react";
import "./style.scss";
import logoIUH from "../../images/logo-iuh.png";
import themeDark from "../../styles/themes/mui/themeDark";
import IconButton from "@mui/material/IconButton";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const validPaths = ["/home", "/notification", "/information", "/login"];

  // Default to "Đăng Nhập" tab
  const [value, setValue] = useState("/login");

  useEffect(() => {
    const initialPath = window.location.pathname;
    // Set value based on the current path, defaulting to "/login"
    if (validPaths.includes(initialPath)) {
      setValue(initialPath);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue); // Navigate to the selected tab
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
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box className="logo">
          <img src={logoIUH} alt="Logo" style={{ width: "100px" }} />
          <Box className="content">
            <Box
              sx={[
                (theme) => ({
                  color: "#0c3b81",
                  ...theme.applyStyles("dark", {
                    color: theme.palette.text.main,
                  }),
                }),
              ]}
            >
              <b className="title-1">
                TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH
              </b>
            </Box>
            <Box
              sx={[
                (theme) => ({
                  color: "#920000",
                  ...theme.applyStyles("dark", {
                    color: theme.palette.text.secondary,
                  }),
                }),
              ]}
            >
              <b className="title-2">KHÓA LUẬN TỐT NGHIỆP</b>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" }, // Xếp theo cột trên màn hình nhỏ và theo hàng trên màn hình lớn
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "center", sm: "space-between" }, // Căn giữa trên màn hình nhỏ
            padding: { xs: "10px", sm: "0px" }, // Tăng padding trên màn hình nhỏ để thoáng hơn
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable" // Thêm scrollable để thanh Tab có thể cuộn
            scrollButtons="auto" // Hiện nút cuộn tự động nếu không đủ không gian
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" },
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
                  color: "primary.light",
                  backgroundColor: "transparent",
                },
              }}
            />
          </Tabs>

          <Box
            sx={{
              alignSelf: { xs: "center", sm: "center" }, // Đảm bảo IconButton nằm ở giữa trên màn hình nhỏ
              marginTop: { xs: "10px", sm: "0px" }, // Thêm khoảng cách giữa các thành phần trên màn hình nhỏ
            }}
          >
            <IconButton
              sx={{
                color: "#fff",
                marginRight: { xs: "10px", sm: "20px" },
                backgroundColor: themeDark.palette.primary.dark,
                "&:hover": {
                  boxShadow: themeDark.shadows[3],
                  backgroundColor: themeDark.palette.primary.main,
                },
              }}
              variant="text"
              component="label"
              onClick={props.changeTheme}
            >
              {props.theme ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
