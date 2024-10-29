import React, { useState, useMemo } from "react";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Table, Popconfirm } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomHooks from "../../../../utils/hooks";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { formatContent } from "../../../../utils/formatContent";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomButton from "../../../../components/Button/CustomButton";
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
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //Get Personal Topic
  const getPersonalTopic = async () => {
    let id = user.id;
    let termId = currentTerm.id;
    let res = await lecturerApi.getPersonalTopic(termId, id);
    return res;
  };

  const { data, refetch, isFetching } = CustomHooks.useQuery(
    ["personal-topics", currentTerm],
    getPersonalTopic,
    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          if (isEmpty(data)) {
            messageApi.success(res.message);
          }
          setTopics(res.data);
          setRefresh(false);
        } else {
          setTopics([]);
          messageApi.error(res.message);
          setRefresh(false);
        }
      },
      onError: (err) => {
        setTopics([]);
        messageApi.error("Lỗi khi lấy dữ liệu!");
        setRefresh(false);
      },
    }
  );

  const filteredTopics = useMemo(() => {
    const sourceData = data && data.data ? data.data : topics;
    return sourceData.filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, topics]);

  const totalRows = filteredTopics.length;

  const handleViewDetails = (topic) => {
    setSelectedTopic(topic);
    setOpenDetailModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setSelectedTopic(null);
  };

  const handleRefresh = () => {
    setRefresh(true);
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  const handleDelete = async (id) => {
    const dataDelete = {
      id: id,
    };
    let res = await lecturerApi.deleteTopicById(dataDelete);
    if (res && res.status === 0) {
      messageApi.success(res.message);
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
      sorter: (a, b) => a.id - b.id,
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
      sorter: (a, b) => a.quantityGroup - b.quantityGroup,
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
          <Popconfirm
            title="Xóa đề tài"
            description="Bạn có chắc muốn xóa đề tài này?"
            onConfirm={(e) => handleDelete(record.id)}
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
        Danh sách đề tài của tôi
      </Typography>

      <Box sx={{ position: "relative", padding: "10px" }}>
        <SearchComponent
          placeholder="Tìm theo tên đề tài"
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
        dataSource={filteredTopics}
        loading={isFetching}
        rowKey={(record) => record.id}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          current: page,
          pageSize: rowsPerPage,
          total: totalRows,
          onChange: (page, pageSize) => {
            setPage(page);
            setRowsPerPage(pageSize);
          },
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredTopics ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
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
