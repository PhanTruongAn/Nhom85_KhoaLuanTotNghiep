import React, { useState, useMemo } from "react";
import { Table, Space, message } from "antd";
import { Box, Button, Typography } from "@mui/material";
import {
  EditOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import SearchComponent from "../../../../components/SearchComponent/search";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import UpdateGroupModal from "./UpdateGroupModal";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomHooks from "../../../../utils/hooks";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
const ListGroupStudentLecturer = () => {
  const user = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  // Get Group Data
  const getGroups = async () => {
    let termId = currentTerm.id;
    let lecturerId = user.id;
    const res = await lecturerApi.getMyGroupStudent(termId, lecturerId);
    return res;
  };

  const {
    isFetching,
    data: groupData,
    refetch,
  } = CustomHooks.useQuery(["my-group-topic"], getGroups, {
    enabled: !isEmpty(currentTerm),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        setData(res.data);
        if (isEmpty(groupData)) {
          messageApi.success(res.message);
        }
      } else {
        setData([]);
        messageApi.error(res.message);
      }
    },
    onError: (err) => {
      setData([]);
      messageApi.error("Lỗi khi lấy dữ liệu!");
      // setRefresh(false);
    },
  });

  const handleOpenUpdateModal = (group) => {
    setSelectedGroup(group);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const onSearch = (value) => setSearchValue(value);

  const filteredGroups = useMemo(() => {
    const sourceData = groupData && groupData.data ? groupData.data : data;
    return sourceData.filter((group) => {
      const groupNameMatch = group.groupName
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const topicTitleMatch = group.topic?.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return groupNameMatch || topicTitleMatch;
    });
  }, [searchValue, data]);

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
        <Button
          onClick={() => handleOpenUpdateModal(record)}
          size="small"
          endIcon={<EditOutlined />}
          variant="contained"
          color="primary"
          sx={[
            (theme) => ({
              textTransform: "none",
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
      ),
    },
  ];
  const onRefresh = () => {
    setLoadingRefresh(true);
    refetch();
    setTimeout(() => {
      setLoadingRefresh(false);
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
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
          <CustomButton
            text="Làm mới"
            type="refresh"
            onClick={onRefresh}
            loading={loadingRefresh}
          />
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
          pageSizeOptions: ["5", "10", "20"],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : filteredGroups ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
        }}
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
