import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Table, message, Popconfirm, Space } from "antd";
import { Add, Edit, Delete, Refresh, Check } from "@mui/icons-material";
import CustomHooks from "../../../../../utils/hooks";
import managerApi from "../../../../../apis/managerApi";
import { isEmpty } from "lodash";
import { formatDate } from "../../../../../utils/formatDate";
import EmptyData from "../../../../../components/emptydata/EmptyData";
import SearchComponent from "../../../../../components/SearchComponent/search";
const MajorManagement = () => {
  const [state, setState] = useState({
    loading: false,
    loadingButton: false,
    refreshButton: false,
    majors: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMajor, setSelectedMajor] = useState({
    id: null,
    majorName: "",
  });
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const getMajors = async () => {
    let res = await managerApi.getMajors();
    return res;
  };

  const {
    data: majorData,
    isFetching,
    refetch,
  } = CustomHooks.useQuery(["majors"], getMajors, {
    onSuccess: (res) => {
      if (res && res.status === 0) {
        updateState({ loading: false, majors: res.data, refreshButton: false });
        if (isEmpty(state.majors) && isEmpty(majorData)) {
          messageApi.success(res.message);
        }
      } else {
        updateState({ loading: false, majors: [], refreshButton: false });
        messageApi.error(res.message);
      }
    },
    onError: (err) => {
      updateState({ loading: false, majors: [], refreshButton: false });
      messageApi.error("Lỗi: ", err.message);
    },
  });

  const handleAdd = () => {
    setSelectedMajor({ majorName: "" });
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (major) => {
    setSelectedMajor(major);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (record) => {
    let data = {
      id: record.id,
    };
    const res = await managerApi.deleteMajor(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      updateState({ loading: true });
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMajor({ majorName: "", id: null });
  };

  const handleSave = async () => {
    updateState({ loadingButton: true });

    const isValid = selectedMajor.majorName !== "";
    if (!isValid) {
      messageApi.warning("Tên chuyên ngành không được để trống!");
      return updateState({ loadingButton: false });
    }

    const data = { id: selectedMajor.id, majorName: selectedMajor.majorName };
    const res = isEditing
      ? await managerApi.updateMajor(data)
      : await managerApi.createMajor({ majorName: selectedMajor.majorName });

    if (res && res.status === 0) {
      updateState({ loadingButton: false, loading: true });
      refetch();
      messageApi.success(res.message);
    } else {
      updateState({ loadingButton: false });
      messageApi.error(res.message);
    }

    setOpen(false);
  };

  const handleRefresh = () => {
    updateState({ refreshButton: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  //tìm kiếm
  const handleSearch = (value) => {
    setSearchKeyword(value.toLowerCase());
  };

  const filteredMajors = state.majors.filter((major) =>
    major.majorName.toLowerCase().includes(searchKeyword)
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên chuyên ngành",
      dataIndex: "majorName",
      key: "majorName",
    },
    {
      title: "Ngày tạo",
      render: (record) => formatDate(record.createdAt),
      key: "createdAt",
    },
    {
      title: "Ngày cập nhật",
      render: (record) => formatDate(record.updatedAt),
      key: "updatedAt",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(record)}
            size="small"
          >
            Sửa
            <Edit sx={{ marginLeft: "5px" }} />
          </IconButton>
          <Popconfirm
            title="Xóa chuyên ngành"
            description="Bạn có chắc muốn xóa chuyên ngành này?"
            onConfirm={() => handleDelete(record)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <IconButton color="error" size="small">
              Xóa
              <Delete sx={{ marginLeft: "5px" }} />
            </IconButton>
          </Popconfirm>
        </Box>
      ),
    },
  ];
  return (
    <Box sx={{ padding: "10px" }}>
      {contextHolder}
      {/* <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Quản lý chuyên ngành
      </Typography> */}
      <Box sx={{ position: "relative" }}>
        <SearchComponent
          placeholder="Tìm kiếm theo tên chuyên ngành"
          onChange={handleSearch}
        />
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Space>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAdd}
            >
              Thêm chuyên ngành
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={
                state.refreshButton ? (
                  <CircularProgress size={20} />
                ) : (
                  <Refresh />
                )
              }
              onClick={handleRefresh}
              disabled={state.refreshButton}
            >
              Làm mới
            </Button>
          </Space>
        </Box>
      </Box>

      <Table
        columns={columns}
        dataSource={filteredMajors}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginBottom: "20px", marginTop: "20px" }}
        loading={state.loading}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredMajors ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : null}
            </Box>
          ),
        }}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {isEditing ? "Chỉnh sửa chuyên ngành" : "Thêm chuyên ngành mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên chuyên ngành"
            type="text"
            fullWidth
            value={selectedMajor?.majorName || ""}
            onChange={(e) =>
              setSelectedMajor({
                ...selectedMajor,
                majorName: e.target.value,
              })
            }
            sx={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose} color="error">
            Hủy
          </Button>
          <Button
            size="small"
            onClick={handleSave}
            color="primary"
            variant="contained"
            endIcon={
              state.loadingButton ? <CircularProgress size={20} /> : <Check />
            }
            disabled={state.loadingButton}
          >
            {isEditing ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MajorManagement;
