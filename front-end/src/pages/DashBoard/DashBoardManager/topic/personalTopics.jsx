import React, { useState, useMemo } from "react";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { message, Table, Popconfirm } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomHooks from "../../../../utils/hooks";
import { useSelector } from "react-redux";
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editTopic, setEditTopic] = useState({
    id: "",
    title: "",
    quantityGroup: "",
    description: "",
    goals: "",
    requirement: "",
    standardOutput: "",
  });

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

  const handleEdit = (topic) => {
    setEditTopic(topic);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setSelectedTopic(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditTopic({
      id: "",
      title: "",
      quantityGroup: "",
      description: "",
      goals: "",
      requirement: "",
      standardOutput: "",
    });
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

  const handleSaveEdit = async () => {
    setLoading(true);
    const res = await lecturerApi.updateTopicById(editTopic);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      handleCloseEditModal();
      setLoading(false);
      refetch();
    } else {
      setLoading(false);
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
      // dataIndex: "quantityGroup",
      key: "quantityGroup",
      render: (record) => `${record.groupCount}/${record.quantityGroup}`,
      sorter: (a, b) => a.groupCount - b.groupCount,
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
          <Button
            onClick={() => handleEdit(record)}
            variant="contained"
            endIcon={<EditOutlined />}
            size="small"
            sx={[
              (theme) => ({
                ...theme.applyStyles("light", {
                  backgroundColor: "#FF993A",
                }),
                ...theme.applyStyles("dark", {
                  backgroundColor: "#1DA57A",
                }),
              }),
            ]}
          >
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

      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        fullWidth
        maxWidth="lg"
        sx={{ overflow: "auto" }}
      >
        <DialogTitle variant="h4">Chỉnh sửa đề tài</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "20px",
            }}
          >
            <TextField
              label="Tên đề tài"
              value={editTopic.title}
              onChange={(e) =>
                setEditTopic({ ...editTopic, title: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Số lượng nhóm"
              type="number"
              value={editTopic.quantityGroup}
              onChange={(e) =>
                setEditTopic({ ...editTopic, quantityGroup: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Mô tả"
              value={editTopic.description}
              onChange={(e) =>
                setEditTopic({ ...editTopic, description: e.target.value })
              }
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Mục tiêu"
              value={editTopic.goals}
              onChange={(e) =>
                setEditTopic({ ...editTopic, goals: e.target.value })
              }
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Yêu cầu đầu vào"
              value={editTopic.requirement}
              onChange={(e) =>
                setEditTopic({ ...editTopic, requirement: e.target.value })
              }
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Yêu cầu đầu ra"
              value={editTopic.standardOutput}
              onChange={(e) =>
                setEditTopic({ ...editTopic, standardOutput: e.target.value })
              }
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button
            onClick={handleCloseEditModal}
            variant="outlined"
            color="error"
            sx={{ marginRight: "8px" }}
          >
            Hủy
          </Button>
          <CustomButton
            loading={loading}
            text="Lưu"
            type="success"
            onClick={handleSaveEdit}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PersonalTopics;
