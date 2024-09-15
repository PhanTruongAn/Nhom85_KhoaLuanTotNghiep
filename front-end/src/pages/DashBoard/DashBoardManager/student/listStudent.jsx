import React, { useState, useEffect } from "react";
import { Table, Space, message, Pagination } from "antd";
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
import { useNavigate } from "react-router-dom";
function ListStudent() {
  const navigate = useNavigate();
  // const [students, setStudents] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [limitUser, setLimitUser] = useState(5);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    getData();
  }, [currentPage]);
  const getData = async () => {
    setLoadingData(true);
    const res = await studentApi.getAll(currentPage, limitUser);
    if (res && res.status === 0) {
      setDataSource(res.data.students);
      setTotalRows(res.data.totalRows);
      setTotalPages(res.data.totalPages);
      setLoadingData(false);
      setLoading(false);
      return true;
    } else if (res.status === -1) {
      setDataSource([]);
      setLoadingData(false);
      setLoading(false);
      messageApi.error(res.message);
    } else if (res.status === 403) {
      setDataSource([]);
      setLoadingData(false);
      setLoading(false);
      messageApi.error(res.message);
    } else {
      navigate("/login");
      toast.error(res.message);
    }
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const onChange = (pageNumber) => {
    setLoadingData(true);
    setCurrentPage(pageNumber);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleEdit = (key) => {
    console.log("Edit student with key:", key);
    // Thực hiện logic chỉnh sửa ở đây
  };

  // const handleDelete = (key) => {#1A8369
  //   setStudents(students.filter((student) => student.key !== key));
  // };

  const handlerReload = () => {
    setLoading(true);
    getData();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
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
            // onClick={() => handleDelete(record.key)}
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
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Button type="link">Previous</Button>;
    }
    if (type === "next") {
      return <Button type="link">Next</Button>;
    }
    return originalElement;
  };
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
          dataSource={dataSource}
          bordered
          columns={columns}
          rowKey={"id"}
          scroll={{ x: "max-content" }}
          pagination={false}
          loading={loadingData}
        />
        {dataSource.length > 0 ? (
          <Pagination
            style={{ float: "right", marginTop: "20px" }}
            total={totalRows}
            defaultCurrent={currentPage}
            pageSize={limitUser}
            onChange={(e) => onChange(e)}
            current={currentPage}
            itemRender={itemRender}
            showQuickJumper
            responsive={true}
          />
        ) : (
          <></>
        )}
      </Box>
      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
}

export default ListStudent;
