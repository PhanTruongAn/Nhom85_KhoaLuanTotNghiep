// items.js
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
  KeyOutlined,
  UsergroupAddOutlined,
  FileExcelOutlined,
  BarChartOutlined,
  TableOutlined,
  PlusOutlined,
  AreaChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const getItems = (isManager) => {
  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      children: [
        { key: "statistical", icon: <AreaChartOutlined />, label: "Thống kê" },
        {
          key: "information",
          icon: <UserOutlined />,
          label: "Thống tin cá nhân",
        },
      ],
    },
    {
      key: "term",
      icon: <BarChartOutlined />,
      label: "Học kì",
      children: [
        {
          key: "create-term",
          icon: <PlusOutlined />,
          label: "Tạo học kì",
        },
        {
          key: "list-term",
          icon: <OrderedListOutlined />,
          label: "Danh sách",
        },
      ],
    },
    {
      key: "manager-topic",
      icon: <TopicOutlinedIcon />,
      label: "Đề tài",
      children: [
        {
          key: "topic",
          icon: <FileExcelOutlined />,
          label: "Tạo đề tài",
        },
        {
          key: "manage-list-topic",
          icon: <OrderedListOutlined />,
          label: "Danh sách",
        },
      ],
    },
    {
      key: "groups-student",
      icon: <PeopleAltOutlinedIcon />,
      label: "Nhóm sinh viên",
      children: [
        ...(isManager
          ? [
              {
                key: "create-group-student",
                icon: <UsergroupAddOutlined />,
                label: "Tạo nhóm",
              },
            ]
          : []),
        {
          key: "list-group-student",
          icon: <OrderedListOutlined />,
          label: "Danh sách ",
        },
      ],
    },

    ...(isManager
      ? [
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
            key: "point",
            icon: <TableOutlined />,
            label: "Chấm điểm",
            children: [
              {
                key: "point-list-group",
                icon: <OrderedListOutlined />,
                label: "Danh sách ",
              },
            ],
          },
        ]
      : []),
    {
      key: "notification",
      icon: <NotificationOutlined />,
      label: "Thông báo",
      children: [
        {
          key: "create-notification",
          icon: <PlusOutlined />,
          label: "Tạo thông báo",
        },
        {
          key: "manage-notification",
          icon: <OrderedListOutlined />,
          label: "Danh sách ",
        },
      ],
    },
    {
      key: "setting",
      icon: <SettingOutlined />,
      label: "Cài đặt",
      children: [
        {
          key: "change-password",
          icon: <KeyOutlined />,
          label: "Đổi mật khẩu",
        },
        {
          key: "log-out",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
        },
      ],
    },
  ];

  return items;
};

export default getItems;
