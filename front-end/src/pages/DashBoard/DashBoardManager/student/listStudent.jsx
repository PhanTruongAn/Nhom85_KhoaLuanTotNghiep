import React, { useState } from "react";
import { Table, Space, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons"; // Thêm biểu tượng UserOutlined
import { toast } from "react-toastify";
import { Box, Typography, Button } from "@mui/material";
import AddModal from "./AddModal";
import studentApi from "../../../../apis/studentApi";

const initialData = [
  {
    key: "1",
    studentId: "SV001",
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
  },
  {
    key: "2",
    studentId: "SV002",
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
  },
  {
    key: "3",
    studentId: "SV003",
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
  },
  {
    key: "4",
    studentId: "SV004",
    name: "Tran Thi B",
    email: "b@example.com",
    phone: "0987654321",
  },
  {
    key: "5",
    studentId: "SV005",
    name: "Nguyen Van A",
    email: "a@example.com",
    phone: "0123456789",
  },

  // Thêm dữ liệu sinh viên khác tại đây
];

function ListStudent() {
  const [students, setStudents] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [limitUser, setLimitUser] = useState(5);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const getData = async () => {
    const res = await studentApi.getAll(currentPage, limitUser);
    if (res && res.EC === 0) {
      setDataSource(res.data.students);
      setTotalRows(res.data.totalRows);
      setTotalPages(res.data.totalPages);
      // setLoadingData(false);
      messageApi.success(res.message);
    } else if (res.status === -1) {
      setDataSource([]);
      // setLoadingData(false);
      messageApi.error(res.message);
    } else {
      navigate("/login");
      toast.error(res.message);
    }
  };
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleEdit = (key) => {
    console.log("Edit student with key:", key);
    // Thực hiện logic chỉnh sửa ở đây
  };

  const handleDelete = (key) => {
    setStudents(students.filter((student) => student.key !== key));
  };

  const handlerReload = () => {
    setLoading(!loading);
  };
  const columns = [
    {
      title: "Mã số sinh viên",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEdit(record.key)}
            variant="contained"
            size="small"
            sx={[
              (theme) => ({
                marginLeft: "10px",
                textTransform: "none",
                ...theme.applyStyles("dark", {
                  background: "#1DA57A",
                }),
              }),
            ]}
            startIcon={<EditOutlined />}
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDelete(record.key)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
            startIcon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
      <Box sx={{ float: "right" }}>
        <Space>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            Thêm mới sinh viên
          </Button>
          <Button
            onClick={handlerReload}
            variant="contained"
            startIcon={<ReloadOutlined spin={loading} />}
          >
            Làm mới
          </Button>
        </Space>
      </Box>

      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Danh sách sinh viên
        </Typography>
      </Box>
      <Box>
        <Table
          columns={columns}
          dataSource={students}
          pagination={{ pageSize: 5 }}
        />
      </Box>
      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
}

export default ListStudent;
