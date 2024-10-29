import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import { Select, Table, Tag, message, Input } from "antd";
import CustomHooks from "../../../../utils/hooks";
import managerApi from "../../../../apis/managerApi";
import CustomButton from "../../../../components/Button/CustomButton";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { isEmpty } from "lodash";

function RolePermission() {
  const [state, setState] = useState({
    dataSource: [], // Dữ liệu gốc sau khi lấy từ server
    filteredData: [], // Dữ liệu đã được lọc
    currentPage: 1,
    pageSize: 5,
    loadingData: false,
    searchValue: "",
    searchLoading: false,
    loadingSuccess: false,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  // Fetch data permissions
  const fetchPermission = async () => {
    updateState({ loadingData: true });
    const res = await managerApi.getAllPermission();
    return res;
  };

  const { data, isSuccess, refetch } = CustomHooks.useQuery(
    ["data1"],
    fetchPermission,
    {
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            dataSource: res.data, // Lưu toàn bộ dữ liệu
            filteredData: res.data, // Khởi tạo filteredData giống với dataSource
            loadingData: false,
          });
        } else {
          updateState({ dataSource: [], loadingData: false });
          messageApi.error(res.message);
        }
      },
    }
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Hiển thị quyền hạn đã được gán theo role đã chọn
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
    setSelectedRole(value);
  };

  const onPageChange = (pageNumber) => {
    updateState({ currentPage: pageNumber });
  };

  // Sự kiện input search: Lọc dữ liệu ngay khi thay đổi giá trị
  const onInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    updateState({ searchValue: value });

    const filterData = state.dataSource.filter((item) =>
      item.description.toLowerCase().includes(value)
    );

    if (filterData.length > 0) {
      updateState({ filteredData: filterData });
    } else {
      updateState({ filteredData: [] });
    }
  };

  const buildDataToSave = () => {
    const result = {};
    result.roleId = selectedRole;
    result.permissions = selectedRowKeys.map((item) => {
      return { roleId: selectedRole, permissionId: item };
    });
    return result;
  };

  const handleSubmit = async () => {
    updateState({ loadingSuccess: true });
    const data = buildDataToSave();
    const res = await managerApi.assignPermissions(data);
    if (res && res.status === 0) {
      updateState({ loadingSuccess: false });
      messageApi.success(res.message);
    } else {
      updateState({ loadingSuccess: false });
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
      dataIndex: "id",
      key: "id",
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
        return <Tag color={color}>{method}</Tag>;
      },
    },
  ];

  return (
    <Box>
      {contextHolder}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, padding: "10px", textAlign: "center" }}
      >
        Gán quyền hạn
      </Typography>
      <Box className="row col-6" sx={{ padding: "10px" }}>
        <Box className="col-3">
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn vai trò"
            options={[
              { value: "1", label: "STUDENT" },
              { value: "2", label: "LECTURER" },
              { value: "3", label: "MANAGER" },
            ]}
            onChange={handleRoleChange} // Gọi hàm khi thay đổi
          />
        </Box>
        <Box className="col-3" sx={{ flexGrow: 1 }}>
          <Input
            placeholder="Tìm theo mô tả"
            value={state.searchValue} // Gán giá trị từ state
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={"id"}
        dataSource={state.filteredData} // Dữ liệu đã lọc
        pagination={{
          current: state.currentPage,
          pageSize: state.pageSize,
          onChange: onPageChange,
          responsive: true,
        }}
        loading={state.loadingData}
        locale={{
          emptyText: isEmpty(state.dataSource) ? (
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
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width={"100%"}
              height={"auto"}
            >
              <EmptyData text="Không có dữ liệu" />
            </Box>
          ),
        }}
      />
      <CustomButton
        onClick={handleSubmit}
        text="Gán quyền"
        loading={state.loadingSuccess}
        type="success"
      />
    </Box>
  );
}

export default RolePermission;
