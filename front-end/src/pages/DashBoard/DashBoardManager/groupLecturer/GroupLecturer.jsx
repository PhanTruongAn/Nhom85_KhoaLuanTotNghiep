import React, { useState } from "react";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { Table, Modal, message } from "antd";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { InfoCircleOutlined } from "@ant-design/icons";
import CustomButton from "../../../../components/Button/CustomButton";
import { formatContent } from "../../../../utils/formatContent";
import { useSelector } from "react-redux";
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
  console.log("Check: ", group);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [state, setState] = useState({
    reload: false,
    groupStudent: [
      {
        id: 1,
        groupName: "Nhóm 1",
        topic: {
          id: 1,
          title: "Trải nghiệm qui trình trong việc phát triển phần mềm",
          description: `
                + Tìm hiểu requirement từ khách hàng
                + Design SRS, ADD, DDD
              `,
          goals: `
                + Tìm hiểu requirement từ khách hàng
                + Design SRS, ADD, DDD
                + Coding hệ thống với Java hoặc React Native
                + Thực hiện testing
                + Deploy hệ thống (cloud computing)
              `,
          requirement: `
                Yêu cầu cứng: Đã hoàn thành môn Công nghệ mới trong SE ở mức khá giỏi
                Đam mê nghiên cứu công nghệ, lập trình Mobile
                - Có kiến thức cơ bản về Java, Swift hoặc React Native
                - Có tinh thần học hỏi và mong muốn làm sản phẩm theo quy trình công nghiệp: tuân thủ tiêu chuẩn khi viết mã nguồn, Có hoạt động đảm bảo chất lượng mã nguồn
              `,
          standardOutput: `
                A.Sinh viên tham gia đề tài
                1) Nắm vững kiến thức, kỹ năng lập trình Java
                2) Có kiến thức, kỹ năng triển khai dự án phần mềm đầy đủ qui trình từ Requirement => Design => Coding => Unit Testing
                3) Có năng lực đầy đủ về Lập kế hoạch, theo dõi tiến độ, phân tích các vấn đề phát sinh trong quá trình thực hiện dự án.
    
                B.Sản phẩm
                1) Có tài liệu mô tả Yêu cầu dự án.
                2) Có tài liệu mô tả Thiết kế kiến trúc của dự án.
                3) Có tài liệu mô tả Thiết kế chi tiết cho chức năng chính của dự án.
                4) Có mã nguồn được lưu vết (tracking) định kỳ trên hệ thống quản lý phiên bản (version control) như Subversion hoặc Git; Mã nguồn trình bày rõ ràng, dễ hiểu theo tiêu chuẩn đã được thống nhất.
                5) Có tài liệu mô tả tình huống test và kết quả test cho chức năng chính của dự án.
                6) Có tài liệu mô tả cách biên dịch, đóng gói và hướng dẫn nâng cấp mã nguồn cho dự án.
              `,
          quantityGroup: 2,
          lecturer: {
            fullName: "Giảng viên A",
            email: "gvA@example.com",
          },
        },
      },
      {
        id: 2,
        groupName: "Nhóm 2",
        topic: {
          id: 2,
          title: "Đề tài 2",
          description: "Mô tả đề tài 2",
          goals: "Mục tiêu đề tài 2",
          requirement: "Yêu cầu đề tài 2",
          standardOutput: "Chuẩn đầu ra đề tài 2",
          quantityGroup: 3,
          lecturer: {
            fullName: "Giảng viên B",
            email: "gvB@example.com",
          },
        },
      },
      {
        id: 3,
        groupName: "Nhóm 3",
        topic: {
          id: 3,
          title: "Đề tài 3",
          description: "Mô tả đề tài 3",
          goals: "Mục tiêu đề tài 3",
          requirement: "Yêu cầu đề tài 3",
          standardOutput: "Chuẩn đầu ra đề tài 3",
          quantityGroup: 1,
          lecturer: {
            fullName: "Giảng viên C",
            email: "gvC@example.com",
          },
        },
      },
    ],
    currentRecord: {},
    isModalLoading: false,
    isModalVisible: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleReload = () => {
    updateState({ reload: true });
    setTimeout(() => {
      updateState({ reload: false });
    }, 1000);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
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
        "Số lượng nhóm": topic.quantityGroup,
        "Giảng viên": topic.lecturer.fullName,
        Email: topic.lecturer.email,
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
        {group &&
          group.lecturers.map((lecturer, index) => {
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
            </Grid>;
          })}
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
          rowSelection={rowSelection}
          columns={columns(viewDetailTopic)}
          dataSource={state.groupStudent}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            responsive: true,
          }}
          locale={{
            emptyText: (
              <Box display="flex" justifyContent="center" alignItems="center">
                <EmptyData text="Không có dữ liệu!" />
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
