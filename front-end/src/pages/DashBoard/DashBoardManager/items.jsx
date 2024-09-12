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
    label: "Home",
  },
  {
    key: "topic",
    icon: <UsergroupAddOutlined />,
    label: "Topic",
  },
  {
    key: "projects",
    icon: <ProjectOutlined />,
    label: "Project",
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
