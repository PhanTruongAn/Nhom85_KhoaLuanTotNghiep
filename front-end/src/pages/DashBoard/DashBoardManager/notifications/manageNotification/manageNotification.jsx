import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Table, Space, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import managerApi from "../../../../../apis/managerApi";
import CustomHooks from "../../../../../utils/hooks";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import CustomButton from "../../../../../components/Button/CustomButton";
import EmptyData from "../../../../../components/emptydata/EmptyData";
import SearchComponent from "../../../../../components/SearchComponent/search";

function ManageNotification() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const terms = useSelector((state) => state.userInit.terms);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReload, setLoadingReload] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [state, setState] = useState({
    page: 1,
    pageSize: 5,
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    termId: "",
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const handleGetNotes = async () => {
    const term = currentTerm.id;
    let res = await managerApi.getNotes(term);
    return res;
  };

  const {
    data: notesData,
    refetch,
    isFetching,
  } = CustomHooks.useQuery(["notes", currentTerm], handleGetNotes, {
    enabled: !isEmpty(currentTerm),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        setData(res.data);
      } else if (res.status === 1) {
        setData([]);
        messageApi.info(res.message);
      } else {
        setData([]);
        messageApi.error(res.message);
      }
      setLoading(false);
    },
    onError: (error) => {
      setData([]);
      messageApi.error(`${error}!`);
    },
  });

  const handleDelete = async (id) => {
    let res = await managerApi.deleteNote(id);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };

  const handleUpdateClick = (record) => {
    setCurrentNotification(record);
    setIsUpdateOpen(true);
    setErrors({ title: "", content: "", termId: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentNotification.title) newErrors.title = "Tiêu đề là bắt buộc!";
    if (!currentNotification.content)
      newErrors.content = "Chi tiết là bắt buộc!";
    if (!currentNotification.termId) newErrors.termId = "Học kỳ là bắt buộc!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleUpdateSubmit = async () => {
    if (!validateForm()) return; // Prevent submission if validation fails

    setUpdateLoading(true);
    const res = await managerApi.updateNote(currentNotification);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setIsUpdateOpen(false);
      setCurrentNotification(null);
      setUpdateLoading(false);
      refetch();
    } else {
      setUpdateLoading(false);
      messageApi.success(res.message);
    }
  };
  const handleClose = () => {
    // Reset errors khi đóng form
    setErrors({
      title: "",
      content: "",
      termId: "",
    });
    setIsUpdateOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNotification((prev) => ({ ...prev, [name]: value }));
  };

  const handleReload = () => {
    setLoading(true);
    setLoadingReload(true);
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
      setLoadingReload(false);
      setLoading(false);
    }, 1000);
  };

  // Tìm kiếm
  const handleSearch = (value) => {
    setSearchKeyword(value.toLowerCase());
  };

  // Lọc tìm kiếm
  const sourceData = notesData && notesData.data ? notesData.data : data;
  const filteredData = sourceData.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword)
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: "10%" },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    { title: "Nội dung", dataIndex: "content", key: "content", ellipsis: true },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => handleUpdateClick(record)}
            variant="contained"
            size="small"
            color="secondary"
            endIcon={<EditOutlined />}
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Xóa thông báo"
            description="Bạn có chắc muốn xóa thông báo này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                marginLeft: "10px",
              }}
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
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
      <Box
        sx={{
          position: "relative",
        }}
      >
        <SearchComponent
          placeholder={"Tìm theo tiêu đề thông báo"}
          onChange={handleSearch}
        />

        <CustomButton
          text="Làm mới dữ liệu"
          loading={loadingReload}
          onClick={handleReload}
          type="refresh"
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Danh sách thông báo
      </Typography>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          current: state.page,
          pageSize: state.pageSize,
          onChange: (page, size) => {
            updateState({ page: page, pageSize: size });
          },
          responsive: true,
        }}
        loading={loading}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredData ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
        }}
      />

      <Dialog
        open={isUpdateOpen}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{ style: { height: "700px" } }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Cập nhật thông báo
        </DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            height: "80%",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
              p: 2,
            }}
          >
            <TextField
              label="Tiêu đề"
              variant="outlined"
              name="title"
              value={currentNotification?.title || ""}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Chi tiết"
              variant="outlined"
              name="content"
              value={currentNotification?.content || ""}
              onChange={handleChange}
              multiline
              rows={12}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              error={!!errors.content}
              helperText={errors.content}
            />
            <FormControl fullWidth>
              <InputLabel id="term-label">Học kỳ</InputLabel>
              <Select
                labelId="term-label"
                name="termId"
                value={currentNotification?.termId || ""}
                onChange={handleChange}
                label="Học kỳ"
                sx={{ borderRadius: "8px" }}
                error={!!errors.termId}
              >
                {terms.map((term) => (
                  <MenuItem key={term.id} value={term.id}>
                    {term.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            onClick={() => setIsUpdateOpen(false)}
            variant="contained"
            color="error"
            sx={{
              marginLeft: "10px",
            }}
          >
            Hủy
          </Button>
          <CustomButton
            onClick={handleUpdateSubmit}
            text="Lưu"
            type="success"
            loading={updateLoading}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageNotification;
