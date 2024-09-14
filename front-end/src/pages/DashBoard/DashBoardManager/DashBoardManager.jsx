import React, { useState } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import "./DashBoardManager.scss";
import { Button, Layout, Menu, theme, Modal, ConfigProvider } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import items from "./items.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import userApi from "../../../apis/userApi.jsx";
import lightTheme from "../../../styles/themes/ant/lightTheme.jsx";
import themeDark from "../../../styles/themes/mui/themeDark.jsx";
import themeLight from "../../../styles/themes/mui/themeLight.jsx";
import darkTheme from "../../../styles/themes/ant/darkTheme.jsx";
import logoDark from "../../../images/Logo-White.png";
import logoLight from "../../../images/logo-iuh.png";
const { Header, Sider, Content } = Layout;

const DashBoardManager = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInit.user);
  const [themes, setThemes] = useState(() => {
    const storedTheme = localStorage.getItem("themeDark");
    return storedTheme === "true";
  });
  const [collapsed, setCollapsed] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to want logout?",
      okText: "Ok",
      cancelText: "Cancel",
      onOk: () => handleLogout(),
    });
  };

  const handleLogout = async () => {
    const res = await userApi.logOut();
    if (res && res.status === 0) {
      localStorage.removeItem("accessToken");
      toast.success(res.message);
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 1000);
    } else {
      toast.error(res.message);
    }
  };

  // const currentTheme = themes
  //   ? {
  //       token: {
  //         colorBgContainer: "#001529", // Màu nền cho theme tối
  //         colorTextBase: "#fff",
  //         colorBorder: "#fff",
  //       },
  //     }
  //   : {
  //       token: {
  //         colorBgContainer: "#ffffff", // Màu nền cho theme sáng
  //         colorTextBase: "#000",
  //       },
  //     };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePath = ({ key }) => {
    if (key === "log-out") {
      confirm();
    } else {
      navigate(key);
    }
  };
  const className = themes ? "btn-logOut dark-theme" : "btn-logOut light-theme";
  const changeTheme = () => {
    setThemes(!themes);
  };
  return (
    <ConfigProvider theme={themes ? darkTheme : lightTheme}>
      <ThemeProvider theme={themes ? themeDark : themeLight}>
        <CssBaseline />
        <Layout className="container-fluid p-0 admin-container" hasSider>
          {contextHolder}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ position: "relative" }}
            // theme={themes ? "dark" : "light"}
          >
            {!collapsed && (
              <div
                className="demo-logo-vertical"
                style={{
                  borderInlineEnd: "1px solid rgba(5, 5, 5, 0.06)",
                  position: "absolute", // Đặt logo ở vị trí tuyệt đối
                  left: "0",
                  right: "0",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "10px",
                }}
              >
                <img
                  src={themes ? logoDark : logoLight}
                  style={{ width: "80%", height: "auto", alignSelf: "center" }}
                ></img>

                <Box
                  sx={{
                    fontWeight: "700",
                    paddingTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  KHÓA LUẬN TỐT NGHIỆP
                </Box>
              </div>
            )}
            <Menu
              selectedKeys={
                window.location.pathname.split("/dashboard/")[1]
                  ? window.location.pathname.split("/dashboard/")[1]
                  : window.location.pathname
              }
              onClick={(key) => handlePath(key)}
              defaultSelectedKeys={
                window.location.pathname
                  ? window.location.pathname
                  : "/dashboard/home"
              }
              defaultOpenKeys={["/dashboard/home"]}
              mode="inline"
              theme={themes ? "dark" : "light"}
              // inlineCollapsed={collapsed}
              items={items}
              style={
                !collapsed
                  ? {
                      transition: "0.5s ease",
                      marginTop: "110px", // Thêm khoảng cách đủ lớn để logo không đè lên menu
                      height: "calc(100vh - 110px)", // Giữ menu chiếm toàn bộ chiều cao còn lại
                    }
                  : { transition: "0.5s ease", height: "100vh" }
              }
            />
          </Sider>
          <Layout className="container-fluid p-0">
            <Header
              style={{
                padding: 0,
              }}
            >
              <Button
                className="collapsed-button"
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined
                      style={{ color: themes ? "#fff" : "#000" }}
                    />
                  ) : (
                    <MenuFoldOutlined
                      style={{ color: themes ? "#fff" : "#000" }}
                    />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
              />

              <div className="header-content">
                Chào mừng quay lại {user.fullName}
                <Button
                  className={className}
                  size="large"
                  icon={themes ? <SunOutlined /> : <MoonOutlined />}
                  onClick={changeTheme}
                />
              </div>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                color: themes ? "#fff" : "#000",
                minHeight: 280,
                height: "100%",
                background: themes ? "#152f40" : "#fff",
                borderRadius: borderRadiusLG,
                overflow: "auto",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default DashBoardManager;
