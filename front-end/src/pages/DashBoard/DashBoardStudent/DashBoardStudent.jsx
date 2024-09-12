import React, { useState } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import "./DashBoardStudent.scss";
import { Button, Layout, Menu, theme, Modal, ConfigProvider } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import items from "./items.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import userApi from "../../../apis/userApi.jsx";
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
      navigate("/login");
      toast.success(res.message);
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
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            /* here is your component tokens */
            headerColor: themes ? "#fff" : "#000",
            headerBg: themes ? "#001529" : "#fff",
          },
        },
      }}
    >
      <Layout className="container-fluid p-0 admin-container">
        {contextHolder}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme={themes ? "dark" : "light"}
        >
          <div className="demo-logo-vertical" />
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
            style={{ height: "100vh" }}
          />
        </Sider>
        <Layout className="container-fluid p-0">
          <Header
            style={{
              padding: 0,
              // color: currentTheme.token.colorTextBase,
              // background: colorBgContainer,
              // borderLeft: `1px solid ${currentTheme.token.colorBorder}`,
              // borderBottom: `1px solid ${currentTheme.token.colorBorder}`,
            }}
          >
            <Button
              color={themes ? "#fff" : "#000"}
              className="collapsed-button"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />

            <div className="header-content">
              Welcome, {user.fullName}
              <Button
                className={className}
                size="large"
                icon={themes ? <MoonOutlined /> : <SunOutlined />}
                onClick={changeTheme}
              />
            </div>
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashBoardStudent;
