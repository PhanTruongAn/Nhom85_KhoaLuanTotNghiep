import React, { useState, useEffect } from "react";
import { Table, Space, message, Popconfirm, Select, Input } from "antd";
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
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomHooks from "../../../../utils/hooks";
import CustomButton from "../../../../components/Button/CustomButton";
import { useDebounce } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";
import SearchComponent from "../../../../components/SearchComponent/search";
const { Option } = Select;

function ListStudent() {
  const navigate = useNavigate();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
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
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const [state, setState] = useState({
    searchLoading: false,
  });
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const { data, isSuccess, isFetching, refetch } = CustomHooks.useQuery(
    ["students", currentPage, debouncedSearchTerm, limitUser, currentTerm.id],
    () => {
      if (debouncedSearchTerm) {
        return handleFindStudent();
      } else {
        return studentApi.getAll(currentPage, limitUser, currentTerm?.id);
      }
    },

    {
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
  const handleFindStudent = async () => {
    const res = await studentApi.findByUserNameOrFullName(searchValue);
    return res;
  };
  const handleCloseModal = () => {
    setOpen(false);
    if (
      currentPage === totalPages &&
      dataSource.length === (limitUser == 5 ? 5 : limitUser == 10 ? 10 : 20)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (
      currentPage === totalPages &&
      dataSource.length < (limitUser == 5 ? 5 : limitUser == 10 ? 10 : 20)
    ) {
      setCurrentPage(currentPage);
    } else if (
      currentPage < totalPages &&
      data.data.totalRows %
        (limitUser == 5 ? 5 : limitUser == 10 ? 10 : 20 !== 0)
    ) {
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
      termId: currentTerm.id,
    };
    const res = await studentApi.deleteById(user);
    if (res && res.status === 0) {
      refetch();
      messageApi.success(res.message);
      if (dataSource.length === 1 && totalPages !== 1) {
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
    let dataDelete = { studentId: selectedRowKeys, termId: currentTerm.id };
    const res = await studentApi.deleteMany(dataDelete);
    if (res && res.status === 0) {
      refetch();

      if (selectedRowKeys.length === dataSource.length && totalPages !== 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
      setSelectedRowKeys([]);
      messageApi.success(res.message);
    } else {
      messageApi.error(res.message);
    }
  };
  const handlePageSizeChange = (newPageSize) => {
    setLimitUser(newPageSize);
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
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}

      <SearchComponent placeholder="Tìm theo mã sinh viên hoặc họ tên sinh viên" />
      {/* <Search
          placeholder="Tìm theo mã sinh viên hoặc họ tên sinh viên"
          onChange={(e) => setSearchValue(e.target.value)}
          enterButton
          loading={state.searchLoading}
        /> */}

      <Box sx={{ float: "right" }}>
        <Space>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            Thêm mới sinh viên
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
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            onShowSizeChange: (current, size) => handlePageSizeChange(size),
            total: totalRows,
            current: currentPage,
            pageSize: limitUser,
            onChange: onChange,
            showQuickJumper: true,
            responsive: true,
          }}
          columns={columns}
          rowKey={"id"}
          scroll={{ x: "max-content" }}
          loading={isFetching}
          locale={{
            emptyText: (
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
                ) : dataSource.length === 0 ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : null}
              </Box>
            ),
          }}
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
