import {
  SettingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  LogoutOutlined,
  HomeOutlined,
  ProjectOutlined,
  MessageOutlined,
  ControlOutlined,
  ClusterOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Trang chủ",
  },
  {
    key: "topic",
    icon: <UsergroupAddOutlined />,
    label: "Đề tài",
  },
  {
    key: "student",
    icon: <ProjectOutlined />,
    label: "Sinh viên",
    children: [
      {
        key: "account-student",
        icon: <ControlOutlined />,
        label: "Tài khoản",
      },
      {
        key: "list-student",
        icon: <ClusterOutlined />,
        label: "Danh sách",
      },
    ],
  },
  {
    key: "notification",
    icon: <NotificationOutlined />,
    label: "Thông báo",
  },
  {
    key: "setting",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "log-out",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  },
];
export default items;
