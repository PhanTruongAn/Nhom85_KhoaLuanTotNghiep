import { useState } from "react";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { Table, Select, Space, message } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomHooks from "../../../../utils/hooks";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import { useSelector, useDispatch } from "react-redux";
const { Option } = Select;

const columns = [
  {
    title: "ID",
    dataIndex: "topicId",
    key: "topicId",
  },
  {
    title: "Tên nhóm",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Tên dề tài",
    dataIndex: "topicName",
    key: "topicName",
  },
  {
    title: "Giảng viên hướng dẫn",
    dataIndex: "lecturerName",
    key: "lecturerName",
  },
];

function ClassifyTypeLecturer() {
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  // const [searchLoadingGuide, setSearchLoadingGuide] = useState(false);
  // const [searchLoadingReport, setSearchLoadingReport] = useState(false);
  // const [searchValueGuide, setSearchValueGuide] = useState("");
  // const [searchValueReport, setSearchValueReport] = useState("");
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

  // const handleSearch = (value, type) => {
  //   if (type === "guide") {
  //     setSearchLoadingGuide(true);
  //   } else {
  //     setSearchLoadingReport(true);
  //   }

  //   const lecturer = lecturers.find(
  //     (lecturer) =>
  //       lecturer.lecturerId === value ||
  //       lecturer.phone === value ||
  //       lecturer.email === value
  //   );

  //   if (lecturer) {
  //     if (type === "guide") {
  //       setSelectedLecturerGuide(lecturer);
  //       setGuideLecturerTopics(lecturer.topics || []);
  //     } else {
  //       setSelectedLecturerReport(lecturer);
  //     }
  //   } else {
  //     if (type === "guide") {
  //       setSelectedLecturerGuide(null);
  //       setGuideLecturerTopics([]);
  //     } else {
  //       setSelectedLecturerReport(null);
  //     }
  //   }

  //   setTimeout(() => {
  //     if (type === "guide") {
  //       setSearchLoadingGuide(false);
  //     } else {
  //       setSearchLoadingReport(false);
  //     }
  //   }, 1000);
  // };

  // const handleSelectChange = (value, type) => {
  //   const lecturer = lecturers.find(
  //     (lecturer) => lecturer.lecturerId === value
  //   );
  //   if (type === "guide") {
  //     setSelectedLecturerGuide(lecturer);
  //     setGuideLecturerTopics(lecturer.topics || []);
  //   } else {
  //     setSelectedLecturerReport(lecturer);
  //   }
  // };

  const handleReset = () => {
    setSelectedLecturerGuide(null);
    setSelectedLecturerReport(null);
    setGuideLecturerTopics([]);
    setSelectedRowKeys([]);
    // setSearchValueGuide(""); // Reset guide search field
    // setSearchValueReport(""); // Reset report search field
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
      <Select
        style={{ width: "30%", marginBottom: "10px" }}
        showSearch
        placeholder="Chọn nhóm giảng viên "
        filterOption={(input, option) =>
          option.value.toLowerCase().includes(input.toLowerCase())
        }
      >
        <Option></Option>
      </Select>
      <Grid container spacing={2}>
        {/* Lecturer Guide Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên 1</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
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
            <Typography variant="h6">Giảng viên 2</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
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
