import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Select, Table, Tag } from "antd";
import data from "./data"; // Đảm bảo file này tồn tại và xuất dữ liệu đúng cách
import { CheckOutlined } from "@ant-design/icons";

function RolePermission() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null); // Thêm state để lưu giá trị đã chọn

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value); // Cập nhật giá trị đã chọn
    setSelectedRowKeys([]); // Xóa lựa chọn cũ khi thay đổi vai trò
  };

  // Lọc dữ liệu dựa trên vai trò đã chọn
  const filteredData = selectedRole
    ? data.filter((item) =>
        item.apiPath.startsWith(`/${selectedRole.toLowerCase()}`)
      )
    : data; // Nếu không có vai trò nào được chọn, hiển thị tất cả dữ liệu

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const columns = [
    {
      title: "Mã quyền",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Đường dẫn",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Giải thích",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      render: (method) => {
        let color;
        switch (method) {
          case "GET":
            color = "green";
            break;
          case "POST":
            color = "gold";
            break;
          case "PUT":
            color = "blue";
            break;
          case "DELETE":
            color = "red";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={method}>
            {method}
          </Tag>
        );
      },
    },
  ];

  return (
    <Box>
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, padding: "10px" }}
        >
          Chọn quyền
        </Typography>
      </Box>
      <Box sx={{ width: 400, padding: "10px" }}>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn quyền"
          options={[
            { value: "Manager", label: "QUẢN LÝ" },
            { value: "Lecturer", label: "GIẢNG VIÊN" },
            { value: "Student", label: "SINH VIÊN" },
            { value: null, label: "TẤT CẢ" },
          ]}
          onChange={handleRoleChange} // Gọi hàm khi thay đổi
        />
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData} // Sử dụng dữ liệu đã lọc
          pagination={{ pageSize: 5 }} // Thêm phân trang nếu cần
        />
      </Box>
      <Box sx={{ padding: "0px 0px 0px 10px" }}>
        <Button variant="contained">
          <CheckOutlined style={{ marginRight: "5px" }} />
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}

export default RolePermission;
