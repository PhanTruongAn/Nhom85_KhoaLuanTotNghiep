import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Select, Table, Tag, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import managerApi from "../../../../apis/managerApi";
function RolePermission() {
  const [state, setState] = useState({
    dataSource: [],
    currentPage: 1,
    pageSize: 5,
    loadingData: false,
  });
  // Update states
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null); // Thêm state để lưu giá trị đã chọn

  // Fetch data permissions
  const fetchPermission2 = async () => {
    updateState({ loadingData: true });
    const res = await managerApi.getAllPermission();
    if (res && res.status === 0) {
      updateState({ dataSource: res.data, loadingData: false });
    } else {
      updateState({ dataSource: [], loadingData: false });
      messageApi.error(res.message);
    }
  };
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["data"],
    fetchPermission2,
    {
      keepPreviousData: true,
      // staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được coi là mới trong 5 phút
      cacheTime: 1000 * 60 * 10, // Dữ liệu sẽ được cache trong 10 phút
      refetchOnWindowFocus: false, // Không fetch lại khi quay lại tab
      staleTime: 1000,
    }
  );
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRoleChange = async (value) => {
    setSelectedRole(parseInt(value));
    updateState({ loadingData: true, currentPage: 1 });
    const data = {
      id: parseInt(value),
    };
    const res = await managerApi.getRolePermissions(data);
    if (res && res.status === 0) {
      if (res.data.length > 0) {
        updateState({ loadingData: false });
        messageApi.success(res.message);
        onSelectChange(res.data);
      } else {
        updateState({ loadingData: false });
        onSelectChange(res.data);
        messageApi.warning(res.message);
      }
    } else {
      updateState({ loadingData: false });
      messageApi.error(res.message);
    }
    setSelectedRole(value); // Cập nhật giá trị đã chọn
  };

  const onPageChange = (pageNumber) => {
    updateState({ currentPage: pageNumber });
  };

  // Tạo đối tượng để gán quyền
  const buildDataToSave = () => {
    const result = {};
    result.roleId = selectedRole;
    result.permissions = selectedRowKeys.map((item) => {
      let data = { roleId: selectedRole, permissionId: item };
      return data;
    });

    return result;
  };
  const handleSubmit = async () => {
    updateState({ loadingData: true });
    const data = buildDataToSave();
    const res = await managerApi.assignPermissions(data);
    if (res && res.status === 0) {
      updateState({ loadingData: false });
      messageApi.success(res.message);
    } else {
      updateState({ loadingData: false });
      messageApi.error(res.message);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  const columns = [
    {
      title: "Mã quyền",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Đường dẫn",
      dataIndex: "apiPath",
      key: "apiPath",
    },
    {
      title: "Giải thích",
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
  ];

  return (
    <Box>
      {contextHolder}
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, padding: "10px" }}
        >
          Chọn quyền
        </Typography>
      </Box>
      <Box sx={{ width: 400, padding: "10px" }}>
        <Select
          style={{ width: "100%" }}
          placeholder="Chọn quyền"
          options={[
            { value: "1", label: "STUDENT" },
            { value: "2", label: "LECTURER" },
            { value: "3", label: "MANAGER" },
            { value: "", label: "TẤT CẢ" },
          ]}
          onChange={handleRoleChange} // Gọi hàm khi thay đổi
        />
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={"id"}
          dataSource={state.dataSource} // Sử dụng dữ liệu đã lọc
          pagination={{
            current: state.currentPage,
            pageSize: state.pageSize,
            onChange: onPageChange,
            responsive: true,
          }}
          loading={state.loadingData}
        />
      </Box>
      <Box sx={{ padding: "0px 0px 0px 10px" }}>
        <Button variant="contained" onClick={handleSubmit}>
          <CheckOutlined style={{ marginRight: "5px" }} />
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}

export default RolePermission;
