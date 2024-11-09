import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Select, Input, message, Space } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Card } from "../../../../components/Card/Card";
import CustomHooks from "../../../../utils/hooks";
import { useState } from "react";
import { useSelector } from "react-redux";
import managerApi from "../../../../apis/managerApi";
import { isEmpty } from "lodash";

const { Search } = Input;
const { Option } = Select;

function CreateLecturerGroup() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer1, setSelectedLecturer1] = useState("");
  const [selectedLecturer2, setSelectedLecturer2] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    let term = currentTerm.id;
    let res = await managerApi.getLecturers(term);
    return res;
  };

  const { refetch } = CustomHooks.useQuery(
    ["get-lecturers", currentTerm],
    getData,
    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setLecturers(res.data);
        } else if (res.status === 1 && res.data.length === 0) {
          messageApi.info(res.message);
          setLecturers([]);
        } else {
          messageApi.error(res.message);
        }
      },
      onError: () => {
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );

  // Filter out the selected lecturer from the list for Lecturer 2
  const filteredLecturers1 = lecturers.filter(
    (lecturer) => lecturer.id !== selectedLecturer2
  );
  const filteredLecturers2 = lecturers.filter(
    (lecturer) => lecturer.id !== selectedLecturer1
  );

  const handleSearchLecturer1 = async () => {
    const lecturer = lecturers.find((lecturer) => {
      const email = lecturer.email || "";
      const phone = lecturer.phone || "";
      const username = lecturer.username || "";
      return (
        username.includes(searchTerm1) ||
        phone.includes(searchTerm1) ||
        email.includes(searchTerm1)
      );
    });
    if (lecturer) {
      setSelectedLecturer1(lecturer.id); // Set selected lecturer if found
    } else {
      messageApi.error("Không tìm thấy giảng viên!");
    }
  };

  const handleSearchLecturer2 = async () => {
    const lecturer = lecturers.find((lecturer) => {
      const email = lecturer.email || "";
      const phone = lecturer.phone || "";
      const username = lecturer.username || "";
      return (
        username.includes(searchTerm2) ||
        phone.includes(searchTerm2) ||
        email.includes(searchTerm2)
      );
    });
    if (lecturer) {
      setSelectedLecturer2(lecturer.id); // Set selected lecturer if found
    } else {
      messageApi.error("Không tìm thấy giảng viên!");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let data = {
      lecturer1: selectedLecturer1,
      lecturer2: selectedLecturer2,
      termId: currentTerm.id,
    };
    const res = await managerApi.createGroupLecturer(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setLoading(false);
      setSelectedLecturer1("");
      setSelectedLecturer2("");
      refetch();
    } else {
      messageApi.error(res.message);
      setLoading(false);
    }
  };

  const handleReload = () => {
    setReload(true);
    refetch();
    setTimeout(() => {
      setReload(false);
    }, 1000);
  };
  return (
    <Box p={1}>
      {contextHolder}
      <Grid container spacing={2}>
        {/* Lecturer Guide Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên phản biện 1</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    value={selectedLecturer1 || "Chọn giảng viên"} // Bind to state
                    onChange={setSelectedLecturer1} // Update state on change
                  >
                    {filteredLecturers1.map((lecturer) => (
                      <Option key={lecturer.id} value={lecturer.id}>
                        {lecturer.username} - {lecturer.fullName}
                      </Option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    style={{ width: "100%" }}
                    value={searchTerm1}
                    onChange={(e) => setSearchTerm1(e.target.value)} // Update search term
                    onSearch={handleSearchLecturer1} // Trigger search on button click
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer1
                      )?.username || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer1
                      )?.fullName || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer1
                      )?.phone || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer1
                      )?.email || ""
                    }
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
            <Typography variant="h6">Giảng viên phản biện 2</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    value={selectedLecturer2 || "Chọn giảng viên"} // Bind to state
                    onChange={setSelectedLecturer2} // Update state on change
                  >
                    {filteredLecturers2.map((lecturer) => (
                      <Option key={lecturer.id} value={lecturer.id}>
                        {lecturer.username} - {lecturer.fullName}
                      </Option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    style={{ width: "100%" }}
                    value={searchTerm2}
                    onChange={(e) => setSearchTerm2(e.target.value)} // Update search term
                    onSearch={handleSearchLecturer2} // Trigger search on button click
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer2
                      )?.username || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer2
                      )?.fullName || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer2
                      )?.phone || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={
                      lecturers.find(
                        (lecturer) => lecturer.id === selectedLecturer2
                      )?.email || ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Space>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={
              reload ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                <RefreshIcon />
              )
            }
            disabled={reload}
            onClick={handleReload}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <PersonAddIcon />
              )
            }
            disabled={loading}
            onClick={handleSubmit}
          >
            Tạo nhóm
          </Button>
        </Space>
      </Box>
    </Box>
  );
}

export default CreateLecturerGroup;
