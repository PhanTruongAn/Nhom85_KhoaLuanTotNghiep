import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Table } from "antd";
import { Add, Edit, Delete, Refresh } from "@mui/icons-material";

// Dữ liệu mẫu
const data = [
  {
    id: 1,
    majorName: "Computer Science",
    createdAt: "2023-05-01",
    updatedAt: "2023-10-12",
  },
  {
    id: 2,
    majorName: "Information Technology",
    createdAt: "2023-06-15",
    updatedAt: "2023-10-14",
  },
];

const MajorManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({
    majorName: "",
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên chuyên ngành",
      dataIndex: "majorName",
      key: "majorName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(record)}
            size="small"
          >
            Sửa
            <Edit sx={{ marginLeft: "5px" }} />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(record.id)}
            size="small"
          >
            Xóa
            <Delete sx={{ marginLeft: "5px" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedMajor({ majorName: "" });
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (major) => {
    setSelectedMajor(major);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    console.log(`Xóa chuyên ngành có id: ${id}`);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMajor({ majorName: "" });
  };

  const handleSave = () => {
    if (isEditing) {
      console.log("Lưu thông tin chuyên ngành:", selectedMajor);
    } else {
      console.log("Thêm chuyên ngành mới:", selectedMajor);
    }
    setOpen(false);
  };

  const handleRefresh = () => {
    console.log("Làm mới dữ liệu");
    // Logic to refresh the data can be added here.
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "24px", fontWeight: "bold" }}
      >
        Quản lý chuyên ngành
      </Typography>
      <Box display="flex" justifyContent="flex-end" gap={2} marginBottom="16px">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Thêm chuyên ngành
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Refresh />}
          onClick={handleRefresh}
        >
          Làm mới
        </Button>
      </Box>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginBottom: "20px" }}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {isEditing ? "Chỉnh sửa chuyên ngành" : "Thêm chuyên ngành mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên chuyên ngành"
            type="text"
            fullWidth
            value={selectedMajor?.majorName || ""}
            onChange={(e) =>
              setSelectedMajor({ ...selectedMajor, majorName: e.target.value })
            }
            sx={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            {isEditing ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MajorManagement;
