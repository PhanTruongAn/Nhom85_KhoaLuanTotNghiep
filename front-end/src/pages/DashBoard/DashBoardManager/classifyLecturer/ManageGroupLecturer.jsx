import { useState } from "react";
import { Table, Space, Popconfirm, message } from "antd";
import { Box, Button, Typography } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UpdateGroupModalLecturer from "./UpdateGroupModalLecturer";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomHooks from "../../../../utils/hooks";
import managerApi from "../../../../apis/managerApi";

import { isEmpty } from "lodash";
const ManageGroupLecturer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [state, setState] = useState({
    page: 1,
    pageSize: 5,
    totalRow: null,
    totalPage: null,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const handleOpenUpdateModal = (group, isEditing = false) => {
    setSelectedGroup({ ...group, isEditing });
    setOpenUpdateModal(true);
  };
  const getGroupLecturer = async () => {
    let res = await managerApi.getGroupLecturer();
    return res;
  };
  const {
    data: groupData,
    isFetching,
    refetch,
  } = CustomHooks.useQuery(["group-lecturer"], getGroupLecturer, {
    onSuccess: (res) => {
      if (res && res.status === 0) {
        setDataSource(res.groups);
        if (isEmpty(dataSource)) {
          messageApi.success(res.message);
        }
      } else {
        setDataSource([]);
        messageApi.error(res.message);
      }
    },
    onError: (err) => {
      setDataSource([]);

      messageApi.error("Lỗi khi lấy dữ liệu");
    },
  });
  const handleSearch = (value) => {
    setSearchKeyword(value.toLowerCase());
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedGroup(null);
  };
  const handleDeleteGroup = async (record) => {
    let dataToSave = {
      id: record.id,
    };
    const res = await managerApi.deleteGroupLecturer(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };
  const handleRefresh = () => {
    setLoading(true);
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
      setLoading(false);
    }, 1000);
  };
  const sourceData =
    groupData && groupData.data ? groupData.data.groups : dataSource;
  const filteredData = sourceData.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword)
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên nhóm",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Số nhóm chấm phản biện",
      key: "numOfGroupStudent",
      width: "20%",
      render: (record) => `${record?.reviewGroups.length}` || "Không có nhóm",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleOpenUpdateModal(record, true)}
            variant="contained"
            size="small"
            endIcon={<EditOutlined />}
            sx={{ backgroundColor: "#FF993A", marginLeft: 1 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa nhóm giảng viên này?"
            onConfirm={() => handleDeleteGroup(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              endIcon={<DeleteOutlined />}
              sx={{ marginLeft: 1 }}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
      <Box sx={{ position: "relative", mb: 2 }}>
        <SearchComponent
          placeholder="Tìm theo tên nhóm giảng viên"
          onChange={handleSearch}
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
            onClick={handleRefresh}
            text="Làm mới dữ liệu"
            type="refresh"
            loading={loading}
          />
        </Box>
      </Box>

      <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
        Danh sách nhóm giảng viên
      </Typography>
      <Table
        bordered
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          total: state.totalRow, // Cập nhật giá trị total
          current: state.page,
          pageSize: state.pageSize,
          onChange: (page, size) => {
            updateState({ page: page, pageSize: size });
          },
          responsive: true,
        }}
        locale={{
          emptyText: (
            <Box display="flex" justifyContent="center" alignItems="center">
              {isFetching ? (
                <EmptyData />
              ) : isEmpty(dataSource) ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : (
                <EmptyData />
              )}
            </Box>
          ),
        }}
      />

      <UpdateGroupModalLecturer
        groupSelected={selectedGroup}
        isOpen={openUpdateModal}
        closeModal={handleCloseUpdateModal}
        onCancel={handleCloseUpdateModal}
        refetch={refetch}
      />
    </Box>
  );
};

export default ManageGroupLecturer;
