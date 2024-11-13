import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Table, message } from "antd";
import { TableOutlined } from "@ant-design/icons";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { useSelector } from "react-redux";
import CustomHooks from "../../../../utils/hooks";
import studentApi from "../../../../apis/studentApi";
import { isEmpty } from "lodash";
import lecturerApi from "../../../../apis/lecturerApi";
const columns = [
  {
    title: "Điểm Quá Trình",
    dataIndex: "progressPoint",
    key: "progressPoint",
  },
  {
    title: "Điểm Phản biện",
    dataIndex: "discussionPoint",
    key: "discussionPoint",
  },
  {
    title: "Điểm Báo cáo",
    dataIndex: "reportingPoint",
    key: "reportingPoint",
  },
  {
    title: "Điểm Trung bình",
    dataIndex: "averagePoint",
    key: "averagePoint",
  },
];

function MyPoint() {
  const user = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const group = useSelector((state) => state.userInit.group);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getMyPoint = async () => {
    const res = await studentApi.getEvaluation(group.id, currentTerm.id);
    return res;
  };
  const { isFetching, data: evaluationData } = CustomHooks.useQuery(
    ["my-point", group],
    getMyPoint,
    {
      enabled: !isEmpty(currentTerm) && !isEmpty(group),
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setData([res.data]);
        } else {
          messageApi.info(res.message);
        }
      },
      onError: () => {
        messageApi.error("Lỗi khi lấy thông tin điểm số!");
      },
    }
  );

  return (
    <Box
      padding={1}
      sx={{
        width: "100%",
        height: "auto", // Change height to auto for responsiveness
        borderRadius: 2,
        overflow: "hidden", // Prevents overflow
      }}
    >
      {contextHolder}
      <Box
        display="flex"
        alignItems="center"
        marginBottom={2}
        sx={{ justifyContent: "center" }}
      >
        <TableOutlined
          style={{ fontSize: "34px", marginRight: "8px", color: "#1976d2" }}
        />
        <Typography variant="h5" color="#1976d2">
          Bảng Điểm Của Tôi
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
          padding: "18px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body1">
          <strong>Họ tên:</strong>
          {user.fullName}
        </Typography>
        <Typography variant="body1">
          <strong>MSSV:</strong> {user.username}
        </Typography>
        <Typography variant="body1">
          <strong>Giới tính:</strong> {user?.gender || ""}
        </Typography>
        <Typography variant="body1">
          <strong>Chuyên ngành:</strong> Kỹ thuật phần mềm
        </Typography>
      </Box>

      <Table
        columns={columns}
        dataSource={
          evaluationData && evaluationData.data ? [evaluationData.data] : data
        }
        pagination={false}
        rowKey="id"
        locale={{
          emptyText: (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isFetching ? (
                <EmptyData />
              ) : isEmpty(data) ? (
                <EmptyData text="Không có dữ liệu!" />
              ) : null}
            </Box>
          ),
        }}
        style={{
          marginTop: "16px",
          padding: "10px",
          borderRadius: "8px",
        }}
        // Added responsive styles for the table
        scroll={{ x: "max-content" }} // Enables horizontal scroll if needed
      />
    </Box>
  );
}

export default MyPoint;
