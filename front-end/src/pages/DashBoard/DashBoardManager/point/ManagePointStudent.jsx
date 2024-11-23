import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { Table, Space, Popconfirm } from "antd";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomButton from "../../../../components/Button/CustomButton";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import EditPointStudent from "./EditPointStudent";

function ManagePointStudent() {
  const [data, setData] = useState([
    {
      key: "1",
      groupName: "Nhóm 1",
      topicName: "Đề tài 1",
    },
    {
      key: "2",
      groupName: "Nhóm 2",
      topicName: "Đề tài 2",
    },
    // Thêm dữ liệu mẫu ở đây nếu cần
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleEdit = (record) => {
    // Xử lý sự kiện khi nhấn nút sửa
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  const handleDelete = (key) => {
    // Xử lý sự kiện khi nhấn nút xóa
    setData(data.filter((item) => item.key !== key));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Tên đề tài",
      dataIndex: "topicName",
      key: "topicName",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa điểm
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteOutlined />}
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
      <Box sx={{ position: "relative" }}>
        <SearchComponent placeholder="Tìm theo mã giảng viên hoặc tên đầy đủ"></SearchComponent>
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Space>
            <CustomButton text="Làm mới" type="refresh" />
          </Space>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            flex: 1, // Để tiêu đề chiếm không gian còn lại
            textAlign: "center", // Căn giữa
          }}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Danh sách điểm sinh viên
        </Typography>
      </Box>
      <Table columns={columns} dataSource={data} />

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogContent>
          <EditPointStudent
            onClose={handleCloseDialog}
            selectedRecord={selectedRecord}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ManagePointStudent;
