import React, { useState } from "react";
import { Box, Card, TextField, Grid, Typography, Button } from "@mui/material";
import { Table, Select, Input, Space } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const { Search } = Input;
const { Option } = Select;

const lecturers = [
  {
    key: "1",
    lecturerId: "GV001",
    name: "Nguyen Van A",
    phone: "0123456789",
    email: "a@university.edu",
    topics: [
      { topicId: "DT001", title: "Artificial Intelligence in Education" },
      { topicId: "DT002", title: "Data Mining in Social Media" },
      { topicId: "DT003", title: "Blockchain in Data Security" },
    ],
  },
  {
    key: "2",
    lecturerId: "GV002",
    name: "Tran Thi B",
    phone: "0123456790",
    email: "b@university.edu",
    topics: [
      { topicId: "DT004", title: "Natural Language Processing for Vietnamese" },
      { topicId: "DT005", title: "Machine Learning for Healthcare" },
      { topicId: "DT006", title: "IoT for Smart Cities" },
    ],
  },
  {
    key: "3",
    lecturerId: "GV003",
    name: "Le Van C",
    phone: "0123456791",
    email: "c@university.edu",
    topics: [
      { topicId: "DT007", title: "Augmented Reality in Education" },
      { topicId: "DT008", title: "Cybersecurity in Cloud Computing" },
      { topicId: "DT009", title: "Big Data Analytics" },
    ],
  },
  {
    key: "4",
    lecturerId: "GV004",
    name: "Pham Thi D",
    phone: "0123456792",
    email: "d@university.edu",
    topics: [
      { topicId: "DT010", title: "Digital Transformation in Enterprises" },
      { topicId: "DT011", title: "Edge Computing in IoT" },
      { topicId: "DT012", title: "Deep Learning for Image Recognition" },
    ],
  },
  {
    key: "5",
    lecturerId: "GV005",
    name: "Hoang Van E",
    phone: "0123456793",
    email: "e@university.edu",
    topics: [
      { topicId: "DT013", title: "Social Network Analysis" },
      { topicId: "DT014", title: "Quantum Computing Basics" },
      { topicId: "DT015", title: "Computer Vision in Robotics" },
    ],
  },
  {
    key: "6",
    lecturerId: "GV006",
    name: "Bui Thi F",
    phone: "0123456794",
    email: "f@university.edu",
    topics: [
      { topicId: "DT016", title: "Digital Marketing with AI" },
      { topicId: "DT017", title: "3D Printing in Manufacturing" },
      { topicId: "DT018", title: "Ethical Issues in AI" },
    ],
  },
  {
    key: "7",
    lecturerId: "GV007",
    name: "Ngo Van G",
    phone: "0123456795",
    email: "g@university.edu",
    topics: [
      { topicId: "DT019", title: "E-commerce Security Solutions" },
      { topicId: "DT020", title: "AI in Financial Forecasting" },
      { topicId: "DT021", title: "Smart Home Automation" },
    ],
  },
  {
    key: "8",
    lecturerId: "GV008",
    name: "Do Thi H",
    phone: "0123456796",
    email: "h@university.edu",
    topics: [
      { topicId: "DT022", title: "Speech Recognition Technology" },
      { topicId: "DT023", title: "5G Network Impact on IoT" },
      { topicId: "DT024", title: "Behavior Analysis in E-learning" },
    ],
  },
  {
    key: "9",
    lecturerId: "GV009",
    name: "Vu Van I",
    phone: "0123456797",
    email: "i@university.edu",
    topics: [
      { topicId: "DT025", title: "Data Privacy Laws" },
      { topicId: "DT026", title: "Energy Efficiency in Data Centers" },
      { topicId: "DT027", title: "AI in Medical Diagnostics" },
    ],
  },
  {
    key: "10",
    lecturerId: "GV010",
    name: "Pham Van K",
    phone: "0123456798",
    email: "k@university.edu",
    topics: [
      { topicId: "DT028", title: "Virtual Reality Applications" },
      { topicId: "DT029", title: "AI Ethics in Decision-Making" },
      { topicId: "DT030", title: "Green Computing Solutions" },
    ],
  },
];

const columns = [
  {
    title: "Mã đề tài",
    dataIndex: "topicId",
    key: "topicId",
  },
  {
    title: "Tên đề tài",
    dataIndex: "title",
    key: "title",
  },
];

function ClassifyTypeLecturer() {
  const [searchLoadingGuide, setSearchLoadingGuide] = useState(false);
  const [searchLoadingReport, setSearchLoadingReport] = useState(false);
  const [searchValueGuide, setSearchValueGuide] = useState("");
  const [searchValueReport, setSearchValueReport] = useState("");
  const [selectedLecturerGuide, setSelectedLecturerGuide] = useState(null);
  const [selectedLecturerReport, setSelectedLecturerReport] = useState(null);
  const [guideLecturerTopics, setGuideLecturerTopics] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSearch = (value, type) => {
    if (type === "guide") {
      setSearchLoadingGuide(true);
    } else {
      setSearchLoadingReport(true);
    }

    const lecturer = lecturers.find(
      (lecturer) =>
        lecturer.lecturerId === value ||
        lecturer.phone === value ||
        lecturer.email === value
    );

    if (lecturer) {
      if (type === "guide") {
        setSelectedLecturerGuide(lecturer);
        setGuideLecturerTopics(lecturer.topics || []);
      } else {
        setSelectedLecturerReport(lecturer);
      }
    } else {
      if (type === "guide") {
        setSelectedLecturerGuide(null);
        setGuideLecturerTopics([]);
      } else {
        setSelectedLecturerReport(null);
      }
    }

    setTimeout(() => {
      if (type === "guide") {
        setSearchLoadingGuide(false);
      } else {
        setSearchLoadingReport(false);
      }
    }, 1000);
  };

  const handleSelectChange = (value, type) => {
    const lecturer = lecturers.find(
      (lecturer) => lecturer.lecturerId === value
    );
    if (type === "guide") {
      setSelectedLecturerGuide(lecturer);
      setGuideLecturerTopics(lecturer.topics || []);
    } else {
      setSelectedLecturerReport(lecturer);
    }
  };

  const handleReset = () => {
    setSelectedLecturerGuide(null);
    setSelectedLecturerReport(null);
    setGuideLecturerTopics([]);
    setSelectedRowKeys([]);
    setSearchValueGuide(""); // Reset guide search field
    setSearchValueReport(""); // Reset report search field
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  return (
    <Box p={1}>
      <Grid container spacing={2}>
        {/* Lecturer Guide Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên hướng dẫn</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Chọn mã giảng viên"
                    onChange={(value) => handleSelectChange(value, "guide")}
                    filterOption={(input, option) =>
                      option.value.toLowerCase().includes(input.toLowerCase())
                    }
                    value={selectedLecturerGuide?.lecturerId || null}
                  >
                    {lecturers.map((lecturer) => (
                      <Option key={lecturer.key} value={lecturer.lecturerId}>
                        {lecturer.lecturerId} - {lecturer.name}
                      </Option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    loading={searchLoadingGuide}
                    onSearch={(value) => handleSearch(value, "guide")}
                    style={{ width: "100%" }}
                    value={searchValueGuide}
                    onChange={(e) => setSearchValueGuide(e.target.value)}
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value={selectedLecturerGuide?.lecturerId || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={selectedLecturerGuide?.name || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={selectedLecturerGuide?.phone || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedLecturerGuide?.email || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* Lecturer Report Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên báo cáo</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Chọn mã giảng viên"
                    onChange={(value) => handleSelectChange(value, "report")}
                    filterOption={(input, option) =>
                      option.value.toLowerCase().includes(input.toLowerCase())
                    }
                    value={selectedLecturerReport?.lecturerId || null}
                  >
                    {lecturers.map((lecturer) => (
                      <Option key={lecturer.key} value={lecturer.lecturerId}>
                        {lecturer.lecturerId} - {lecturer.name}
                      </Option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    loading={searchLoadingReport}
                    onSearch={(value) => handleSearch(value, "report")}
                    style={{ width: "100%" }}
                    value={searchValueReport}
                    onChange={(e) => setSearchValueReport(e.target.value)}
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value={selectedLecturerReport?.lecturerId || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={selectedLecturerReport?.name || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={selectedLecturerReport?.phone || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedLecturerReport?.email || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
        >
          Làm mới
        </Button>
      </Box>
      <Box mt={4}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={guideLecturerTopics}
          rowKey="topicId"
          pagination={false}
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </Box>
      <Box mt={2}>
        <Space>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PersonAddIcon />}
          >
            Gán giảng viên
          </Button>
        </Space>
      </Box>
    </Box>
  );
}

export default ClassifyTypeLecturer;
