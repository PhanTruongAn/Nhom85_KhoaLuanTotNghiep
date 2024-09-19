import React, { useState, useEffect, useRef } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";

import "./DashBoardStudent.scss";
import {
  Button,
  Layout,
  Menu,
  theme,
  Modal,
  ConfigProvider,
  Dropdown,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import items from "./items.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ThemeProvider, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import authApi from "../../../apis/authApi.jsx";
import lightTheme from "../../../styles/themes/ant/lightTheme.jsx";
import themeDark from "../../../styles/themes/mui/themeDark.jsx";
import themeLight from "../../../styles/themes/mui/themeLight.jsx";
import darkTheme from "../../../styles/themes/ant/darkTheme.jsx";
import logoDark from "../../../images/Logo-White.png";
import logoLight from "../../../images/logo-iuh.png";
import ListNotification from "./notifications/listNotification.jsx";

const { Header, Sider, Content } = Layout;

const DashBoardStudent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInit.user);
  const [themes, setThemes] = useState(() => {
    const storedTheme = localStorage.getItem("themeDark");
    return storedTheme === "true";
  });
  const [collapsed, setCollapsed] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState(false); // State for notification dropdown
  const [notifications, setNotifications] = useState(1); // Example state for notifications
  const dropdownRef = useRef(null);

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
    const res = await authApi.logOut();
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

  const toggleNotification = () => {
    setVisible(!visible);
    if (visible) {
      setNotifications(0); // Reset notification count when opened
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ConfigProvider theme={themes ? darkTheme : lightTheme}>
      <ThemeProvider theme={themes ? themeDark : themeLight}>
        <CssBaseline />
        <Layout className="container-fluid p-0 admin-container">
          {contextHolder}
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ position: "relative" }}
          >
            {!collapsed && (
              <div
                className="demo-logo-vertical"
                style={
                  {
                    /* styles */
                  }
                }
              >
                <img
                  src={themes ? logoDark : logoLight}
                  style={{
                    width: "80%",
                    height: "auto",
                    alignSelf: "center",
                    paddingLeft: "10px",
                  }}
                />
                <Box
                  sx={{
                    fontWeight: "700",
                    paddingTop: "10px",
                    fontSize: "14px",
                    paddingLeft: "10px",
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
              items={items}
              style={{
                marginTop: "10px",
                height: "calc(100vh - 110px)",
              }}
            />
          </Sider>
          <Layout className="container-fluid p-0">
            <Header
              style={{
                padding: 0,
                backgroundColor: themes ? "#001529" : "#ffffff",
                color: themes ? "#ffffff" : "#000",
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
              <div className="student-container">
                <div className="header-content" ref={dropdownRef}>
                  <span>Chào mừng quay lại {user.fullName}</span>
                  <Button
                    className={className}
                    size="large"
                    icon={themes ? <SunOutlined /> : <MoonOutlined />}
                    onClick={changeTheme}
                    style={{ marginRight: "16px", marginTop: "-3px" }}
                  />
                  <Dropdown
                    overlay={<ListNotification />}
                    visible={visible}
                    onClick={toggleNotification}
                    arrow
                    placement="bottomRight"
                  >
                    <Button
                      className="bell-icon"
                      size="large"
                      style={{
                        backgroundColor: themes ? "#001529" : "#ffffff",
                      }}
                      icon={
                        <BellOutlined
                          style={{ color: themes ? "#fff" : "#000" }}
                        />
                      }
                    >
                      {notifications > 0 && (
                        <span
                          className="notification-badge"
                          style={{ overflow: "scroll", width: "500px" }}
                        >
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                color: themes ? "#fff" : "#000",
                background: themes ? "#152f40" : "#fff",
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

export default DashBoardStudent;
