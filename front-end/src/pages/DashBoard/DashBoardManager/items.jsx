// items.js
import {
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  OrderedListOutlined,
  ClusterOutlined,
  NotificationOutlined,
  UserAddOutlined,
  LockOutlined,
  KeyOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
  AreaChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";

const getItems = (isManager) => {
  const items = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      children: [
        ...(isManager
          ? [
              {
                key: "statistical",
                icon: <AreaChartOutlined />,
                label: "Thống kê",
              },
            ]
          : []),
        {
          key: "information",
          icon: <UserOutlined />,
          label: "Thông tin cá nhân",
        },
      ],
    },

    {
      key: "manager-topic",
      icon: <TopicOutlinedIcon />, // Chủ đề
      label: "Đề tài",
      children: [
        {
          key: "topic",
          icon: <AddBoxOutlinedIcon />, // Thêm đề tài
          label: "Thêm đề tài",
        },
        {
          key: "personal-list-topic",
          icon: <ListAltOutlinedIcon />, // Đề tài cá nhân
          label: "Đề tài của tôi",
        },
        ...(isManager
          ? [
              {
                key: "manage-list-topic",
                icon: <AssignmentTurnedInOutlinedIcon />, // Quản lý danh sách đề tài
                label: "Danh sách đề tài",
              },
            ]
          : []),
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
              {
                key: "list-group-student",
                icon: <OrderedListOutlined />,
                label: "Danh sách nhóm",
              },
            ]
          : []),

        {
          key: "list-group-student-lecturer",
          icon: <GroupOutlinedIcon />, // Nhóm
          label: "Nhóm của tôi",
        },
      ],
    },

    {
      key: "classify-lecturer",
      icon: <GroupOutlinedIcon />, // Icon cho "Nhóm giảng viên"
      label: "Nhóm giảng viên",
      children: [
        ...(isManager
          ? [
              {
                key: "create-lecturer-group",
                icon: <AddOutlinedIcon />, // Tạo nhóm
                label: "Tạo nhóm",
              },
              {
                key: "classify-type-lecturer",
                icon: <AssignmentIndOutlinedIcon />, // Phân công
                label: "Phân công",
              },
              {
                key: "manage-group-lecturer",
                icon: <ManageAccountsOutlinedIcon />, // Quản lý nhóm
                label: "Quản lý nhóm",
              },
            ]
          : []),
        {
          key: "my-group-lecturer",
          icon: <PersonOutlineOutlinedIcon />, // Nhóm của tôi
          label: "Nhóm của tôi",
        },
      ],
    },
    ...(isManager
      ? [
          {
            key: "term",
            icon: <SchoolOutlinedIcon />, // Icon chính cho "Học kỳ"
            label: "Học kỳ",
            children: [
              {
                key: "create-term",
                icon: <AddCircleOutlineOutlinedIcon />, // Tạo học kỳ
                label: "Tạo học kỳ",
              },
              {
                key: "list-term",
                icon: <ListAltOutlinedIcon />, // Danh sách học kỳ
                label: "Danh sách",
              },
              {
                key: "manage-major",
                icon: <CategoryOutlinedIcon />, // Quản lý chuyên ngành
                label: "Chuyên ngành",
              },
            ],
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
        ]
      : []),
    {
      key: "point",
      icon: <ListAltIcon />,
      label: "Chấm điểm",
      children: [
        {
          key: "point-list-group",
          icon: <ListAltIcon />,
          label: "Danh sách chấm điểm",
        },
        isManager && {
          key: "manage-point-student",
          icon: <AssignmentIcon />,
          label: "Danh sách điểm",
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
