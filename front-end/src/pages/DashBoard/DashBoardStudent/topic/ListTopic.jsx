import { useState } from "react";
import {
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
import { InfoCircleOutlined } from "@ant-design/icons";
import SearchIcon from "@mui/icons-material/Search";
import TopicIcon from "@mui/icons-material/Topic";
import { Table, message, Modal } from "antd";
import EmptyData from "../../../../components/emptydata/EmptyData";
import studentApi from "../../../../apis/studentApi";
import { isEmpty } from "lodash";
import CustomHooks from "../../../../utils/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../../redux/userSlice";
import ConfirmModal from "../../../../components/Modal/confirmModal";
import { useDebounce } from "@uidotdev/usehooks";
import { formatContent } from "../../../../utils/formatContent";
import OverDate from "../../../../components/overDate/overDate";
/* eslint-disable */
function ListTopic() {
  const group = useSelector((state) => state.userInit.group);
  const user = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPage: 1,
    totalRows: null,
    pageSize: 5,
    topics: [],
    loadingData: false,
    currentRecord: {},
    isModalLoading: false,
    isModalVisible: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [pages, setPages] = useState([1]);

  const currentDate = new Date();
  // Kiểm tra hạn đăng ký đề tài
  const isWithinChooseTopicPeriod =
    currentDate >= new Date(currentTerm?.endChooseTopicDate);
  // Kiểm tra hạn công bố đề tài
  const isWithinPublicTopicPeriod =
    currentDate >= new Date(currentTerm?.startPublicTopicDate) &&
    currentDate <= new Date(currentTerm?.endPublicTopicDate);

  const {
    data: topicsData,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = CustomHooks.useQuery(
    ["topics", state.currentPage, state.pageSize, debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm) {
        return handleFindTopic();
      } else {
        return studentApi.getAllTopics(
          state.currentPage,
          state.pageSize,
          currentTerm?.id
        );
      }
    },
    {
      enabled: !isEmpty(currentTerm) && !isWithinChooseTopicPeriod,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            loadingData: false,
            topics: res.data.topics,
            totalRows: res?.data?.totalRows || 0,
          });
        } else {
          updateState({ topics: [], totalRows: 0, loadingData: false });
          messageApi.error(res.message);
        }
      },
      onError: () => {
        updateState({ topics: [], totalRows: 0, loadingData: false });
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
  const handleFindTopic = async () => {
    const res = await studentApi.findTopic(searchTerm);
    return res;
  };

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const viewDetailTopic = async (id) => {
    updateState({ isModalVisible: true, isModalLoading: true });

    const res = await studentApi.viewDetailsTopic(id);
    if (res && res.status === 0) {
      const { data } = res;
      const dataConvert = {
        "Tên đề tài": data.title,
        "Mô tả": data.description,
        "Mục tiêu": data.goals,
        "Yêu cầu": data.requirement,
        "Số lượng nhóm": data.quantityGroup,
        "Giảng viên": data.lecturer.fullName,
        Email: data.lecturer.email,
      };
      updateState({ currentRecord: dataConvert, isModalLoading: false });
    } else {
      updateState({ currentRecord: {}, isModalLoading: false });
      messageApi.error(res.message);
    }
  };

  const handleConfirmJoin = async () => {
    setLoadingConfirm(true);
    const data = {
      groupId: user.groupId,
      topicId: selectedTopicId,
    };
    const res = await studentApi.joinTopic(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      dispatch(setGroup({ ...group, topicId: selectedTopicId }));
      setIsConfirmModalOpen(false);
      refetch();
    } else {
      messageApi.error(res.message);
    }
    setLoadingConfirm(false);
  };
  const handleRegisterClick = (id) => {
    setSelectedTopicId(id); // Lưu lại ID đề tài
    setIsConfirmModalOpen(true); // Mở modal
  };

  const onCloseModal = () => {
    updateState({ isModalVisible: false });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setSearchTerm("");
  };
  const onPageChange = (pageNumber) => {
    if (!pages.includes(pageNumber)) {
      pages.push(pageNumber);
      updateState({ loadingData: true });
    }
    updateState({ currentPage: pageNumber });
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
      width: 600,
    },
    {
      title: "Giảng viên",
      key: "lecturer",
      render: (text, record) => record.lecturer?.fullName || "N/A",
    },
    {
      title: "Số lượng nhóm",
      // dataIndex: "quantityGroup",
      key: "quantityGroup",
      render: (text, record) =>
        `${record.groupCount} / ${record.quantityGroup}`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<InfoCircleOutlined />}
            onClick={() => viewDetailTopic(record.id)}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleRegisterClick(record.id)}
            disabled={isWithinPublicTopicPeriod}
          >
            Đăng ký
          </Button>
        </div>
      ),
    },
  ];

  const handlePageSizeChange = (newPageSize) => {
    updateState({
      loadingData: true,
      pageSize: newPageSize,
      currentPage: 1,
    });
  };
  return (
    <Box>
      {contextHolder}{" "}
      {isWithinChooseTopicPeriod ? (
        <OverDate
          text="Đã hết hạn đăng ký đề tài!"
          startDate={currentTerm.startChooseTopicDate}
          endDate={currentTerm.endChooseTopicDate}
        />
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{ paddingTop: "10px", paddingLeft: { xs: "5px", sm: "10px" } }} // Responsive padding
          >
            <Grid item xs={12} sm={2} md={2}>
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
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Tìm theo tên đề tài hoặc giảng viên"
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
              fontSize: { xs: "18px", sm: "20px" }, // Responsive font size
            }}
          >
            Danh sách đề tài
          </Typography>

          <Table
            columns={columns}
            dataSource={topicsData ? topicsData.data?.topics : state.topics}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
              onShowSizeChange: (current, size) => handlePageSizeChange(size),
              current: state.currentPage,
              pageSize: state.pageSize,
              total: isSuccess ? topicsData.data?.totalRows : state.totalRows,
              onChange: onPageChange,
              responsive: true,
            }}
            scroll={{ x: 500 }}
            loading={state.loadingData}
            locale={{
              emptyText: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isFetching ? (
                    <EmptyData />
                  ) : isEmpty(state.topics) ? (
                    <EmptyData text="Không có dữ liệu!" />
                  ) : null}
                </Box>
              ),
            }}
          />
          <Modal
            title="Chi tiết đề tài"
            open={state.isModalVisible}
            onCancel={onCloseModal}
            footer={null}
            width="80%"
            loading={state.isModalLoading}
          >
            {state.currentRecord && (
              <Box
                maxWidth="lg"
                sx={{ overflowY: "auto", height: "70vh", fontSize: "16px" }}
              >
                {Object.keys(state.currentRecord).map((key) => (
                  <Box key={key} sx={{ marginBottom: "10px" }}>
                    <strong>{key}:</strong>
                    {["Mô tả", "Mục tiêu", "Yêu cầu"].includes(key)
                      ? formatContent(state.currentRecord[key])
                      : state.currentRecord[key]}
                  </Box>
                ))}
              </Box>
            )}
          </Modal>

          <ConfirmModal
            open={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            icon={<TopicIcon />}
            onConfirm={handleConfirmJoin}
            description="Bạn có chắc chắn muốn đăng ký đề tài này không?"
            loading={loadingConfirm}
          />
        </>
      )}
    </Box>
  );
}

export default ListTopic;
