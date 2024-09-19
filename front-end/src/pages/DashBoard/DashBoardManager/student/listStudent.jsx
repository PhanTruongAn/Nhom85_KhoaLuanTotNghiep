import React, { useState, useEffect } from "react";
import { Table, Space, message, Pagination, Popconfirm, Select } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons"; // Thêm biểu tượng UserOutlined
import { toast } from "react-toastify";
import { Box, Typography, Button, Input } from "@mui/material";
// import AddModal from "./AddModal";
import studentApi from "../../../../apis/studentApi";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../../../components/Dashboard/updateModal";
import CreateModal from "../../../../components/Dashboard/createModal";
import { useQuery } from "react-query";

const { Option } = Select;

function ListStudent() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [limitUser, setLimitUser] = useState(5);
  const [totalRows, setTotalRows] = useState();
  const [totalPages, setTotalPages] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [userSelect, setUserSelect] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["students", currentPage],
    () => studentApi.getAll(currentPage, limitUser),
    {
      keepPreviousData: true,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setDataSource(res.data.students);
          setTotalRows(res.data.totalRows);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        } else if (res.status === -1 || res.status === 403) {
          setLoading(false);
          setDataSource([]);
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
  const handleOpenModal = () => {
    setOpen(true);
  };
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const showUpdateModal = (record) => {
    setUserSelect(record);
    setOpenUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const onPopConfirmDelete = async (record) => {
    const user = {
      id: record.id,
    };
    const res = await studentApi.deleteById(user);
    if (res && res.status === 0) {
      refetch();
      messageApi.success(res.message);
      if (dataSource.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (res.EC === -1) {
      messageApi.error(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const handlerReload = () => {
    setLoading(true);
    refetch();
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    // selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
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
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
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
            onClick={(e) => showUpdateModal(record)}
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
          <Popconfirm
            title="Xóa sinh viên"
            description="Bạn có chắc muốn xóa sinh viên này?"
            onConfirm={(e) => onPopConfirmDelete(record)}
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
              startIcon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
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
      <Box
        className="col-6"
        sx={{
          float: "left",
        }}
      >
        <Space>
          <Input
            placeholder="Tìm kiếm"
            sx={[
              (theme) => ({
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "0 5px",
                ...theme.applyStyles("dark", {
                  boxShadow: "0 2px 4px #1DA57A",
                  background: "#F6FFED",
                  color: "#000",
                }),
              }),
            ]}
          />

          <Select placeholder="Tìm kiếm theo">
            <Option value="fullName">Tên đầy đủ</Option>
            <Option value="username">Mã sinh viên</Option>
          </Select>
        </Space>
      </Box>
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
          rowSelection={rowSelection}
          dataSource={data ? data.data.students : []}
          bordered
          pagination={false}
          columns={columns}
          rowKey={"id"}
          scroll={{ x: "max-content" }}
          loading={isFetching}
        />
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
      </Box>
      <CreateModal
        isOpen={open}
        onClose={handleCloseModal}
        getData={refetch}
        isStudent={true}
      />
      <UpdateModal
        userSelect={userSelect}
        isOpen={openUpdateModal}
        closeModal={closeUpdateModal}
        onCancel={closeUpdateModal}
        getData={refetch}
        isStudent={true}
      />
    </Box>
  );
}

export default ListStudent;
