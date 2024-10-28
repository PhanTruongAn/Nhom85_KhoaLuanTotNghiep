import React, { useState, useMemo } from "react";
import {
  Button,
  Typography,
  TextField,
  Grid,
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

const formatContent = (content) => {
  return content.split("\n").map((line, index) => (
    <Typography key={index} paragraph>
      {line}
    </Typography>
  ));
};

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingTop: "10px", paddingLeft: "10px" }}
    >
      <Grid item xs={12} sm={4}>
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

function ManagerTopics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  // Sample data for demonstration
  const topics = [
    {
      id: 1,
      title: "Chương trình hỗ trợ đào tạo sinh viên trường đại học ",
      quantityGroup: 3,
      description:
        "Trải nghiệm qui trình  trong việc phát triển phần mềm: + Tìm hiểu requirement từ khách hàng  + Design SRS, ADD, DDD + Coding trên hệ thống Java hoặc .NET + Thực hiện testing  + Deploy hệ thống",
      goals:
        "Trải nghiệm qui trình  trong việc phát triển phần mềm:+ Tìm hiểu requirement từ khách hàng + Design SRS, ADD, DDD+ Coding hệ thống với Java hoặc React Native+ Thực hiện testing + Deploy hệ thống (cloud computing)",
      requirement:
        "Yêu cầu cứng: Đã hoàn thành môn Công nghệ mới trong SE ở mức khá giỏi Đam mê nghiên cứu công nghệ, lập trình Mobil - Có kiến thức cơ bản về Java, Swift hoặc React Native - Có tinh thần học hỏi và mong muốn làm sản phẩm theo quy trình công nghiệp: tuân thủ tiêu chuẩn khi viết mã nguồn, Có hoạt động đảm bảo chất lượng mã nguồn",
      standardOutput:
        "A.Sinh viên tham gia đề tài1) Nắm vững kiến thức, kỹ năng lập trình Java2) Có kiến thức, kỹ năng triển khai dự án phần mềm đầy đủ qui trình từ Requirement => Design => Coding => Unit Testing3) Có năng lực đầy đủ về Lập kế hoạch, theo dõi tiến độ, phân tích các vấn đề phát sinh trong quá trình thực hiện dự án.B.Sản phẩm1) Có tài liệu mô tả Yêu cầu dự án.2) Có tài liệu mô tả Thiết kế kiến trúc của dự án.3) Có tài liệu mô tả Thiết kế chi tiết cho chức năng chính của dự án.4) Có mã nguồn được lưu vết (tracking) định kỳ trên hệ thống quản lý phiên bản (version control) như Subversion hoặc Git; Mã nguồn trình bày rõ ràng, dễ hiểu theo tiêu chuẩn đã được thống nhất.5) Có tài liệu mô tả tình huống test và kết quả test cho chức năng chính của dự án.6) Có tài liệu mô tả cách biên dịch, đóng gói và hướng dẫn nâng cấp mã nguồn cho dự án.",
      lecturer: "Nguyễn Thếng Phúc",
    },
    {
      id: 2,
      title: "Đề tài 2",
      quantityGroup: 5,
      description: "Mô tả đề tài 2",
      goals: "Mục tiêu đề tài 2",
      requirement: "Yêu cầu đầu vào đề tài 2",
      standardOutput: "Yêu cầu đầu ra đề tài 2",
      lecturer: "Nguyễn Thếng Phúc",
    },
    // Add more sample data if needed
  ];

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, topics]);

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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên đề tài",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Giảng viên",
      dataIndex: "lecturer",
      key: "lecturer",
      width: 200,
    },
    {
      title: "Số lượng nhóm",
      dataIndex: "quantityGroup",
      key: "quantityGroup",
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

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
        maxWidth="lg"
        sx={{ overflow: "auto" }}
      >
        <DialogTitle variant="h4">Chi tiết đề tài</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          {selectedTopic ? (
            <Box>
              <Typography>
                <b>Tên đề tài:</b> {selectedTopic.title}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Số lượng nhóm:</b> {selectedTopic.quantityGroup}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Giảng viên:</b> {selectedTopic.lecturer}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Mô tả:</b> {formatContent(selectedTopic.description)}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Mục tiêu:</b> {selectedTopic.goals}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Yêu cầu đầu vào:</b>{" "}
                {formatContent(selectedTopic.requirement)}
              </Typography>
              <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                <b>Yêu cầu đầu ra:</b>{" "}
                {formatContent(selectedTopic.standardOutput)}
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

export default ManagerTopics;
