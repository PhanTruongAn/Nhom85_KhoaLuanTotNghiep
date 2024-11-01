import React, { useState, useMemo } from "react";
import { Table, Space } from "antd";
import { Box, Button, Typography } from "@mui/material";
import {
  EditOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import SearchComponent from "../../../../components/SearchComponent/search";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import CreateGroupModal from "./CreateGroupModal";
import UpdateGroupModal from "./UpdateGroupModal";

const ListGroupStudentLecturer = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const data = {
    totalRows: 5,
    groupStudent: [
      {
        id: 1,
        groupName: "001",
        numOfMembers: 2,
        students: [
          {
            id: 34,
            fullName: "Điểu Phan Quang Dũng",
            username: "20093921",
            isLeader: true,
          },
          {
            id: 35,
            fullName: "Phan Trường An",
            username: "20085191",
            isLeader: false,
          },
        ],
        topic: {
          id: 2,
          title: "Xây dựng các ứng dụng thông minh trên nền tảng Blockchain",
        },
      },
      {
        id: 2,
        groupName: "002",
        numOfMembers: 2,
        students: [
          { id: 36, fullName: "Lê Thị H", username: "SV008", isLeader: false },
          {
            id: 44,
            fullName: "Nguyễn Văn A",
            username: "SV001",
            isLeader: true,
          },
        ],
        topic: {
          id: 1,
          title: "Chương trình hỗ trợ đào tạo sinh viên trường đại học",
        },
      },
      // Additional hardcoded data...
    ],
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);
  const handleOpenUpdateModal = (group) => {
    setSelectedGroup(group);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const onSearch = (value) => setSearchValue(value);

  const filteredGroups = useMemo(() => {
    return data.groupStudent.filter((group) => {
      const groupNameMatch = group.groupName
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const topicTitleMatch = group.topic?.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return groupNameMatch || topicTitleMatch;
    });
  }, [searchValue, data.groupStudent]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      sorter: (a, b) => a.groupName.localeCompare(b.groupName),
    },
    {
      title: "Tên Đề Tài",
      key: "topicName",
      render: (record) => record.topic?.title || "Chưa có đề tài",
    },
    {
      title: "Số lượng thành viên",
      key: "numOfMembers",
      render: (record) => `${record.students.length} / ${record.numOfMembers}`,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
            size="small"
            endIcon={<InfoCircleOutlined />}
            variant="outlined"
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={() => handleOpenUpdateModal(record)}
            size="small"
            endIcon={<EditOutlined />}
            variant="contained"
            color="primary"
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ position: "relative" }}>
        <SearchComponent
          placeholder="Tìm theo tên nhóm hoặc tên đề tài"
          onChange={onSearch}
        />
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Space>
            <Button
              variant="contained"
              onClick={handleOpenCreateModal}
              startIcon={<PlusOutlined />}
              size="medium"
            >
              Thêm mới
            </Button>
            <CustomButton text="Làm mới" type="refresh" />
          </Space>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center", marginY: 2 }}>
        Danh sách nhóm
      </Typography>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={filteredGroups}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: data.totalRows,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: true,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        locale={{
          emptyText: <EmptyData text="Không có dữ liệu!" />,
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
      />
    </Box>
  );
};

export default ListGroupStudentLecturer;
