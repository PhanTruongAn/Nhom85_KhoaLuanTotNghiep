import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Dialog,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Space, Table, message } from "antd";
import PointTopicStudent from "./pointTopicStudent";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomHooks from "../../../../utils/hooks";
import lecturerApi from "../../../../apis/lecturerApi";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import { FileDoneOutlined } from "@ant-design/icons";
import Criteria from "../../DashBoardStudent/criteria/Criteria";
import { Modal } from "antd";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
function ListGroupTopicLecturer() {
  const user = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [state, setState] = useState({
    searchLoading: false,
    currentPage: 1,
    pageSize: 5,
    dataSource: [],
    loadingData: false,
    objectSelect: {},
    totalRows: null,
    refreshButton: false,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null); // State to hold the selected group
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
  const [selectValue, setSelectValue] = useState(""); // State for select value
  const [openCriteriaDialog, setOpenCriteriaDialog] = useState(false); // State to control Criteria dialog

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Get Group Data
  const getGroups = async () => {
    let termId = currentTerm.id;
    let lecturerId = user.id;
    const res = await lecturerApi.getMyGroupStudent(termId, lecturerId);
    return res;
  };

  const {
    isFetching,
    data: groupData,
    refetch,
  } = CustomHooks.useQuery(["my-group-topic"], getGroups, {
    enabled: !isEmpty(currentTerm),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        updateState({ dataSource: res.data });
        if (isEmpty(groupData)) {
          messageApi.success(res.message);
        }
      } else {
        messageApi.error(res.message);
      }
    },
    onError: () => {
      messageApi.error("Lỗi khi lấy dữ liệu!");
    },
  });

  const filteredGroups = useMemo(() => {
    const sourceData =
      groupData && groupData.data ? groupData.data : state.dataSource;
    return sourceData.filter((group) =>
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, state.dataSource, groupData]);

  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
      width: "150px",
    },
    {
      title: "Tên đề tài",
      render: (record) => record.topic?.title || "Chưa có đề tài",
      key: "topicName",
    },
    {
      title: "Actions",
      key: "actions",
      width: "200px",
      render: (_, record) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleGrade(record)}
          sx={(theme) => ({
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 12px rgba(0,0,0,0.3)",
            },
            ...theme.applyStyles("dark", {
              "&:disabled": {
                backgroundColor: "#A0A0A0",
                color: "#888",
              },
            }),
          })}
          disabled={!selectValue}
        >
          Chấm điểm
        </Button>
      ),
    },
  ];

  const handleGrade = (record) => {
    setSelectedGroup(record); // Set the selected group when grading
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null); // Reset selection
  };

  const onRefreshData = () => {
    updateState({ refreshButton: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  //tiêu chí đánh giá
  const handleOpenCriteriaDialog = () => {
    setOpenCriteriaDialog(true);
  };

  const handleCloseCriteriaDialog = () => {
    setOpenCriteriaDialog(false);
  };

  return (
    <Box
      padding={2}
      sx={{
        width: "100%",
        borderRadius: 2,
      }}
    >
      {contextHolder}
      <FormControl
        variant="outlined"
        sx={{ marginBottom: 2, width: "100%" }}
        size="small"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <InputLabel id="select-label">Chọn nhóm giảng viên</InputLabel>
          <Select
            labelId="select-label"
            label="Chọn nhóm giảng viên"
            onChange={(e) => setSelectValue(e.target.value)}
            value={selectValue}
            sx={{
              width: "30%",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              "&:hover": {
                boxShadow: "0px 6px 12px rgba(0,0,0,0.3)",
              },
            }}
          >
            <MenuItem value="">
              <em>Không chọn</em>
            </MenuItem>
            <MenuItem value="gvHuongDan">Giảng viên hướng dẫn</MenuItem>
            <MenuItem value="gvPhanBien">
              Giảng viên phản biện và báo cáo
            </MenuItem>
          </Select>
          <Box sx={{ width: "100%" }}>
            <SearchComponent
              placeholder="Tìm theo tên nhóm"
              onChange={(group) => setSearchTerm(group)}
            />
          </Box>
        </Box>
      </FormControl>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: "10px",

            transform: "translateY(-100%)",
          }}
        >
          <Space>
            <Button
              color="primary"
              variant="contained"
              startIcon={<FileDoneOutlined />}
              onClick={handleOpenCriteriaDialog} // Open Criteria dialog
            >
              Tiêu chí chấm điểm
            </Button>
            <CustomButton
              onClick={onRefreshData}
              text={"Làm mới"}
              type="refresh"
              loading={state.refreshButton}
            />
          </Space>
        </Box>
      </Box>
      {/* <Typography
        sx={{
          flex: 1, // Để tiêu đề chiếm không gian còn lại
          textAlign: "center", // Căn giữa
        }}
        variant="h6"
        component="h2"
        gutterBottom
      >
        Danh sách nhóm và đề tài
      </Typography> */}
      <Table
        columns={columns}
        dataSource={filteredGroups}
        loading={isFetching}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          total: searchTerm
            ? filteredGroups.length
            : groupData
            ? groupData.data?.totalRows
            : state.totalRows, // Cập nhật giá trị total
          current: state.currentPage,
          pageSize: state.pageSize,
          onChange: (page, pageSize) => {
            updateState({ currentPage: page, pageSize: pageSize });
          },
          responsive: true,
        }}
        rowKey="id"
        style={{
          borderRadius: "8px",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredGroups ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
        }}
      />
      {/* Dialog for PointTopicStudent */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
          },
        }}
      >
        <PointTopicStudent
          selectedGroup={selectedGroup}
          onClose={handleCloseDialog} // Add onClose prop
        />
      </Dialog>
      {/* Dialog for Criteria */}
      <Modal
        open={openCriteriaDialog}
        onCancel={handleCloseCriteriaDialog}
        width="80%" // Adjust the width as needed
        footer={null} // No footer if not needed
        style={{ height: "80%" }}
      >
        <Criteria />
      </Modal>
    </Box>
  );
}

export default ListGroupTopicLecturer;
