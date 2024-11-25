import { useState, useMemo } from "react";
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
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { message, Table, Popconfirm, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomHooks from "../../../../utils/hooks";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { formatContent } from "../../../../utils/formatContent";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomButton from "../../../../components/Button/CustomButton";
import managerApi from "../../../../apis/managerApi";
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
  const [openAssignGroupDialog, setOpenAssignGroupDialog] = useState(false); // State for the dialog
  const [selectedGroupTopic, setSelectedGroupTopic] = useState(null); // State for the selected topic for group assignment
  const [groupName, setGroupName] = useState(""); // State for the group name
  const [editTopic, setEditTopic] = useState({
    id: "",
    title: "",
    quantityGroup: "",
    description: "",
    goals: "",
    requirement: "",
    standardOutput: "",
  });
  const [isClosing, setIsClosing] = useState(false); // New state to control closing animation
  const handleCloseDetailModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenDetailModal(false);
      setIsClosing(false);
    }, 100); // Delay before closing the modal completely
  };
  //validate
  const [errors, setErrors] = useState({});
  const validateEditTopic = () => {
    const newErrors = {};

    if (!editTopic.title.trim()) {
      newErrors.title = "Tên đề tài không được để trống.";
    }

    if (
      !editTopic.quantityGroup ||
      editTopic.quantityGroup < 1 ||
      editTopic.quantityGroup > 10
    ) {
      newErrors.quantityGroup =
        "Số lượng nhóm không được trống hoặc phải từ 1 đến 10.";
    }

    if (!editTopic.description.trim()) {
      newErrors.description = "Mô tả không được để trống.";
    }

    if (!editTopic.goals.trim()) {
      newErrors.goals = "Mục tiêu không được để trống.";
    }

    if (!editTopic.requirement.trim()) {
      newErrors.requirement = "Yêu cầu đầu vào không được để trống.";
    }

    if (!editTopic.standardOutput.trim()) {
      newErrors.standardOutput = "Yêu cầu đầu ra không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //validate gán nhóm
  const [groupNameError, setGroupNameError] = useState(""); // Trạng thái lưu lỗi

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
      onError: () => {
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
  }, [searchTerm, topics, data]);

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
    setSelectedTopic(null);
    setOpenDetailModal(false);
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
    setErrors({});
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
    if (!validateEditTopic()) return; // Nếu không hợp lệ, dừng lại

    setLoading(true);
    const res = await lecturerApi.updateTopicById(editTopic);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      handleCloseEditModal();
      setLoading(false);
      refetch();
      setErrors({}); // Xóa lỗi khi người dùng sửa thành công
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  //Gán nhóm
  const handleAssignGroupSubmit = async () => {
    if (!groupName.trim()) {
      setGroupNameError("Tên nhóm không được để trống.");
      return;
    }

    let dataToSave = {
      groupName: groupName,
      topicId: selectedGroupTopic.id,
      termId: currentTerm.id,
    };
    const res = await managerApi.assignTopicToGroup(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      handleAssignGroupClose();
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };

  const handleAssignGroup = (topic) => {
    setSelectedGroupTopic(topic);
    setOpenAssignGroupDialog(true);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
    if (event.target.value.trim()) {
      setGroupNameError(""); // Xóa lỗi khi người dùng nhập đúng
    }
  };

  const handleAssignGroupClose = () => {
    setOpenAssignGroupDialog(false);
    setGroupName("");
    setGroupNameError("");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: "5%",
    },
    {
      title: "Tên đề tài",
      dataIndex: "title",
      key: "title",
      width: 500,
      ellipsis: true,
    },
    {
      title: "Số lượng nhóm",
      key: "quantityGroup",
      width: "15%",
      render: (record) => `${record.groupCount}/${record.quantityGroup}`,
      sorter: (a, b) => a.groupCount - b.groupCount,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
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
          responsive: true,
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
            <Button size="small" onClick={handleCloseModal} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}

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
              onChange={(e) => {
                setEditTopic({ ...editTopic, title: e.target.value });
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
                }
              }}
              error={!!errors.title}
              helperText={errors.title}
            />

            <TextField
              label="Số lượng nhóm"
              type="number"
              value={editTopic.quantityGroup}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  // Kiểm tra nếu giá trị chỉ chứa các chữ số
                  setEditTopic({ ...editTopic, quantityGroup: value });
                  if (value >= 1 && value <= 10) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      quantityGroup: "",
                    }));
                  }
                }
              }}
              onKeyPress={(e) => {
                if (!/^\d*$/.test(e.key)) {
                  // Ngăn chặn các ký tự không phải số
                  e.preventDefault();
                }
              }}
              inputProps={{ min: 1, max: 10, step: 1 }} // Giới hạn giá trị đầu vào
              error={!!errors.quantityGroup}
              helperText={errors.quantityGroup}
            />

            <TextField
              label="Mô tả"
              value={editTopic.description}
              onChange={(e) => {
                setEditTopic({ ...editTopic, description: e.target.value });
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    description: "",
                  }));
                }
              }}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
            />

            <TextField
              label="Mục tiêu"
              value={editTopic.goals}
              onChange={(e) => {
                setEditTopic({ ...editTopic, goals: e.target.value });
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({ ...prevErrors, goals: "" }));
                }
              }}
              multiline
              rows={4}
              error={!!errors.goals}
              helperText={errors.goals}
            />

            <TextField
              label="Yêu cầu đầu vào"
              value={editTopic.requirement}
              onChange={(e) => {
                setEditTopic({ ...editTopic, requirement: e.target.value });
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    requirement: "",
                  }));
                }
              }}
              multiline
              rows={4}
              error={!!errors.requirement}
              helperText={errors.requirement}
            />

            <TextField
              label="Yêu cầu đầu ra"
              value={editTopic.standardOutput}
              onChange={(e) => {
                setEditTopic({ ...editTopic, standardOutput: e.target.value });
                if (e.target.value.trim()) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    standardOutput: "",
                  }));
                }
              }}
              multiline
              rows={4}
              error={!!errors.standardOutput}
              helperText={errors.standardOutput}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button
            size="small"
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
              error={!!groupNameError} // Hiển thị viền đỏ nếu có lỗi
              helperText={groupNameError} // Hiển thị thông báo lỗi
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

export default PersonalTopics;
