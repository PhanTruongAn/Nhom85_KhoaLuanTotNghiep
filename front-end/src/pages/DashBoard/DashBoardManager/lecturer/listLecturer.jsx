import React, { useState } from "react";
import { Table, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons"; // Thêm biểu tượng UserOutlined
import { Box, Typography, Button } from "@mui/material";
import AddModal from "./AddModal";
const initialData = [
  {
    key: "1",
    lecturerId: "GV001",
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
  },
  {
    key: "2",
    lecturerId: "GV002",
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
  },
  // Thêm dữ liệu giảng viên khác tại đây
];

function ListLecturer() {
  const [lecturers, setLecturers] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handlerReload = () => {
    setLoading(!loading);
  };
  const handleEdit = (key) => {
    console.log("Edit lecturer with key:", key);
    // Thực hiện logic chỉnh sửa ở đây
  };

  const handleDelete = (key) => {
    setLecturers(lecturers.filter((lecturer) => lecturer.key !== key));
  };

  const columns = [
    {
      title: "Mã số giảng viên",
      dataIndex: "lecturerId",
      key: "lecturerId",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Box>
          <Button
            onClick={() => handleEdit(record.key)}
            variant="contained"
            size="small"
            sx={[
              (theme) => ({
                marginLeft: "10px",
                textTransform: "none",
                ...theme.applyStyles("dark", {
                  background: "#1DA57A",
                }),
              }),
            ]}
            startIcon={<EditOutlined />}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDelete(record.key)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
            startIcon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ float: "right" }}>
        <Space>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            Thêm mới giảng viên
          </Button>
          <Button
            onClick={handlerReload}
            variant="contained"
            startIcon={<ReloadOutlined spin={loading} />}
          >
            Làm mới
          </Button>
        </Space>
      </Box>
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Danh sách giảng viên
        </Typography>
      </Box>
      <Box>
        <Table
          columns={columns}
          dataSource={lecturers}
          pagination={{ pageSize: 5 }}
        />
      </Box>
      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
}

export default ListLecturer;
