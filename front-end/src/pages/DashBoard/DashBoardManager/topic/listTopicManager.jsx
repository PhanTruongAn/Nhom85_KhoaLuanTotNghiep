import React, { useState, useMemo } from "react";
import {
  Paper,
  Button,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchIcon from "@mui/icons-material/Search";
import { Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";

// Giữ nguyên danh sách đề tài mẫu
const initialTopics = [
  {
    id: 1,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    description:
      "Mô tả đề tài: Đây là một đề tài liên quan đến việc xây dựng website đăng ký đề tài và giám sát thực hiện khóa luận tốt nghiệp cho sinh viên Khoa CNTT-IUH.",
    goals:
      "Mục tiêu: Phát triển một hệ thống website giúp sinh viên đăng ký đề tài và giám sát tiến độ thực hiện khóa luận.",
    requirement:
      "Yêu cầu đầu vào: Sinh viên cần có kiến thức cơ bản về lập trình web và hệ quản trị cơ sở dữ liệu.",
    standardOutput:
      "Yêu cầu đầu ra: Website hoạt động ổn định, dễ sử dụng và có thể quản lý được các đề tài đăng ký cũng như giám sát tiến độ.",
    quantityGroup: 2,
    lecturer: "Giảng viên A",
  },
  {
    id: 2,
    title:
      "XÂY DỰNG HỆ THỐNG QUẢN LÝ THƯ VIỆN ĐIỆN TỬ CHO SINH VIÊN KHOA CNTT-IUH",
    description:
      "Mô tả đề tài: Đề tài nghiên cứu và phát triển hệ thống quản lý thư viện điện tử, cung cấp tài liệu cho sinh viên và giảng viên.",
    goals:
      "Mục tiêu: Xây dựng một hệ thống dễ dàng tìm kiếm và quản lý tài liệu, sách báo cho sinh viên Khoa CNTT-IUH.",
    requirement:
      "Yêu cầu đầu vào: Kiến thức về lập trình web, thiết kế cơ sở dữ liệu và giao diện người dùng.",
    standardOutput:
      "Yêu cầu đầu ra: Hệ thống hoạt động hiệu quả, có giao diện thân thiện, dễ dàng tra cứu tài liệu.",
    quantityGroup: 3,
    lecturer: "Giảng viên B",
  },
];

function SearchBar({ searchTerm, setSearchTerm, searchBy, setSearchBy }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingTop: "10px", paddingLeft: "10px" }}
    >
      <Grid item xs={12} sm={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Tìm theo</InputLabel>
          <Select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            label="Tìm theo"
          >
            <MenuItem value="title">Tên đề tài</MenuItem>
            <MenuItem value="lecturer">Giảng viên</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

function ListTopicManager() {
  const [topics] = useState(initialTopics);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      searchBy === "title"
        ? topic.title.toLowerCase().includes(searchTerm.toLowerCase())
        : topic.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, searchBy, topics]);

  const totalRows = filteredTopics.length;

  const handleViewDetails = (topic) => {
    setSelectedTopic(topic);
    setOpenDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setSelectedTopic(null);
  };

  const columns = [
    {
      title: "Tên đề tài",
      dataIndex: "title",
      key: "title",
      width: 600,
    },
    {
      title: "Giảng viên",
      dataIndex: "lecturer",
      key: "lecturer",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            onClick={() => handleViewDetails(record)}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
            endIcon={<InfoCircleOutlined />}
          >
            Xem chi tiết
          </Button>
          <Button variant="contained" endIcon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteOutlined />}
            size="small"
            color="error"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Typography
        fontWeight="bold"
        sx={{
          justifyContent: "center",
          textAlign: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Danh sách đề tài
      </Typography>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />

      <Table
        style={{ padding: "10px" }}
        columns={columns}
        dataSource={filteredTopics}
        rowKey={(record) => record.id}
        pagination={{
          current: page,
          pageSize: rowsPerPage,
          total: totalRows,
          onChange: (page, pageSize) => {
            setPage(page);
            setRowsPerPage(pageSize);
          },
        }}
        locale={{
          emptyText:
            filteredTopics.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <EmptyData />
              </Box>
            ) : null,
        }}
      />

      <Dialog
        open={openDetailModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle variant="h4">Chi tiết đề tài</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          {selectedTopic ? (
            <Box>
              <Typography>
                <b>Tên đề tài:</b> {selectedTopic.title}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Giảng viên:</b> {selectedTopic.lecturer}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Mô tả:</b> {selectedTopic.description}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Mục tiêu:</b> {selectedTopic.goals}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Yêu cầu đầu vào:</b> {selectedTopic.requirement}
              </Typography>

              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Yêu cầu đầu ra:</b> {selectedTopic.standardOutput}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Số lượng nhóm:</b> {selectedTopic.quantityGroup}
              </Typography>
            </Box>
          ) : (
            <Typography>Đang tải dữ liệu...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ListTopicManager;
