import { Box, Typography, Button, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { Table, Space, Popconfirm, message } from "antd";
import SearchComponent from "../../../../components/SearchComponent/search";
import CustomButton from "../../../../components/Button/CustomButton";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import EditPointStudent from "./EditPointStudent";
import CustomHooks from "../../../../utils/hooks";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { useDebounce } from "@uidotdev/usehooks";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import managerApi from "../../../../apis/managerApi";

function ManagePointStudent() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [state, setState] = useState({
    searchLoading: false,
    page: 1,
    pageSize: 5,
    dataSource: [],
    loadingData: false,
    searchValue: "",
    objectSelect: {},
    totalRows: null,
    refreshButton: false,
    totalPages: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const debouncedSearch = useDebounce(state.searchValue, 500);
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const getData = async () => {
    const res = await managerApi.getGroupStudentEvaluation(
      state.page,
      state.pageSize,
      currentTerm.id
    );
    return res;
  };

  const {
    isFetching,
    data: groupData,
    refetch,
  } = CustomHooks.useQuery(
    [
      "group-student-evaluation",
      currentTerm,
      state.pageSize,
      state.page,
      debouncedSearch,
    ],
    () => {
      if (debouncedSearch) {
        return handleFindEvaluation();
      } else {
        return getData();
      }
    },
    {
      enabled: !isEmpty(currentTerm),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            refreshButton: false,
            dataSource: res.data?.evaluations || res.data,
            totalRows: res.data?.totalRows || res.data.length,
            totalPages: res.data?.totalPages || 1,
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
      onError: () => {
        updateState({
          dataSource: [],
          loadingData: false,
          refreshButton: false,
        });
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
  const handleFindEvaluation = async () => {
    const res = await managerApi.findEvaluation(state.searchValue);
    return res;
  };

  const handleRefresh = () => {
    updateState({ refreshButton: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const res = await managerApi.deleteEvaluation(id);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      if (state.dataSource.length === 1 && state.totalPages !== 1) {
        updateState({ page: state.page - 1 });
      }
      refetch();
    } else {
      messageApi.error(res.message);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "Tên nhóm",
      key: "groupName",
      render: (record) => record.group?.groupName || "Chưa có nhóm",
    },
    {
      title: "Tên đề tài",
      key: "topicName",
      render: (record) => record.group?.topic.title || "Nhóm chưa có đề tài",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa điểm
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteOutlined />}
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
      <Box sx={{ position: "relative" }}>
        <SearchComponent
          placeholder="Tìm theo tên nhóm hoặc tên đề tài"
          onChange={(e) => updateState({ searchValue: e })}
        ></SearchComponent>
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Space>
            <CustomButton
              text="Làm mới dữ liệu"
              type="refresh"
              loading={state.refreshButton}
              onClick={handleRefresh}
            />
          </Space>
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            flex: 1, // Để tiêu đề chiếm không gian còn lại
            textAlign: "center", // Căn giữa
          }}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Danh sách điểm các nhóm
        </Typography>
      </Box>
      <Table
        columns={columns}
        dataSource={
          groupData && groupData.data
            ? groupData.data?.evaluations || groupData.data
            : state.dataSource
        }
        rowKey="id"
        loading={isFetching}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          total:
            groupData && groupData.data
              ? groupData.data.totalRows
              : state.totalRows,
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
              ) : isEmpty(state.dataSource) ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : null}
            </Box>
          ),
        }}
      />

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogContent>
          <EditPointStudent
            onClose={handleCloseDialog}
            selectedRecord={selectedRecord}
            refetch={refetch}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ManagePointStudent;
