import React, { useState, useMemo } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchIcon from "@mui/icons-material/Search";
import { message, Table } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomHooks from "../../../../utils/hooks";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { formatContent } from "../../../../utils/formatContent";
import SearchComponent from "../../../../components/SearchComponent/search";
function SearchBar({ searchTerm, setSearchTerm, searchBy, setSearchBy }) {
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
          property={{
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

function PersonalTopics() {
  const user = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [topics, setTopics] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  //Get Personal Topic
  const getPersonalTopic = async () => {
    let id = user.id;
    let termId = currentTerm.id;
    let res = await lecturerApi.getPersonalTopic(termId, id);
    return res;
  };

  const { data, refetch, isFetching } = CustomHooks.useQuery(
    ["personal-topics"],
    getPersonalTopic,
    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          messageApi.success(res.message);
          setTopics(res.data);
        } else {
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) =>
      searchBy === "title"
        ? topic.title.toLowerCase().includes(searchTerm.toLowerCase())
        : topic.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, searchBy, topics]);

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
      width: 600,
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

      <SearchComponent placeholder={"Tìm kiếm..."} />
      {/* <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      /> */}

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

export default PersonalTopics;
