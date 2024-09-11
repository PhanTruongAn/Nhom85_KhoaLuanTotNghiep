import React, { useState } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import "./DashBoardStudent.scss";
import { Button, Layout, Menu, theme, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import items from "./items.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
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
            background: colorBgContainer,
          }}
        >
          <Button
            className="collapsed-button"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <div className="header-content">
            Welcome, an
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
  );
};

export default DashBoardStudent;
