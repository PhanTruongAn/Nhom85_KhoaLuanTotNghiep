import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  message,
  Pagination,
  Popconfirm,
  Select,
  Input,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Box, Typography, Button } from "@mui/material";
import CreateModal from "../../../../components/Dashboard/createModal";
import lecturerApi from "../../../../apis/lecturerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateModal from "../../../../components/Dashboard/updateModal";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { useQuery } from "react-query";
import CustomButton from "../../../../components/Button/CustomButton";
const { Option } = Select;
const { Search } = Input;
function ListLecturer() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
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
  const [listRole, setListRole] = useState();
  const [state, setState] = useState({
    searchLoading: false,
  });
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["lecturers", currentPage],
    () =>
      searchValue
        ? lecturerApi.findByUserName(currentPage, limitUser, searchValue)
        : lecturerApi.getAll(currentPage, limitUser),
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setDataSource(res.data.lecturers);
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
  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    const res = await lecturerApi.getRoles();
    if (res && res.status === 0) {
      setListRole(res.data);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    if (currentPage === totalPages && dataSource.length === 5) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === totalPages && dataSource.length < 5) {
      setCurrentPage(currentPage);
    } else if (currentPage < totalPages && totalRows % 10 !== 0) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(totalPages + 1);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handlerReload = () => {
    setLoading(true);
    refetch();
  };

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onSearch = async (value, _e, info) => {
    if (value) {
      updateState({ searchLoading: true });
      const res = await lecturerApi.findByUserName(1, limitUser, value);
      if (res && res.status === 0 && res.data) {
        setCurrentPage(1);
        messageApi.success(res.message);
        setDataSource(res.data.lecturers);
        setTotalRows(res.data.totalRows);
        setTotalPages(res.data.totalPages);
        updateState({ searchLoading: false });
      } else {
        updateState({ searchLoading: false });
        messageApi.error(res.message);
      }
    } else {
      messageApi.error("Hãy nhập dữ liệu tìm kiếm!");
    }
  };

  const showUpdateModal = (record) => {
    setUserSelect(record);
    setOpenUpdateModal(true);
  };
  const handleDeleteMany = async () => {
    const res = await lecturerApi.deleteMany(selectedRowKeys);
    if (res && res.status === 0) {
      refetch();

      if (selectedRowKeys.length === dataSource.length) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
      setSelectedRowKeys([]);
      messageApi.success(res.message);
    } else {
      messageApi.error(res.message);
    }
  };
  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const onPopConfirmDelete = async (record) => {
    const user = {
      id: record.id,
    };
    const res = await lecturerApi.deleteById(user);
    // console.log("Res:", res);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
      if (dataSource.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } else if (res.EC === -1) {
      messageApi.error(res.message);
    } else {
      toast.error(res.message);
    }
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
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Button type="link">Previous</Button>;
    }
    if (type === "next") {
      return <Button type="link">Next</Button>;
    }
    return originalElement;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã số giảng viên",
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
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => showUpdateModal(record)}
            sx={[
              (theme) => ({
                marginLeft: "10px",
                textTransform: "none",
                ...theme.applyStyles("dark", {
                  background: "#1DA57A",
                }),
              }),
            ]}
            endIcon={<EditOutlined />}
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
              // onClick={(e) => showUpdateModal(record)}
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
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
      <Box
        className="col-4"
        sx={{
          float: "left",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Thay đổi hướng flex
          alignItems: "flex-start", // Căn chỉnh các phần tử
        }}
      >
        <Space>
          <Search
            placeholder="Nhập thông tin"
            onSearch={onSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            enterButton
            loading={state.searchLoading}
          />

          <Select
            placeholder="Tìm kiếm theo"
            style={{ width: "100%", marginTop: { xs: "8px", sm: "0" } }}
          >
            <Option value="fullName">Tên đầy đủ</Option>
            <Option value="username">Mã giảng viên</Option>
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
            Thêm mới giảng viên
          </Button>
          <CustomButton
            onClick={handlerReload}
            loading={loading}
            text="Làm mới"
            type="refresh"
          />
        </Space>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "50px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{
            marginRight: "10px",
            display: selectedRowKeys.length === 0 ? "none" : "",
          }}
          startIcon={<DeleteOutlined />}
          onClick={handleDeleteMany}
        >
          Xóa nhiều
        </Button>
        <Typography
          sx={{
            flex: 1, // Để tiêu đề chiếm không gian còn lại
            textAlign: "center", // Căn giữa
          }}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Danh sách giảng viên
        </Typography>
      </Box>
      <Box>
        <Table
          rowSelection={rowSelection}
          // dataSource={data ? data.data.lecturers : []}
          dataSource={dataSource}
          bordered
          pagination={{
            total: totalRows,
            current: currentPage,
            pageSize: limitUser,
            onChange: onChange,
            showQuickJumper: true,
            itemRender: itemRender,
            responsive: true,
          }}
          columns={columns}
          rowKey={"id"}
          scroll={{ x: "max-content" }}
          loading={isFetching}
          locale={{
            emptyText:
              dataSource.length === 0 ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width={"100%"}
                  height={"auto"}
                >
                  <EmptyData />
                </Box>
              ) : null,
          }}
        />
      </Box>
      <CreateModal
        isOpen={open}
        onSubmit={handleCloseModal}
        onCancel={handleCancel}
        getData={refetch}
        isStudent={false}
        listRole={listRole}
      />
      <UpdateModal
        userSelect={userSelect}
        isOpen={openUpdateModal}
        closeModal={closeUpdateModal}
        onCancel={closeUpdateModal}
        getData={refetch}
        isStudent={false}
      />
    </Box>
  );
}

export default ListLecturer;
