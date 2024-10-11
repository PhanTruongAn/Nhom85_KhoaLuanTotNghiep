import React, { useState } from "react";
import {
  Paper,
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
import { Table, Pagination, message, Modal } from "antd";
import EmptyData from "../../../../components/emptydata/EmptyData";
import studentApi from "../../../../apis/studentApi";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../../redux/userSlice";
function ListTopic() {
  const group = useSelector((state) => state.userInit.group);
  const user = useSelector((state) => state.userInit.user);
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: topicsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["topics", state.currentPage, state.pageSize],
    () => studentApi.getAllTopics(state.currentPage, state.pageSize),
    {
      // enabled: state.currentPage <= state.totalPage,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            topics: res.data.topics,
            totalRows: res.data.totalRows,
          });
        } else {
          updateState({ topics: [] });
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
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
        "Chuẩn đầu ra": data.standardOutput,
        "Trạng thái": data.status,
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

  const joinTopic = async (id) => {
    const data = {
      groupId: user.groupId,
      topicId: id,
    };
    const res = await studentApi.joinTopic(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      dispatch(setGroup({ ...group, topicId: id }));
    } else {
      messageApi.error(res.message);
    }
  };
  const onCloseModal = () => {
    updateState({ isModalVisible: false });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setSearchTerm("");
    setPage(1);
  };

  // const filteredTopics = state.topics.filter((topic) =>
  //   searchBy === "title"
  //     ? topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     : topic.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const onPageChange = (pageNumber) => {
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
            onClick={(e) => viewDetailTopic(record.id)}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => joinTopic(record.id)}
          >
            Đăng ký
          </Button>
        </div>
      ),
    },
  ];

  const handlePageSizeChange = (newPageSize) => {
    updateState({
      pageSize: newPageSize,
      currentPage: 1,
    });
  };
  return (
    <Box>
      {contextHolder}
      <Grid
        container
        spacing={2}
        sx={{ paddingTop: "10px", paddingLeft: "10px" }}
      >
        <Grid item xs={12} sm={2}>
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
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
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
      <Typography
        fontWeight="bold"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Danh sách đề tài
      </Typography>

      <Table
        columns={columns}
        dataSource={state.topics}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onShowSizeChange: (current, size) => handlePageSizeChange(size),
          current: state.currentPage,
          pageSize: state.pageSize,
          total: state.totalRows,
          onChange: onPageChange,
        }}
        loading={isFetching}
        locale={{
          emptyText:
            state.topics.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EmptyData
                  text={isEmpty(topicsData) ? "Không có dữ liệu! " : null}
                />
              </Box>
            ) : null,
        }}
      />
      <Modal
        title="Chi tiết đề tài"
        open={state.isModalVisible}
        onCancel={onCloseModal}
        footer={null}
        width={"80%"}
        loading={state.isModalLoading}
      >
        {state.currentRecord && (
          <Box>
            {Object.keys(state.currentRecord).map((key) => (
              <Box key={key} sx={{ marginBottom: "10px" }}>
                <strong>{key}:</strong> {state.currentRecord[key]}
              </Box>
            ))}
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default ListTopic;
