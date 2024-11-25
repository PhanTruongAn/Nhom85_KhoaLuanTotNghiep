import React, { useState } from "react";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { Table, Modal, message } from "antd";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { InfoCircleOutlined } from "@ant-design/icons";
import CustomButton from "../../../../components/Button/CustomButton";
import { formatContent } from "../../../../utils/formatContent";
import { useSelector } from "react-redux";
import CustomHooks from "../../../../utils/hooks";
import { isEmpty } from "lodash";
import lecturerApi from "../../../../apis/lecturerApi";
const columns = (viewDetailTopic) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nhóm",
    dataIndex: "groupName",
    key: "groupName",
  },
  {
    title: "Tên đề tài",
    render: (record) => record.topic.title,
    key: "topicName",
  },
  {
    title: "Action",
    key: "action",
    render: (record) => (
      <Button
        variant="outlined"
        size="small"
        endIcon={<InfoCircleOutlined />}
        onClick={() => viewDetailTopic(record.topic.id)}
      >
        Xem chi tiết đề tài
      </Button>
    ),
  },
];

function GroupLecturer() {
  const group = useSelector((state) => state.userInit.groupLecturer);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);

  const [state, setState] = useState({
    reload: false,
    groupStudent: [],
    currentRecord: {},
    isModalLoading: false,
    isModalVisible: false,
    pageSize: 5,
    page: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const getReviewGroups = async () => {
    const res = await lecturerApi.reviewStudentGroups(group.id, currentTerm.id);
    return res;
  };
  const {
    isFetching,
    data: groupStudentData,
    refetch,
  } = CustomHooks.useQuery(
    ["my-group-topic", state.page, state.pageSize],
    getReviewGroups,
    {
      enabled: !isEmpty(currentTerm) && !isEmpty(group),
      onSuccess: (res) => {
        updateState({ reload: false });
        if (res && res.status === 0) {
          updateState({ groupStudent: res.data, reload: false });
          if (isEmpty(groupStudentData)) {
            messageApi.success(res.message);
          }
        } else {
          messageApi.error(res.message);
        }
      },
      onError: () => {
        updateState({ reload: false });
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );
  const handleReload = () => {
    updateState({ reload: true });
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };

  const viewDetailTopic = (id) => {
    updateState({ isModalVisible: true, isModalLoading: true });

    // Simulate API response delay
    setTimeout(() => {
      const topic = state.groupStudent.find(
        (group) => group.topic.id === id
      ).topic;
      const dataConvert = {
        "Tên đề tài": topic.title,
        "Mô tả": topic.description,
        "Mục tiêu": topic.goals,
        "Yêu cầu": topic.requirement,
        "Chuẩn đầu ra": topic.standardOutput,
      };
      updateState({ currentRecord: dataConvert, isModalLoading: false });
    }, 500);
  };
  const onCloseModal = () => {
    updateState({ isModalVisible: false });
  };

  return (
    <Box p={1}>
      {contextHolder}
      <Grid container spacing={2}>
        {group.lecturers &&
          group.lecturers.map((lecturer, index) => (
            <Grid item xs={12} md={6} key={lecturer.id}>
              <Card sx={{ padding: "10px" }}>
                <Typography variant="h6">Giảng viên {index + 1}</Typography>
                <Box p={2}>
                  <Grid container spacing={2}>
                    {/* Lecturer Information */}
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Mã giảng viên"
                        value={lecturer.username}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Tên giảng viên"
                        value={lecturer.fullName}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        value={lecturer.phone}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={lecturer.email}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Box mt={2} mb={2}>
        <CustomButton
          text="Làm mới dữ liệu"
          loading={state.reload}
          type="refresh"
          onClick={handleReload}
        />
      </Box>
      <Box>
        <Table
          columns={columns(viewDetailTopic)}
          dataSource={state.groupStudent}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            responsive: true,
            onChange: (page, size) => {
              updateState({ page: page, pageSize: size });
            },
          }}
          locale={{
            emptyText: (
              <Box display="flex" justifyContent="center" alignItems="center">
                {isFetching ? (
                  <EmptyData />
                ) : state.groupStudent ? (
                  <EmptyData text="Không có dữ liệu!" />
                ) : (
                  <EmptyData />
                )}
              </Box>
            ),
          }}
        />
      </Box>

      <Modal
        title="Chi tiết đề tài"
        open={state.isModalVisible}
        onCancel={onCloseModal}
        footer={null}
        width="80%"
        loading={state.isModalLoading}
      >
        {state.currentRecord && (
          <Box
            maxWidth="lg"
            sx={{ overflowY: "auto", height: "70vh", fontSize: "16px" }}
          >
            {Object.keys(state.currentRecord).map((key) => (
              <Box key={key} sx={{ marginBottom: "10px" }}>
                <strong>{key}:</strong>{" "}
                {["Mô tả", "Mục tiêu", "Yêu cầu", "Chuẩn đầu ra"].includes(key)
                  ? formatContent(state.currentRecord[key])
                  : state.currentRecord[key]}
              </Box>
            ))}
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default GroupLecturer;
