import {
  SettingOutlined,
  GroupOutlined,
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
    label: "Trang Chủ",
  },
  {
    key: "group",
    icon: <GroupOutlined />,
    label: "Nhóm của tôi",
  },
  {
    key: "topic",
    icon: <ReadOutlined />,
    label: "Đề tài",
  },
  {
    key: "Điểm số",
    icon: <TableOutlined />,
    label: "Điểm số",
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
