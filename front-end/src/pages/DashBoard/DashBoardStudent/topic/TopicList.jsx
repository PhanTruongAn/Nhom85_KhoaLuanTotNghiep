import React, { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./ListTopic.scss"; // Nhập tệp SCSS

const initialTopics = [
  {
    id: 1,
    name: "XÂY DỰNG WEBSITE ĐĂNG KÝ ĐỀ TÀI VÀ GIÁM SÁT THỰC HIỆN KHÓA LUẬN TỐT NGHIỆP CHO SINH VIÊN KHOA CNTT-IUH",
    teacher: "Teacher A",
    groupCount: 2,
  },
  { id: 2, name: "Topic 2", teacher: "Teacher B", groupCount: 1 },
  { id: 3, name: "Topic 3", teacher: "Teacher C", groupCount: 2 },
  // Thêm nhiều topic nếu cần
];

function ListTopic() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [visibleTopics, setVisibleTopics] = useState(2);
  const [filteredTopics, setFilteredTopics] = useState(initialTopics);
  const containerRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    handleSearch(searchTerm); // Tìm kiếm lại khi thay đổi tiêu chí
  };

  const handleSearch = (term) => {
    const filtered = initialTopics.filter((topic) => {
      if (searchBy === "title") {
        return topic.name.toLowerCase().includes(term.toLowerCase());
      } else if (searchBy === "lecturer") {
        return topic.teacher.toLowerCase().includes(term.toLowerCase());
      }
      return true;
    });
    setFilteredTopics(filtered);
    setVisibleTopics(2); // Reset số đề tài hiển thị
  };

  const loadMoreTopics = () => {
    setVisibleTopics((prev) => Math.min(prev + 2, filteredTopics.length));
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreTopics();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [filteredTopics]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Danh Sách Đề Tài</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth variant="outlined">
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
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
        <Grid
          container
          spacing={2}
          marginTop={2}
          className="list-topic"
          ref={containerRef}
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {filteredTopics.slice(0, visibleTopics).map((topic) => (
            <Grid item xs={12} key={topic.id}>
              <Paper
                elevation={2}
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Typography variant="h6">{topic.name}</Typography>
                <Typography variant="body1">
                  Giảng viên: {topic.teacher}
                </Typography>
                <Typography variant="body1">
                  Số lượng nhóm: {topic.groupCount}
                </Typography>
                <Button variant="outlined" style={{ marginTop: "8px" }}>
                  Xem Chi Tiết
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "8px", marginLeft: "8px" }}
                >
                  Tham Gia
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ListTopic;
