import React, { useState } from "react";
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
import { Table, Space, Input, message, Popconfirm } from "antd"; // Import Input từ Ant Design
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons"; // Biểu tượng search
import managerApi from "../../../../../apis/managerApi";
import CustomHooks from "../../../../../utils/hooks";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import CustomButton from "../../../../../components/Button/CustomButton";
import EmptyData from "../../../../../components/emptydata/EmptyData";
const { Search } = Input;

function ManageNotification() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReload, setLoadingReload] = useState(false);
  const handleGetNotes = async () => {
    const term = currentTerm.id;
    let res = await managerApi.getNotes(term);
    console.log("Check notes: ", res);
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
        messageApi.info(res.message);
      } else {
        messageApi.error(res.message);
      }
      setLoading(false);
    },
    onError: (error) => {
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
  };

  const handleUpdateSubmit = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === currentNotification.id ? currentNotification : item
      )
    );
    setIsUpdateOpen(false);
    setCurrentNotification(null);
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
            sx={{
              marginLeft: "10px",
              textTransform: "none",
              background: "#1DA57A",
            }}
            endIcon={<EditOutlined />}
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Xóa thông báo"
            description="Bạn có chắc muốn xóa thông báo này?"
            onConfirm={(e) => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                marginLeft: "10px",
                textTransform: "none",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ width: "35%" }}>
          <Search
            placeholder="Tìm theo tiêu đề thông báo"
            enterButton
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Box>
      </Box>
      <CustomButton
        text="Làm mới dữ liệu"
        loading={loadingReload}
        onClick={handleReload}
        type="refresh"
        sx={{ float: "right", marginBottom: "20px" }}
      />

      <Table
        style={{ marginTop: "20px" }}
        dataSource={notesData ? notesData.data : data}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ responsive: true }}
        loading={loading}
        locale={{
          emptyText:
            data.length === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width={"100%"}
                height={"auto"}
              >
                {isFetching ? (
                  <EmptyData />
                ) : notesData && isEmpty(notesData.data) ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : null}
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width={"100%"}
                height={"auto"}
              >
                {isFetching ? (
                  <EmptyData />
                ) : notesData && isEmpty(notesData.data) ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : null}
              </Box>
            ),
        }}
      />

      <Dialog
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Cập nhật thông báo
        </DialogTitle>
        <DialogContent
          sx={{
            width: "60vw",
            maxWidth: "800px",
            height: "50vh",
            maxHeight: "500px",
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
            />
            <TextField
              label="Chi tiết"
              variant="outlined"
              name="details"
              value={currentNotification?.details || ""}
              onChange={handleChange}
              multiline
              rows={4}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="recipient-label">Đối tượng</InputLabel>
              <Select
                labelId="recipient-label"
                name="recipient"
                value={currentNotification?.recipient || "all"}
                onChange={handleChange}
                label="Recipient"
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="students">Sinh viên</MenuItem>
                <MenuItem value="lecturers">Giảng viên</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsUpdateOpen(false)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ManageNotification;
