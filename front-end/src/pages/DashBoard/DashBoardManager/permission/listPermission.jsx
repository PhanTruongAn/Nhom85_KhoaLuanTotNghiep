import { useState } from "react";
import { Table, Space, message, Select, Input, Tag, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Box, Typography, Button } from "@mui/material";
import AddModal from "./AddModal";
import UpdateModal from "./updateModal";
import CustomHooks from "../../../../utils/hooks";
import managerApi from "../../../../apis/managerApi";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import { useDebounce } from "@uidotdev/usehooks";
function ListPermission() {
  const [state, setState] = useState({
    searchLoading: false,
    currentPage: 1,
    pageSize: 5,
    dataSource: [],
    loadingData: false,
    objectSelect: {},
    refreshButton: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  //Fetch All Permission
  const fetchPermissions = async () => {
    updateState({ loadingData: true });
    const response = await managerApi.getAllPermission();
    if (response && response.status === 0) {
      updateState({
        dataSource: response.data,
        loadingData: false,
        refreshButton: false,
      });
      // messageApi.success(response.message);
    } else {
      updateState({ dataSource: [], loadingData: false, refreshButton: false });
      messageApi.error(response.message);
    }
    return response;
  };
  const findByDescription = async () => {
    const response = await managerApi.findByDescription(searchValue);
    if (response && response.status === 0) {
      updateState({
        dataSource: response.data,
        loadingData: false,
        refreshButton: false,
      });
      messageApi.success(response.message);
    } else {
      updateState({ dataSource: [], loadingData: false, refreshButton: false });
      messageApi.error(response.message);
    }
    return response;
  };
  // useQuery to fetch data
  const { data, isFetching, refetch } = CustomHooks.useQuery(
    ["data", debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm) {
        return findByDescription();
      } else {
        return fetchPermissions();
      }
    }
  );

  // Làm mới dữ liệu
  const handleReload = () => {
    updateState({ refreshButton: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };

  const onPageChange = (pageNumber) => {
    updateState({ currentPage: pageNumber });
  };
  const onPopConfirmDelete = async (record) => {
    const user = {
      id: record.id,
    };
    const res = await managerApi.deleteById(user);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
      if (data.data % 10 === 1 || state.dataSource % 10 === 1)
        updateState({ currentPage: state.currentPage - 1 });
    } else {
      messageApi.error(res.message);
    }
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleEdit = (record) => {
    updateState({ objectSelect: record });
    setOpenUpdateModal(true);
  };
  // Select role
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    updateState({ currentPage: 1 });
  };
  // Lọc api theo role
  const filteredData = selectedRole
    ? state.dataSource.filter((item) =>
        item.apiPath.startsWith(`/${selectedRole.toLowerCase()}`)
      )
    : state.dataSource;

  const onCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Đường dẫn",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      render: (method) => {
        let color;
        switch (method) {
          case "GET":
            color = "green";
            break;
          case "POST":
            color = "gold";
            break;
          case "PUT":
            color = "blue";
            break;
          case "DELETE":
            color = "red";
            break;
          default:
            color = "default";
        }
        return (
          <Tag color={color} key={method}>
            {method}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEdit(record)}
            variant="contained"
            size="small"
            sx={[
              (theme) => ({
                marginLeft: "10px",

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
            title="Xóa quyền hạn"
            description="Bạn có chắc muốn xóa quyền hạn này?"
            onConfirm={() => onPopConfirmDelete(record)}
            // onCancel={onPopConfirmCancel}
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
    <Box sx={{ padding: "10px" }}>
      {contextHolder}
      <Box
        className="row col-12"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          className="row col-6"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box className="col-3">
            <Select
              style={{ width: "100%" }}
              placeholder="Lọc theo vai trò"
              options={[
                { value: "MANAGER", label: "QUẢN LÝ" },
                { value: "LECTURER", label: "GIẢNG VIÊN" },
                { value: "STUDENT", label: "SINH VIÊN" },
                { value: "", label: "TẤT CẢ" },
              ]}
              onChange={handleRoleChange}
            />
          </Box>

          <Box className="col-3" sx={{ flexGrow: 1 }}>
            <Input
              placeholder="Tìm theo mô tả"
              value={searchValue} // Gán giá trị từ state
              onChange={onInputChange} // Gọi hàm khi người dùng nhập dữ liệu
              suffix={
                <SearchOutlined
                  style={{
                    color: "rgba(0,0,0,.45)",
                  }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="row col-4">
          <Space>
            <Button
              size="small"
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              Thêm mới quyền hạn
            </Button>
            <CustomButton
              onClick={handleReload}
              loading={state.refreshButton}
              text="Làm mới"
              type="refresh"
            />
          </Space>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
        <Typography variant="h4" component="h2">
          Danh sách quyền hạn
        </Typography>
      </Box>

      <Table
        bordered
        // dataSource={data && data.data ? data.data : state.dataSource}
        dataSource={filteredData}
        columns={columns}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={{
          current: state.currentPage,
          pageSize: state.pageSize,
          onChange: onPageChange,
          responsive: true,
        }}
        loading={state.loadingData}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : state.dataSource ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : null}
            </Box>
          ),
        }}
      />

      <AddModal isOpen={open} onClose={handleCloseModal} refetch={refetch} />
      <UpdateModal
        isOpen={openUpdateModal}
        objectSelect={state.objectSelect}
        onClose={onCloseUpdateModal}
        getData={refetch}
      />
    </Box>
  );
}

export default ListPermission;
