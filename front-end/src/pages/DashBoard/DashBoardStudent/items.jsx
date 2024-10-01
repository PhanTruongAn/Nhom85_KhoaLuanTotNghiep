import {
  SettingOutlined,
  GroupOutlined,
  LogoutOutlined,
  HomeOutlined,
  ReadOutlined,
  TableOutlined,
  KeyOutlined,
  OrderedListOutlined,
  UserOutlined,
  FileDoneOutlined,
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
    children: [
      {
        key: "list-student-group",
        icon: <OrderedListOutlined />,
        label: "Danh sách nhóm",
      },
      {
        key: "my-group",
        icon: <UserOutlined />,
        label: "Nhóm của tôi",
      },
    ],
  },
  {
    key: "topic",
    icon: <ReadOutlined />,
    label: "Đề tài",
    children: [
      {
        key: "list-topic",
        icon: <OrderedListOutlined />,
        label: "Danh sách đề tài",
      },
      {
        key: "my-topic",
        icon: <ReadOutlined />,
        label: "Đề tài của tôi",
      },
    ],
  },
  {
    key: "criteria",
    icon: <FileDoneOutlined />,
    label: "Tiêu chí đánh giá",
  },
  {
    key: "my-point",
    icon: <TableOutlined />,
    label: "Điểm số",
  },
  {
    key: "sub1",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "change-password",
        icon: <KeyOutlined />,
        label: "Đổi mật khẩu",
      },
      {
        key: "log-out",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  },
];
export default items;
