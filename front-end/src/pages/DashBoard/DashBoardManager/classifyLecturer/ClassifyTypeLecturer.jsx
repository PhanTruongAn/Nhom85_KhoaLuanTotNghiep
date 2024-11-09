import { useState } from "react";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { Table, Select, Space, message } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomHooks from "../../../../utils/hooks";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import managerApi from "../../../../apis/managerApi";
import { isEmpty } from "lodash";
const { Option } = Select;
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nhóm",
    dataIndex: "groupName",
    key: "groupName",
  },
  {
    title: "Tên đề tài",
    render: (record) => record.topic.title,
    key: "topicName",
  },
];
function ClassifyTypeLecturer() {
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedLecturerGuide, setSelectedLecturerGuide] = useState(null);
  const [selectedLecturerReport, setSelectedLecturerReport] = useState(null);
  const [guideLecturerTopics, setGuideLecturerTopics] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [state, setState] = useState({
    page: 1,
    pageSize: 5,
    totalRow: null,
    totalPage: null,
    groups: [],
    reload: false,
    groupStudent: [],
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Get list lecturer
  const getData = async () => {
    let termId = currentTerm.id;
    const res = await managerApi.getGroupLecturer(termId);
    return res;
  };

  const { isFetching, refetch } = CustomHooks.useQuery(
    ["group-lecturer"],
    getData,
    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({ groups: res.groups });
          messageApi.success(res.message);
        } else {
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        console.log("Lỗi:", err.message);
        messageApi.error("Lỗi khi lấy dữ liệu");
      },
    }
  );

  const getGroupStudent = async () => {
    let res = await managerApi.reviewGroupStudent(state.page, state.pageSize);
    return res;
  };
  const { isFetching: isFetchingGroupStudent, refetch: refetchGroupStudent } =
    CustomHooks.useQuery(
      ["reviewGroupStudent", state.page, state.pageSize],
      getGroupStudent,
      {
        onSuccess: (res) => {
          if (res && res.status === 0) {
            updateState({
              groupStudent: res.data.groupStudent,
              totalRow: res.data.totalRows,
            });
          } else {
            updateState({
              groupStudent: [],
            });
            messageApi.error(res.message);
          }
        },
        onError: () => {
          updateState({
            groupStudent: [],
          });
          messageApi.error("Lỗi khi lấy dữ liệu!");
        },
      }
    );
  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    const group = state.groups.find((g) => g.id === groupId);
    if (group && group.lecturers.length === 2) {
      setSelectedLecturerGuide(group.lecturers[0]);
      setSelectedLecturerReport(group.lecturers[1]);
    } else {
      setSelectedLecturerGuide(null);
      setSelectedLecturerReport(null);
    }
  };

  const handleReset = () => {
    setGuideLecturerTopics([]);
    setSelectedRowKeys([]);
    setSelectedGroupId(null);
    setSelectedLecturerGuide(null);
    setSelectedLecturerReport(null);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleReload = () => {
    updateState({ reload: true });
    refetch();
    setTimeout(() => {
      updateState({ reload: false });
    }, 1000);
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
        value={selectedGroupId || "Chọn nhóm giảng viên"}
        onChange={handleGroupSelect}
      >
        {state.groups &&
          state.groups.length > 0 &&
          state.groups.map((value) => (
            <Option key={value.id} value={value.id}>
              {value.name}
            </Option>
          ))}
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
                    value={selectedLecturerGuide?.username || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={selectedLecturerGuide?.fullName || ""}
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
                    value={selectedLecturerReport?.username || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value={selectedLecturerReport?.fullName || ""}
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
        <Space>
          <CustomButton
            text="Làm mới dữ liệu"
            loading={state.reload}
            type="refresh"
            onClick={handleReload}
          />
          <Button
            variant="contained"
            color="secondary"
            // size="small"
            startIcon={<PersonAddIcon />}
          >
            Gán nhóm giảng viên
          </Button>
        </Space>
      </Box>
      <Box>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={state.groupStudent}
          rowKey="id"
          loading={isFetchingGroupStudent}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            total: state.totalRow, // Cập nhật giá trị total
            current: state.page,
            pageSize: state.pageSize,
            onChange: (page, size) => {
              updateState({ page: page, pageSize: size });
            },
            responsive: true,
          }}
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
    </Box>
  );
}

export default ClassifyTypeLecturer;
