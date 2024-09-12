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
    key: "account",
    icon: <ProjectOutlined />,
    label: "Tài khoản",
  },
  {
    key: "role-menu",
    icon: <MenuOutlined />,
    label: "Role",
    children: [
      {
        key: "roles",
        icon: <ControlOutlined />,
        label: "View Roles",
      },
      {
        key: "group-roles",
        icon: <ClusterOutlined />,
        label: "Group Roles",
      },
    ],
  },
  {
    key: "messages",
    icon: <MessageOutlined />,
    label: "Message",
  },
  {
    key: "sub1",
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
