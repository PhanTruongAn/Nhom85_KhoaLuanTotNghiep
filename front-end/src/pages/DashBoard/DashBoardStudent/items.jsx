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
  ReadOutlined,
  TableOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "topic",
    icon: <ReadOutlined />,
    label: "Topic",
  },
  {
    key: "Điểm số",
    icon: <TableOutlined />,
    label: "Điểm số",
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
