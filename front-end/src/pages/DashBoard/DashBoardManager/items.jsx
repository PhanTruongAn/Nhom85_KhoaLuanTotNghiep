import {
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  ProjectOutlined,
  OrderedListOutlined,
  ClusterOutlined,
  NotificationOutlined,
  UserAddOutlined,
  LockOutlined,
} from "@ant-design/icons";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Trang chủ",
  },
  {
    key: "topic",
    icon: <TopicOutlinedIcon />,
    label: "Đề tài",
  },
  {
    key: "student",
    icon: <PeopleAltOutlinedIcon />,
    label: "Sinh viên",
    children: [
      {
        key: "account-student",
        icon: <AccountCircleOutlinedIcon />,
        label: "Tài khoản",
      },
      {
        key: "list-student",
        icon: <OrderedListOutlined />,
        label: "Danh sách",
      },
    ],
  },
  {
    key: "lecturer",
    icon: <PeopleAltOutlinedIcon />,
    label: "Giảng viên",
    children: [
      {
        key: "account-lecturer",
        icon: <AccountCircleOutlinedIcon />,
        label: "Tài khoản",
      },
      {
        key: "list-lecturer",
        icon: <OrderedListOutlined />,
        label: "Danh sách",
      },
    ],
  },
  {
    key: "role",
    icon: <ClusterOutlined />,
    label: "Phân quyền",
    children: [
      {
        key: "list-permission",
        icon: <LockOutlined />,
        label: "Quyền hạn",
      },
      {
        key: "role-permission",
        icon: <UserAddOutlined />,
        label: "Gán quyền",
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
