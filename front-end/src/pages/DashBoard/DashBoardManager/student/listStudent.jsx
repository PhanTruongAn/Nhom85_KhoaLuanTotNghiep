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
  AudioOutlined,
} from "@ant-design/icons"; // Thêm biểu tượng UserOutlined
import { toast } from "react-toastify";
import { Box, Typography, Button } from "@mui/material";
// import AddModal from "./AddModal";
import studentApi from "../../../../apis/studentApi";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../../../components/Dashboard/updateModal";
import CreateModal from "../../../../components/Dashboard/createModal";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
const { Option } = Select;
const { Search } = Input;

function ListStudent() {
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
  const [state, setState] = useState({
    searchLoading: false,
  });
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["students", currentPage],
    () =>
      searchValue
        ? studentApi.findByUserName(currentPage, limitUser, searchValue)
        : studentApi.getAll(currentPage, limitUser),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được coi là mới trong 5 phút
      cacheTime: 1000 * 60 * 10, // Dữ liệu sẽ được cache trong 10 phút
      refetchOnWindowFocus: false, // Không fetch lại khi quay lại tab
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
        setLoading(false);
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
  const handleDeleteMany = async () => {
    const res = await studentApi.deleteMany(selectedRowKeys);
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
  const onSearch = async (value, _e, info) => {
    if (value) {
      updateState({ searchLoading: true });
      const res = await studentApi.findByUserName(1, limitUser, value);
      if (res && res.status === 0 && res.data) {
        setCurrentPage(1);
        messageApi.success(res.message);
        setDataSource(res.data.students);
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
        className="col-4"
        sx={{
          float: "left",
          display: "flex",
          alignItems: "center",
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
          Danh sách sinh viên
        </Typography>
      </Box>
      <Box>
        <Table
          rowSelection={rowSelection}
          // dataSource={data ? data.data.students : []}
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
        />
      </Box>

      <CreateModal
        isOpen={open}
        onSubmit={handleCloseModal}
        onCancel={handleCancel}
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
