import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Table, Pagination } from "antd";
import EmptyData from "../../../../components/emptydata/EmptyData";

const initialTopics = [
  {
    id: 1,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    lecturer: "Giảng viên A",
    groupCount: 1,
  },
  {
    id: 2,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    lecturer: "Giảng viên B",
    groupCount: 2,
  },
  {
    id: 3,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    lecturer: "Giảng viên C",
    groupCount: 1,
  },
  {
    id: 4,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    lecturer: "Giảng viên D",
    groupCount: 0,
  },
  {
    id: 5,
    title:
      "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    lecturer: "Giảng viên D",
    groupCount: 0,
  },
];

function ListTopic() {
  const [topics] = useState(initialTopics);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setSearchTerm("");
    setPage(1);
  };

  const filteredTopics = topics.filter((topic) =>
    searchBy === "title"
      ? topic.title.toLowerCase().includes(searchTerm.toLowerCase())
      : topic.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRows = filteredTopics.length;

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
      title: "Số lượng nhóm",
      dataIndex: "groupCount",
      key: "groupCount",
      render: (text) => `${text} / 2`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="contained">Xem chi tiết</Button>
          <Button variant="contained">Tham gia</Button>
        </div>
      ),
    },
  ];

  return (
    <Box>
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
              onChange={handleSearchByChange}
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
            onChange={handleSearchChange}
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
      <Typography
        fontWeight="bold"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Danh sách đề tài
      </Typography>

      <Table
        columns={columns}
        dataSource={filteredTopics}
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
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width={"100%"}
                height={"auto"}
              >
                <EmptyData />
              </Box>
            ) : null,
        }}
      />
    </Box>
  );
}

export default ListTopic;
