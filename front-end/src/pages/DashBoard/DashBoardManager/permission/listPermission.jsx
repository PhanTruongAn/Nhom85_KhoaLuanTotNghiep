import React, { useState, useEffect } from "react";
import { Table, Space, message, Pagination, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { Box, Typography, Button, Input } from "@mui/material";
import AddModal from "./AddModal";
import studentApi from "../../../../apis/studentApi";
import { useNavigate } from "react-router-dom";

function ListPermission() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Đường dẫn",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
            // onClick={() => handleDelete(record.key)}
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
      <Box
        className="row col-12"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          className="row col-8"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box className="col-3">
            <Select
              style={{ width: "100%" }}
              placeholder="Chọn quyền"
              options={[
                { value: "Manager", label: "QUẢN LÝ" },
                { value: "Lecturer", label: "GIẢNG VIÊN" },
                { value: "Student", label: "SINH VIÊN" },
              ]}
            />
          </Box>

          <Box className="col-9" sx={{ flexGrow: 1 }}>
            <Input
              placeholder="Tìm kiếm"
              sx={[
                (theme) => ({
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "0 5px",
                  ...theme.applyStyles("dark", {
                    boxShadow: "0 2px 4px #1DA57A",
                  }),
                }),
              ]}
            />
          </Box>
        </Box>
        <Box className="row col-4">
          <Space>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              Thêm mới quyền hạn
            </Button>
            <Button variant="contained" startIcon={<ReloadOutlined />}>
              Làm mới
            </Button>
          </Space>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" component="h2">
          Danh sách quyền hạn
        </Typography>
      </Box>

      {/* Bảng danh sách sinh viên */}
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={5}
      />

      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
}

export default ListPermission;

const data = [
  {
    id: 1,
    apiPath: "/createStudent",
    description: "tạo tài khoản sinh viên",
  },
  {
    id: 2,
    apiPath: "/createLecturer",
    description: "tạo tài khoản giảng viên",
  },
  {
    id: 3,
    apiPath: "/bulk-create-student",
    description: "thêm nhiều tài khoản sinh viên",
  },
];
