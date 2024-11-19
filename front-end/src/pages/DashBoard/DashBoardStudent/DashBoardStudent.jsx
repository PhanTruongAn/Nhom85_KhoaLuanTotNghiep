import { useState } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./DashBoardStudent.scss";
import {
  Button,
  Layout,
  Menu as MenuAnt,
  ConfigProvider,
  Modal,
  Drawer,
  message,
} from "antd"; // Thêm Drawer
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import items from "./items.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, Box, Popover } from "@mui/material"; // Popover từ MUI
import CssBaseline from "@mui/material/CssBaseline";
import authApi from "../../../apis/authApi.jsx";
import lightTheme from "../../../styles/Themes/ant/lightTheme.jsx";
import themeDark from "../../../styles/Themes/mui/themeDark.jsx";
import themeLight from "../../../styles/Themes/mui/themeLight.jsx";
import darkTheme from "../../../styles/Themes/ant/darkTheme.jsx";
import logoDark from "../../../images/Logo-White.avif";
import logoLight from "../../../images/logo-iuh.avif";
import ListNotification from "./notifications/listNotification.jsx";
import {
  setCurrentTerm,
  setNotes,
  setGroup,
} from "../../../redux/userSlice.jsx";
import { isEmpty } from "lodash";
import CustomHooks from "../../../utils/hooks.jsx";
import studentApi from "../../../apis/studentApi.jsx";
import ChangeTheme from "../../../components/Header/ChangeTheme.jsx";
const { Header, Sider, Content } = Layout;

const DashBoardStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const group = useSelector((state) => state.userInit.group);
  const user = useSelector((state) => state.userInit.user);
  const notes = useSelector((state) => state.userInit.notes);
  const [themes, setThemes] = useState(() => {
    const storedTheme = localStorage.getItem("themeDark");
    return storedTheme === "true";
  });
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [modal, contextHolder] = Modal.useModal();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mở Drawer (Sider dưới dạng modal)
  const openDrawer = () => {
    setDrawerVisible(true);
  };
  const getTerm = async () => {
    let id = user.id;
    let res = await studentApi.getTerm(id);
    return res;
  };

  const getNotes = async () => {
    let termId = currentTerm?.id;
    let roleId = user?.role?.id;
    let res = await studentApi.getNotes(termId, roleId);
    return res;
  };

  const getMyGroup = async () => {
    const res = await studentApi.getMyGroup(user.id, currentTerm.id);
    if (res && res.status === 0) {
      dispatch(setGroup(res.data));
    }
    return res.data;
  };

  CustomHooks.useQuery(["my-group", group], getMyGroup, {
    enabled: !isEmpty(currentTerm),
  });
  CustomHooks.useQuery(["notes"], getNotes, {
    enabled: user.role && !isEmpty(currentTerm) && isEmpty(notes),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        dispatch(setNotes(res.data));
      }
    },
    onError: (error) => {
      messageApi.error(`${error}!`);
    },
  });
  CustomHooks.useQuery(["term"], getTerm, {
    enabled: isEmpty(currentTerm),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        dispatch(setCurrentTerm(res.data));
      } else {
        messageApi.error(res.message);
      }
    },
    onError: (error) => {
      messageApi.error(`${error}!`);
    },
  });
  // Đóng Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Xử lý mở Popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng Popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Kiểm tra Popover mở hay đóng

  const confirmLogout = () => {
    modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn đăng xuất?",
      okText: "Ok",
      cancelText: "Hủy bỏ",
      onOk: handleLogout,
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
      confirmLogout();
    } else {
      setDrawerVisible(false);
      navigate(key);
    }
  };

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]); // Chỉ cho phép một menu con mở
    } else {
      setOpenKeys([]); // Đóng tất cả nếu không có menu nào mở
    }
  };

  const changeTheme = () => {
    const newTheme = !themes;
    setThemes(newTheme);
    localStorage.setItem("themeDark", newTheme);
  };

  return (
    <ConfigProvider theme={themes ? darkTheme : lightTheme}>
      {contextHolder}
      {contextHolderMessage}
      <ThemeProvider theme={themes ? themeDark : themeLight}>
        <CssBaseline />
        <Layout className="container-fluid p-0 student-container">
          {/* Sider cho màn hình lớn hơn 768px */}
          <Sider
            className="ant-sider-desktop"
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ position: "relative" }}
            width={250}
          >
            {!collapsed && (
              <Box className="demo-logo-vertical" sx={{ textAlign: "center" }}>
                <img
                  src={themes ? logoDark : logoLight}
                  style={{
                    width: "80%",
                    height: "auto",
                    alignSelf: "center",
                    paddingLeft: "10px",
                  }}
                  alt="Logo"
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
                <Box
                  sx={{
                    fontWeight: "bold",
                    paddingY: "2px", // Reduced padding to avoid layout expansion
                    paddingX: "6px", // Reduced padding to avoid extra space
                    fontSize: "15px", // Slightly smaller font size
                    maxWidth: "80%", // Limit the width to prevent layout stretching
                    margin: "10px auto",
                    textAlign: "center",
                    borderRadius: "8px",
                    boxShadow: themes
                      ? "0 2px 5px rgba(255, 255, 255, 0.2)"
                      : "0 2px 5px rgba(0, 0, 0, 0.1)",
                    border: themes
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(0, 0, 0, 0.1)",
                    backgroundColor: themes ? "#2c3e50" : "#fff",
                  }}
                >
                  {currentTerm.name}
                </Box>
              </Box>
            )}
            <MenuAnt
              selectedKeys={
                window.location.pathname.split("/dashboard/")[1] ||
                window.location.pathname
              }
              onClick={handlePath}
              defaultSelectedKeys={
                window.location.pathname || "/dashboard/home"
              }
              openKeys={openKeys}
              onOpenChange={handleOpenChange} // Quản lý trạng thái mở
              mode="inline"
              theme={themes ? "dark" : "light"}
              items={items}
              style={{
                marginTop: "10px",
                height: "calc(92vh - 110px)",
              }}
            />
          </Sider>

          {/* Drawer cho màn hình nhỏ hơn 768px */}
          <Drawer
            title="Menu"
            placement="left"
            onClose={closeDrawer}
            open={drawerVisible}
            className="ant-sider-mobile custom-drawer"
            styles={{ body: { padding: 0 } }}
          >
            <Box className="drawer-body">
              <MenuAnt
                selectedKeys={
                  window.location.pathname.split("/dashboard/")[1] ||
                  window.location.pathname
                }
                onClick={(e) => {
                  handlePath(e);
                  closeDrawer(); // Đóng Drawer khi chọn Tab
                }}
                defaultSelectedKeys={
                  window.location.pathname || "/dashboard/home"
                }
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                mode="inline"
                theme={themes ? "dark" : "light"}
                items={items}
                className="custom-menu"
                style={{ overflow: "auto" }}
              />
            </Box>
          </Drawer>

          <Layout className="container-fluid p-0" style={{ height: "100vh" }}>
            <Header
              className="header-content"
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
                onClick={() => {
                  if (window.innerWidth < 769) {
                    openDrawer(); // Mở Drawer cho màn hình nhỏ
                  } else {
                    setCollapsed(!collapsed); // Toggle Sider cho màn hình lớn
                  }
                }}
              />
              <Box
                className="option"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "-50px",
                }}
              >
                {/* ChangeTheme Component */}
                <Box sx={{ marginRight: "10px" }}>
                  <ChangeTheme
                    theme={themes} // Pass the current theme value
                    changeTheme={changeTheme} // Pass the theme toggle function
                  />
                </Box>

                {/* Bell Icon Button */}
                <Button
                  size="large"
                  icon={<BellOutlined className="bell-icon" />}
                  onClick={handlePopoverOpen}
                >
                  {!isEmpty(notes) && notes.length > 0 && (
                    <span className="notification-badge">{notes.length}</span>
                  )}
                </Button>

                {/* Popover for Notifications */}
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <ListNotification />
                  </Box>
                </Popover>
              </Box>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                color: themes ? "#fff" : "#000",
                background: themes ? "#071522" : "#fff",
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
