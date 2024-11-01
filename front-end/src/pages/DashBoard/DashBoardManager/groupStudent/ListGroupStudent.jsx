import React, { useState, useMemo } from "react";
import { Table, Space, message, Input, Select, Popconfirm } from "antd";
import { Box, Button, Typography } from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import UpdateGroupModal from "./UpdateGroupModal";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import CustomHooks from "../../../../utils/hooks";
import SearchComponent from "../../../../components/SearchComponent/search";
const { Option } = Select;
import { InfoCircleOutlined } from "@ant-design/icons";
import managerApi from "../../../../apis/managerApi";
const ListGroupStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pages, setPages] = useState([1]);
  const [state, setState] = useState({
    searchLoading: false,
    currentPage: 1,
    pageSize: 5,
    dataSource: [],
    loadingData: false,
    searchValue: "",
    objectSelect: {},
    totalRows: null,
    refreshButton: false,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Get Groups Student Data
  const {
    data: groupsData,
    isFetching,
    refetch,
  } = CustomHooks.useQuery(
    ["groupStudent", state.currentPage, state.pageSize],
    () => managerApi.getGroupsStudent(state.currentPage, state.pageSize),
    {
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            refreshButton: false,
            dataSource: res.data.groupStudent,
            totalRows: res.data.totalRows,
            loadingData: false,
          });
        } else {
          updateState({
            refreshButton: false,
            dataSource: [],
            loadingData: false,
          });
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        updateState({
          dataSource: [],
          loadingData: false,
          refreshButton: false,
        });
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );

  const handleOpenUpdateModal = (group) => {
    setSelectedGroup(group);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedGroup(null);
  };

  const onPopConfirmDelete = async (record) => {
    const res = await managerApi.deleteGroupStudent(record);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };
  const handlePageSizeChange = (newPageSize) => {
    updateState({
      loadingData: true,
      pageSize: newPageSize,
      currentPage: 1,
    });
  };
  const handleDeleteMany = () => {
    message.success(`Deleted groups: ${selectedRowKeys.join(", ")}`);
  };

  const onSearch = (value) => {
    setSearchValue(value);
    // Thực hiện tìm kiếm nếu cần
  };

  const onRefreshData = () => {
    updateState({ refreshButton: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  const onChangePage = (pageNumber) => {
    if (!pages.includes(pageNumber)) {
      pages.push(pageNumber);
      updateState({ loadingData: true });
    }
    updateState({ currentPage: pageNumber });
  };
  const filteredGroups = useMemo(() => {
    const sourceData =
      groupsData && groupsData.data
        ? groupsData.data.groupStudent
        : state.dataSource;
    return sourceData.filter((group) => {
      const groupNameMatch = group.groupName
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const topicTitleMatch = group.topic?.title
        .toLowerCase()
        .includes(searchValue.toLowerCase()); // Kiểm tra tên đề tài

      return groupNameMatch || topicTitleMatch; // Trả về true nếu tìm thấy theo tên nhóm hoặc tên đề tài
    });
  }, [searchValue, state.dataSource]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      width: "100px",
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
    },
    {
      title: "Tên Đề Tài", // Thay đổi tiêu đề cột
      key: "topicName",
      width: "500px",
      render: (record) => record.topic?.title || "Chưa có đề tài",
    },
    {
      title: "Số lượng thành viên",
      key: "createdAt",
      render: (record) => record.students.length + "/" + record.numOfMembers,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
            variant="outlined"
            size="small"
            endIcon={<InfoCircleOutlined />}
            sx={{ textTransform: "none" }}
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
            variant="contained"
            size="small"
            endIcon={<EditOutlined />}
            sx={[
              (theme) => ({
                textTransform: "none",
                marginLeft: "10px",
                ...theme.applyStyles("light", {
                  backgroundColor: "#FF993A",
                }),
                ...theme.applyStyles("dark", {
                  backgroundColor: "#1DA57A",
                }),
              }),
            ]}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa nhóm"
            description="Bạn có chắc muốn xóa nhóm này?"
            onConfirm={(e) => onPopConfirmDelete(record)}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              endIcon={<DeleteOutlined />}
              sx={{ marginLeft: "10px", textTransform: "none" }}
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
      <Box sx={{ position: "relative" }}>
        <SearchComponent
          placeholder="Tìm theo tên nhóm hoặc tên đề tài"
          onChange={(group) => setSearchValue(group)}
        />

        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CustomButton
            onClick={onRefreshData}
            text={"Làm mới dữ liệu"}
            type="refresh"
            loading={state.refreshButton}
          />
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "10px",
          display: "flex",
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
          variant="h5"
          component="h2"
          gutterBottom
        >
          Danh sách nhóm
        </Typography>
      </Box>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        bordered
        columns={columns}
        dataSource={filteredGroups}
        rowKey="id"
        loading={state.loadingData}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onShowSizeChange: (current, size) => handlePageSizeChange(size),
          total: searchValue
            ? filteredGroups.length
            : groupsData
            ? groupsData.data?.totalRows
            : state.totalRows, // Cập nhật giá trị total
          current: state.currentPage,
          pageSize: state.pageSize,
          onChange: onChangePage,
          responsive: true,
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredGroups ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : null}
            </Box>
          ),
        }}
      />

      <UpdateGroupModal
        groupSelect={selectedGroup}
        isOpen={openUpdateModal}
        closeModal={handleCloseUpdateModal}
        onCancel={handleCloseUpdateModal}
      />
    </Box>
  );
};

export default ListGroupStudent;
