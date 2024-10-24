import React, { useState } from "react";
import { Table, Space, message, Input, Select, Popconfirm } from "antd";
import { Box, Button, Typography } from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CreateGroupModal from "./CreateGroupModal";
import UpdateGroupModal from "./UpdateGroupModal";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import CustomHooks from "../../../../utils/hooks";
import { formatDate } from "../../../../utils/formatDate";
const { Search } = Input;
const { Option } = Select;
import { InfoCircleOutlined } from "@ant-design/icons";
import managerApi from "../../../../apis/managerApi";
const ListGroupStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openCreateModal, setOpenCreateModal] = useState(false);
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

  // useQuery to fetch data
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

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

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
  };
  const onChangePage = (pageNumber) => {
    if (!pages.includes(pageNumber)) {
      pages.push(pageNumber);
      updateState({ loadingData: true });
    }
    updateState({ currentPage: pageNumber });
  };

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
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
    },
    {
      title: "Tên Đề Tài", // Thay đổi tiêu đề cột
      key: "topicName",
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
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
            variant="contained"
            size="small"
            endIcon={<EditOutlined />}
            sx={{ marginLeft: "10px" }}
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
              sx={{ marginLeft: "10px" }}
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box
          className="col-4"
          sx={{
            float: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            placeholder="Tìm theo tên nhóm hoặc tên đề tài"
            enterButton
            loading={state.searchLoading}
          />
        </Box>
        <Space>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={handleOpenCreateModal}
          >
            Thêm mới
          </Button>
          <CustomButton
            onClick={onRefreshData}
            text={"Làm mới"}
            type="refresh"
            loading={state.refreshButton}
          />
        </Space>
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
          variant="h4"
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
        dataSource={
          groupsData ? groupsData.data?.groupStudent : state.dataSource
        }
        rowKey="id"
        loading={state.loadingData}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onShowSizeChange: (current, size) => handlePageSizeChange(size),
          total: groupsData ? groupsData.data?.totalRows : state.totalRows,
          current: state.currentPage,
          pageSize: state.pageSize,
          onChange: onChangePage,
          responsive: true,
        }}
        locale={{
          emptyText:
            state.dataSource.length === 0 ? (
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
                ) : state.dataSource.length === 0 ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : null}
              </Box>
            ) : null,
        }}
      />

      <CreateGroupModal
        isOpen={openCreateModal}
        onClose={handleCloseCreateModal}
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
