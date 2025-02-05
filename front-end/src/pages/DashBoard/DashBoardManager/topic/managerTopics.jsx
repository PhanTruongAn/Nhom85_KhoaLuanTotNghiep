import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DeleteOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Space, Table, message, Popconfirm } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { formatContent } from "../../../../utils/formatContent";
import CustomButton from "../../../../components/Button/CustomButton";
import CustomHooks from "../../../../utils/hooks";
import SearchComponent from "../../../../components/SearchComponent/search";
import { useSelector } from "react-redux";
import managerApi from "../../../../apis/managerApi";
import lecturerApi from "../../../../apis/lecturerApi";
import { isEmpty } from "lodash";
import { useDebounce } from "@uidotdev/usehooks";
function ManagerTopics() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [refresh, setRefresh] = useState(false);
  const [openAssignGroupDialog, setOpenAssignGroupDialog] = useState(false); // State for the dialog
  const [selectedGroupTopic, setSelectedGroupTopic] = useState(null); // State for the selected topic for group assignment
  const [groupName, setGroupName] = useState(""); // State for the group name
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isClosing, setIsClosing] = useState(false); // New state to control closing animation
  const handleCloseDetailModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenDetailModal(false);
      setIsClosing(false);
    }, 100); // Delay before closing the modal completely
  };

  //Get All Topics Of Lecturer
  const {
    isFetching,
    data: topicsData,
    refetch,
  } = CustomHooks.useQuery(
    ["lecturer-topics", currentTerm?.id, page, pageSize, debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm) {
        return handleFindTopics();
      } else {
        return managerApi.getLecturerTopics(currentTerm?.id, page, pageSize);
      }
    },

    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setTopics(res.data.topics);
          setTotalRows(res.data.totalRows);
          setTotalPages(res.data.totalPages);
        } else if (res.status === -1 || res.status === 403) {
          setTopics([]);
          messageApi.error(res.message);
        }
        setRefresh(false);
      },
      onError: () => {
        setRefresh(false);
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
  //Find Topics
  const handleFindTopics = async () => {
    const res = await managerApi.findTopics(currentTerm?.id, searchTerm);
    setTotalRows(res?.data.length || 0);
    return res;
  };
  const handleViewDetails = (topic) => {
    setSelectedTopic(topic);
    setOpenDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setSelectedTopic(null);
  };
  const handleDelete = async (id) => {
    const dataDelete = {
      id: id,
    };
    let res = await lecturerApi.deleteTopicById(dataDelete);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      if (topics.length === 1 && totalPages !== 1) {
        setPage(page - 1);
      }
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên đề tài",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "30%",
    },
    {
      title: "Giảng viên",
      key: "lecturer",
      render: (record) => record.lecturer.fullName,
      width: "20%",
    },
    {
      title: "Số lượng nhóm",
      dataIndex: "quantityGroup",
      key: "quantityGroup",
      width: "15%",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <>
          <Space>
            <Button
              onClick={() => handleViewDetails(record)}
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
              endIcon={<InfoCircleOutlined />}
            >
              Xem chi tiết
            </Button>
            <Button
              onClick={() => handleAssignGroup(record)}
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<UsergroupAddOutlined />}
            >
              Gán nhóm
            </Button>

            <Popconfirm
              title="Xóa đề tài"
              description="Bạn có chắc muốn xóa đề tài này?"
              onConfirm={() => handleDelete(record.id)}
              okText="Đồng ý"
              cancelText="Không"
            >
              <Button
                variant="contained"
                color="error"
                size="small"
                endIcon={<DeleteOutlined />}
              >
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  const handleRefresh = () => {
    setRefresh(true);
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  //Gán nhóm
  const handleAssignGroup = (topic) => {
    setSelectedGroupTopic(topic);
    setOpenAssignGroupDialog(true);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleAssignGroupClose = () => {
    setOpenAssignGroupDialog(false);
    setGroupName("");
  };

  const handleAssignGroupSubmit = async () => {
    let dataToSave = {
      groupName: groupName,
      topicId: selectedGroupTopic.id,
      termId: currentTerm.id,
    };
    const res = await managerApi.assignTopicToGroup(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      handleAssignGroupClose();
    } else {
      messageApi.error(res.message);
    }
  };
  return (
    <Box>
      {contextHolder}
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

      <Box sx={{ position: "relative", padding: "10px" }}>
        <SearchComponent
          placeholder="Tìm theo tên giảng viên"
          onChange={(term) => setSearchTerm(term)}
        />
        <CustomButton
          onClick={handleRefresh}
          loading={refresh}
          text="Làm mới dữ liệu"
          type="refresh"
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>

      <Table
        style={{ padding: "10px" }}
        columns={columns}
        dataSource={
          topicsData && topicsData.data ? topicsData.data.topics : topics
        }
        // loading={isFetching && !topicsData?.data}
        loading={isFetching}
        rowKey={(record) => record.id}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          current: page,
          pageSize: pageSize,
          total:
            topicsData && topicsData.data
              ? topicsData.data.totalRows
              : totalRows,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : isEmpty(topics) ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
        }}
      />
      {openDetailModal && !isClosing && (
        <Dialog
          open={openDetailModal}
          onClose={handleCloseDetailModal}
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
                  <b>Giảng viên:</b> {selectedTopic.lecturer.fullName}
                </Typography>
                <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                  <b>Mô tả:</b> {formatContent(selectedTopic.description)}
                </Typography>
                <Typography sx={{ marginTop: "5px", fontSize: "17px" }}>
                  <b>Mục tiêu:</b> {formatContent(selectedTopic.goals)}
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
            <Button size="small" onClick={handleCloseModal} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openAssignGroupDialog}
        onClose={handleAssignGroupClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gán nhóm</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} padding={1}>
            <TextField
              label="Tên nhóm"
              value={groupName}
              onChange={handleGroupNameChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleAssignGroupClose} color="error">
            Hủy
          </Button>
          <Button
            size="small"
            onClick={handleAssignGroupSubmit}
            color="primary"
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManagerTopics;
