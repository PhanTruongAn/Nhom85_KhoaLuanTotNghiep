import { useState } from "react";
import { Table, Space, Popconfirm } from "antd";
import { Box, Button, Typography } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Import the UpdateGroupModalLecturer component
import UpdateGroupModalLecturer from "./UpdateGroupModalLecturer";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import SearchComponent from "../../../../components/SearchComponent/search";

// Sample data generation
const mockData = [
  {
    id: "1",
    groupName: "Group A",
    numberOfMembers: 2,
    lecturers: [
      {
        id: "101",
        fullName: "Dr. John Doe",
        username: "jdoe",
        email: "jdoe@example.com",
        phone: "123456789",
      },
      {
        id: "102",
        fullName: "Dr. Jane Smith",
        username: "jsmith",
        email: "jsmith@example.com",
        phone: "987654321",
      },
    ],
  },
  {
    id: "2",
    groupName: "Group B",
    numberOfMembers: 2,
    lecturers: [
      {
        id: "103",
        fullName: "Dr. Emily White",
        username: "ewhite",
        email: "ewhite@example.com",
        phone: "555555555",
      },
    ],
  },
];

const ManageGroupLecturer = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [dataSource, setDataSource] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const handleOpenUpdateModal = (group, isEditing = false) => {
    setSelectedGroup({ ...group, isEditing });
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedGroup(null);
  };

  const handleDeleteGroup = (record) => {
    setDataSource(dataSource.filter((group) => group.id !== record.id));
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: "5%" },
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      width: "30%",
    },
    {
      title: "Số lượng ",
      key: "numberOfMembers",
      width: "20%",
      render: (record) => record?.numberOfMembers || "No topic assigned",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleOpenUpdateModal(record, true)}
            variant="contained"
            size="small"
            endIcon={<EditOutlined />}
            sx={{ backgroundColor: "#FF993A", marginLeft: 1 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Delete this group?"
            onConfirm={() => handleDeleteGroup(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              endIcon={<DeleteOutlined />}
              sx={{ marginLeft: 1 }}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ position: "relative", mb: 2 }}>
        <SearchComponent
          placeholder="Search by lecturer name or topic"
          onChange={(e) => console.log("Searching:", e.target.value)}
        />
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CustomButton
            onClick={() => console.log("Refreshing data...")}
            text="Refresh Data"
            type="refresh"
            loading={loading}
          />
        </Box>
      </Box>

      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Lecturer Group List
      </Typography>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          total: dataSource.length,
          responsive: true,
        }}
        locale={{
          emptyText: <EmptyData text="No data available!" />,
        }}
      />

      <UpdateGroupModalLecturer
        lecturerSelect={selectedGroup}
        isOpen={openUpdateModal}
        closeModal={handleCloseUpdateModal}
        onCancel={handleCloseUpdateModal}
      />
    </Box>
  );
};

export default ManageGroupLecturer;
