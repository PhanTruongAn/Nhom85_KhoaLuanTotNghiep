import React, { useState, useEffect } from "react";
import { Table, Space, message, Pagination, Select, Input, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Box, Typography, Button } from "@mui/material";
import AddModal from "./addModal";
import studentApi from "../../../../apis/studentApi";
import { useQuery } from "react-query";
import managerApi from "../../../../apis/managerApi";
const { Search } = Input;
function ListPermission() {
  const [state, setState] = useState({
    searchLoading: false,
    currentPage: 1,
    pageSize: 5,
    dataSource: [],
    loadingData: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  //Fetch All Permission
  const fetchPermissions = async () => {
    updateState({ loadingData: true });
    const response = await managerApi.getAllPermission();
    if (response && response.status === 0) {
      updateState({ dataSource: response.data, loadingData: false });
      messageApi.success(response.message);
    } else {
      updateState({ dataSource: [], loadingData: false });
      messageApi.error(response.message);
    }
    return response;
  };
  // useQuery to fetch data
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["data"],
    fetchPermissions,
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được coi là mới trong 5 phút
      cacheTime: 1000 * 60 * 10, // Dữ liệu sẽ được cache trong 10 phút
      refetchOnWindowFocus: false, // Không fetch lại khi quay lại tab
    }
  );

  // Làm mới dữ liệu
  const handleReload = () => {
    updateState({ loadingDta: true });
    refetch();
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
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
  return (
    <Box sx={{ padding: "20px" }}>
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
          className="row col-8"
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
              ]}
            />
          </Box>

          <Box className="col-5" sx={{ flexGrow: 1 }}>
            <Search
              placeholder="Nhập thông tin"
              // onSearch={onSearch}
              onChange={(e) => setSearchValue(e.target.value)}
              enterButton
              loading={state.searchLoading}
            />
          </Box>
        </Box>
        <Box className="row col-4">
          <Space>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              Thêm mới
            </Button>
            <Button
              onClick={handleReload}
              variant="contained"
              startIcon={<ReloadOutlined />}
            >
              Làm mới
            </Button>
          </Space>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
        <Typography variant="h4" component="h2">
          Danh sách quyền hạn
        </Typography>
      </Box>

      {/* Bảng danh sách sinh viên */}
      <Table
        bordered
        dataSource={data && data.data ? data.data : state.dataSource}
        columns={columns}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: state.pageSize,
          // onChange: onChangePage,
          responsive: true,
        }}
        loading={state.loadingData}
      />

      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
}

export default ListPermission;
