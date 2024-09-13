import React, { useState } from "react";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Thêm biểu tượng UserOutlined
import { Box, Typography, Button } from "@mui/material";

const initialData = [
  {
    key: "1",
    lecturerId: "SV001",
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
  },
  {
    key: "2",
    lecturerId: "SV002",
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
  },
  // Thêm dữ liệu giảng viên khác tại đây
];

function ListLecturer() {
  const [lecturers, setLecturers] = useState(initialData);

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
        <>
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
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ textAlign: "center" }}>
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
    </Box>
  );
}

export default ListLecturer;
