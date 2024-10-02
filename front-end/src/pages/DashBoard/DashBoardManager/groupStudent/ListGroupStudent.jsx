import React, { useState } from "react";
import { Table, Space, message, Input, Select, Button as button } from "antd";
import { Box, Button, Typography } from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CreateGroupModal from "./CreateGroupModal";
import UpdateGroupModal from "./UpdateGroupModal";
import EmptyData from "../../../../components/emptydata/EmptyData";

const { Search } = Input;
const { Option } = Select;

const data = [
  {
    id: 1,
    groupName: "Nhóm 1",
    topicId: "topic_001",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 2,
    groupName: "Nhóm 2",
    topicId: "topic_002",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-21T13:30:00Z",
  },
  {
    id: 3,
    groupName: "Nhóm 3",
    topicId: "topic_001",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 4,
    groupName: "Nhóm 4",
    topicId: "topic_002",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-21T13:30:00Z",
  },
  {
    id: 5,
    groupName: "Nhóm 5",
    topicId: "topic_001",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 6,
    groupName: "Nhóm 6",
    topicId: "topic_002",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-21T13:30:00Z",
  },
];

const ListGroupStudent = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const handleDeleteGroup = (id) => {
    message.success(`Deleted group with ID: ${id}`);
  };

  const handleDeleteMany = () => {
    message.success(`Deleted groups: ${selectedRowKeys.join(", ")}`);
  };

  const onSearch = (value) => {
    setSearchValue(value);
    // Thực hiện tìm kiếm nếu cần
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
    },
    {
      title: "Topic ID",
      dataIndex: "topicId",
      key: "topicId",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
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
            startIcon={<EyeOutlined />}
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search
            placeholder="Nhập thông tin"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            enterButton
            style={{ marginRight: "10px" }}
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
          <Button variant="contained" startIcon={<ReloadOutlined />}>
            Làm mới
          </Button>
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
      {data.length > 0 ? (
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          columns={columns}
          dataSource={data}
          rowKey="id"
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          pagination={{
            pageSize: 5,
          }}
        />
      ) : (
        <Table
          style={{
            padding: "10px",
            borderRadius: "8px",
            height: "400px",
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="dataIndex"
          locale={{
            emptyText: (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                paddingTop={"50px"}
                style={{ height: "100%" }}
              >
                <EmptyData />
              </Box>
            ),
          }}
        />
      )}
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
