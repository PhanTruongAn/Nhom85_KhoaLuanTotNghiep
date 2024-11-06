import React, { useState } from "react";
import { Box, Card, TextField, Grid, Typography, Button } from "@mui/material";
import { Table, Select, Input, Space, message } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomHooks from "../../../../utils/hooks";
import CustomButton from "../../../../components/Button/CustomButton";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import { useSelector, useDispatch } from "react-redux";
import { setLecturers } from "../../../../redux/userSlice";
const { Search } = Input;
const { Option } = Select;

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
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchLoadingGuide, setSearchLoadingGuide] = useState(false);
  const [searchLoadingReport, setSearchLoadingReport] = useState(false);
  const [searchValueGuide, setSearchValueGuide] = useState("");
  const [searchValueReport, setSearchValueReport] = useState("");
  const [selectedLecturerGuide, setSelectedLecturerGuide] = useState(null);
  const [selectedLecturerReport, setSelectedLecturerReport] = useState(null);
  const [guideLecturerTopics, setGuideLecturerTopics] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  // Get list lecturer
  const getData = async () => {
    let termId = currentTerm.id;
    const res = await lecturerApi.getAll(termId);
    return res;
  };
  const { isFetching } = CustomHooks.useQuery(["reviewLecturers"], getData, {
    onSuccess: (res) => {
      if (res && res.status === 0) {
        dispatch(setLecturers(res.data));
      } else {
        messageApi.error(res.message);
      }
    },
    onError: (err) => {
      console.log("Lỗi:", err.message);
      messageApi.error("Lỗi khi lấy dữ liệu");
    },
  });

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
      {contextHolder}
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
      <Box>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={guideLecturerTopics}
          rowKey="topicId"
          pagination={false}
          locale={{
            emptyText: (
              <Box display="flex" justifyContent="center" alignItems="center">
                {isFetching ? (
                  <EmptyData />
                ) : guideLecturerTopics ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : (
                  <EmptyData />
                )}
              </Box>
            ),
          }}
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
