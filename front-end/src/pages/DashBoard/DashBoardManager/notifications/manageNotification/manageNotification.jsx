import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Table, Space, Input } from "antd"; // Import Input từ Ant Design
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons"; // Biểu tượng search

const initialData = [
  { id: 1, title: "Notification 1", details: "Details 1", recipient: "all" },
  {
    id: 2,
    title: "Notification 2",
    details: "Details 2",
    recipient: "students",
  },
];

function ManageNotification() {
  const [data, setData] = useState(initialData);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); // State cho từ khóa tìm kiếm

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleUpdateClick = (record) => {
    setCurrentNotification(record);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubmit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === currentNotification.id ? currentNotification : item
      )
    );
    setIsUpdateOpen(false);
    setCurrentNotification(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNotification((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter(
    (item) => item.title.toLowerCase().includes(searchKeyword.toLowerCase()) // Lọc dữ liệu dựa trên từ khóa tìm kiếm
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title", width: "800px" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => handleUpdateClick(record)}
            variant="contained"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
              background: "#1DA57A",
            }}
            endIcon={<EditOutlined />}
          >
            Update
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
            endIcon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Container sx={{ padding: "20px" }}>
      {/* Thanh tìm kiếm */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Input
          placeholder="Nhập thông tin"
          prefix={<SearchOutlined />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            width: "500px",
            borderRadius: "8px",
            height: "40px",
          }}
        />
      </Box>

      <Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", textAlign: "center", flex: 1 }}
        >
          Danh sách thông báo
        </Typography>
        <Table
          style={{ marginTop: "20px" }}
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{}}
        />
      </Box>

      <Dialog
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Cập nhật thông báo
        </DialogTitle>
        <DialogContent
          sx={{
            width: "60vw",
            maxWidth: "800px",
            height: "50vh",
            maxHeight: "500px",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
              p: 2,
            }}
          >
            <TextField
              label="Tiêu đề"
              variant="outlined"
              name="Tiêu đề"
              value={currentNotification?.title || ""}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              label="Chi tiết"
              variant="outlined"
              name="Chi tiết"
              value={currentNotification?.details || ""}
              onChange={handleChange}
              multiline
              rows={4}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="recipient-label">Đối tượng</InputLabel>
              <Select
                labelId="recipient-label"
                name="recipient"
                value={currentNotification?.recipient || "all"}
                onChange={handleChange}
                label="Recipient"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="students">Sinh viên</MenuItem>
                <MenuItem value="lecturers">Giảng viên</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsUpdateOpen(false)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageNotification;
