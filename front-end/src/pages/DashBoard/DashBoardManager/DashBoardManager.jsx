import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";
import "./DashBoardManager.scss";
import {
  Button,
  Layout,
  Menu as MenuAnt,
  theme,
  ConfigProvider,
  Modal,
  message,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import getItems from "./items.jsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, Box, Popover, Select, MenuItem } from "@mui/material"; // Popover từ MUI
import CssBaseline from "@mui/material/CssBaseline";
import authApi from "../../../apis/authApi.jsx";
import lightTheme from "../../../styles/themes/ant/lightTheme.jsx";
import darkTheme from "../../../styles/themes/ant/darkTheme.jsx";
import themeDark from "../../../styles/themes/mui/themeDark.jsx";
import themeLight from "../../../styles/themes/mui/themeLight.jsx";
import logoDark from "../../../images/Logo-White.png";
import logoLight from "../../../images/logo-iuh.png";
import ListNotification from "./notifications/listNotification.jsx";
import CustomHooks from "../../../utils/hooks.jsx";
import managerApi from "../../../apis/managerApi.jsx";
import { setCurrentTerm, setTerms } from "../../../redux/userSlice.jsx";
import { isEmpty } from "lodash";
import { getCurrentTerm } from "../../../utils/getCurrentTerm.jsx";
import lecturerApi from "../../../apis/lecturerApi.jsx";
const { Header, Sider, Content } = Layout;

const DashBoardManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [notifications, setNotifications] = useState(5);
  const [selectedOption, setSelectedOption] = useState(1);
  const terms = useSelector((state) => state.userInit.terms);
  const user = useSelector((state) => state.userInit.user);
  const isManager = user.role.name === "MANAGER" || user.role.name === "ADMIN";
  const items = getItems(isManager);

  const [themes, setThemes] = useState(() => {
    const storedTheme = localStorage.getItem("themeDark");
    return storedTheme === "true";
  });

  const getManagerTerms = async () => {
    const res = await managerApi.getTerms();
    if (res && res.status === 0) {
      dispatch(setTerms(res.data));
    } else if (res.status === 1) {
      messageApi.info(res.message);
    } else {
      messageApi.error(res.message);
    }
    return res;
  };
  const getLecturerTerm = async () => {
    let id = user.id;
    const res = await lecturerApi.getTerm(id);
    if (res && res.status === 0) {
      dispatch(setCurrentTerm(res.data));
    } else if (res.status === 1) {
      messageApi.info(res.message);
    } else {
      messageApi.error(res.message);
    }
    return res;
  };
  const {
    data: termsData,
    isFetching,
    refetch,
  } = CustomHooks.useQuery(
    ["terms"],
    () => {
      if (isManager) {
        return getManagerTerms();
      } else {
        return getLecturerTerm();
      }
    },

    {
      enabled: isEmpty(terms) || isEmpty(currentTerm),
      onSuccess: (res) => {},
      onError: (error) => {
        messageApi.error(`${error}!`);
      },
    }
  );
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]); // State để theo dõi menu con đang mở
  const [modal, contextHolder] = Modal.useModal();
  const [anchorEl, setAnchorEl] = useState(null); // State cho Popover (MUI)

  // Xử lý mở Popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng Popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Kiểm tra Popover mở hay đóng

  useEffect(() => {
    const currentTerm = getCurrentTerm(terms);
    dispatch(setCurrentTerm(currentTerm));
    setSelectedOption(currentTerm?.id || 1);
  }, [terms, dispatch]);

  const confirm = () => {
    modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn đăng xuất?",
      okText: "Ok",
      cancelText: "Hủy bỏ",
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

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]); // Chỉ cho phép một menu con mở
    } else {
      setOpenKeys([]); // Đóng tất cả nếu không có menu nào mở
    }
  };

  const className = themes ? "btn-logOut dark-theme" : "btn-logOut light-theme";
  const changeTheme = () => {
    setThemes(!themes);
  };

  let onSelectedTerm = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    let selectedTerm = terms.find((item) => {
      return value === item.id;
    });
    dispatch(setCurrentTerm(selectedTerm));
  };
  console.log("Check current Term: ", currentTerm);
  return (
    <ConfigProvider theme={themes ? darkTheme : lightTheme}>
      <ThemeProvider theme={themes ? themeDark : themeLight}>
        <CssBaseline />
        <Layout
          className="container-fluid p-0 admin-container"
          hasSider
          style={{ minHeight: "100vh" }}
        >
          {contextHolder}
          {contextHolderMessage}
          {!collapsed && (
            <Box
              sx={{
                width: "250px",

                height: "670px",
                backgroundColor: themes ? "#001529" : "#fff",
              }}
            >
              <Box>
                <Box
                  className="demo-logo-vertical"
                  sx={{
                    textAlign: "center",
                    backgroundColor: themes ? "#001529" : "#fff",
                  }}
                >
                  <img
                    src={themes ? logoDark : logoLight}
                    alt="Logo"
                    style={{
                      width: "80%",
                      height: "auto",
                    }}
                  />
                  <Box
                    sx={{
                      fontWeight: "700",
                      fontSize: "14px",
                      mt: 1,
                      color: themes ? "#fff" : "#000",
                    }}
                  >
                    KHÓA LUẬN TỐT NGHIỆP
                  </Box>
                  <Select
                    value={currentTerm?.id || selectedOption}
                    onChange={(event) => onSelectedTerm(event)}
                    variant="outlined"
                    size="small"
                    sx={{
                      width: 200,
                      textAlign: "center",
                      marginRight: "10px",
                      marginTop: "10px",
                      backgroundColor: themes ? "#2c3e50" : "#f0f0f0",
                      color: themes ? "#fff" : "#000",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: themes ? "#34495e" : "#d9d9d9",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: themes ? "#1abc9c" : "#40a9ff",
                      },
                      "& .MuiSelect-icon": {
                        color: themes ? "#fff" : "#000",
                      },
                    }}
                    disabled={!isManager} // Disable Select nếu không phải là manager
                  >
                    {isManager ? (
                      terms && terms.length > 0 ? (
                        terms.map((term, index) => (
                          <MenuItem key={index} value={term.id}>
                            {term.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No terms available</MenuItem>
                      )
                    ) : (
                      <MenuItem value={currentTerm?.id}>
                        {currentTerm?.name}
                      </MenuItem>
                    )}
                  </Select>

                  <MenuAnt
                    selectedKeys={[
                      window.location.pathname.split("/dashboard/")[1] ||
                        window.location.pathname,
                    ]}
                    onClick={(key) => handlePath(key)}
                    defaultSelectedKeys={[
                      window.location.pathname || "/dashboard/home",
                    ]}
                    openKeys={openKeys}
                    onOpenChange={handleOpenChange} // Thêm hàm này để quản lý trạng thái mở
                    mode="inline"
                    theme={themes ? "dark" : "light"}
                    items={items}
                    style={{
                      marginTop: "10px",
                      height: "490px", // Adjust height to fill the remaining space
                      overflowY: "auto",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          <Layout className="container-fluid p-0">
            <Header style={{ padding: 0 }}>
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
              <Box className="student-container" sx={{ float: "right" }}>
                <span style={{ marginRight: "10px" }}>
                  Chào mừng quay lại <strong>{user.fullName}</strong>
                </span>
                <Button
                  className={`btn-logOut ${
                    themes ? "dark-theme" : "light-theme"
                  }`}
                  size="large"
                  icon={themes ? <SunOutlined /> : <MoonOutlined />}
                  onClick={changeTheme}
                  style={{ marginRight: "10px", marginTop: "10px" }}
                />
                {/* Popover MUI thay cho Dropdown */}
                <Button
                  className="bell-icon"
                  size="large"
                  icon={<BellOutlined />}
                  onClick={handlePopoverOpen}
                  style={{ marginRight: "10px", marginTop: "10px" }}
                >
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </Button>

                {/* Hiển thị Popover */}
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
                overflowY: "auto",
                maxHeight: "580px",
                background: themes ? "#152f40" : "#fff",
                borderRadius: borderRadiusLG,
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
