import React, { useState } from "react";
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
  const [value, setValue] = useState(window.location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
        }}
      >
        <div className="logo">
          <img src={logoIUH} alt="Logo" style={{ width: "100px" }} />
          <div
            className="content"
            // style={{
            //   flexGrow: 1,
            //   marginLeft: { xs: "10px", sm: "20px" }, // Adjust margin for mobile and larger screens
            //   textAlign: { xs: "center", sm: "left" }, // Center text on mobile
            // }}
          >
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
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            // textColor="#fff"
            sx={{
              padding: "10px",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
              textAlign: { xs: "center", sm: "left" },
              alignSelf: "center",
            }}
          >
            <Tab
              value="/home"
              label="TRANG CHỦ"
              component="label"
              disableRipple
              onClick={() => navigate("home")}
            />
            <Tab
              value="/notification"
              label="THÔNG BÁO"
              component="label"
              disableRipple
            />
            <Tab
              value="/information"
              label="SỰ KIỆN - TIN TỨC"
              component="label"
              disableRipple
            />
            <Tab
              value="/login"
              label="ĐĂNG NHẬP"
              component="label"
              disableRipple
              sx={[
                (theme) => ({
                  marginRight: { xs: "0px", sm: "10px" }, // Remove margin on mobile
                  "&:hover": {
                    color: "primary.light",
                    backgroundColor: "transparent",
                  },
                  ...theme.applyStyles("dark", {
                    color: "#fff",
                  }),
                }),
              ]}
              onClick={() => navigate("login")}
            />
          </Tabs>

          <Box
            sx={{
              alignSelf: "center",
            }}
          >
            <IconButton
              sx={[
                (theme) => ({
                  color: "#fff",
                  marginRight: { xs: "10px", sm: "20px" }, // Smaller margin on mobile
                  backgroundColor: themeDark.palette.primary.dark,
                  "&:hover": {
                    boxShadow: themeDark.shadows[3],
                    backgroundColor: themeDark.palette.primary.main,
                  },
                  ...theme.applyStyles("dark", {
                    backgroundColor: themeDark.palette.primary.light,
                  }),
                }),
              ]}
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
