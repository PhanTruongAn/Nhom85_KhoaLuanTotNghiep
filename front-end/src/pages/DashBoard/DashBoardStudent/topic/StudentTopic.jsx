import React, { useState } from "react";
import { Button, message } from "antd";
import { DownOutlined, ReadOutlined } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import studentApi from "../../../../apis/studentApi";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { setMyTopic } from "../../../../redux/userSlice";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const topic = useSelector((state) => state.userInit.topic);
  const [messageApi, contextHolder] = message.useMessage();
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  const { data: topicData, isLoading: isLoadingTopic } = useQuery(
    ["my-topic"],
    async () => {
      const res = await studentApi.getMyTopic(group?.topicId);
      return res;
    },
    {
      enabled: !!group?.topicId && isEmpty(topic),
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          dispatch(setMyTopic(res.data));
          messageApi.success(res.message);
        } else {
          messageApi.error(res.message);
        }
      },
      onError: (error) => {
        messageApi.error("Có lỗi xảy ra khi lấy thông tin topic: " + error);
      },
    }
  );
  const displayedTopic = topic || {};

  return (
    <div style={{ padding: "10px" }}>
      {contextHolder}
      <Card sx={{ marginBottom: "10px", padding: "10px" }} variant="elevation">
        <Typography sx={{ fontWeight: 700 }}>
          THÔNG TIN GIẢNG VIÊN HƯỚNG DẪN
        </Typography>
        <Typography>
          Họ và tên giảng viên: {displayedTopic.lecturer?.fullName || "N/A"}
        </Typography>
        <Typography>
          Email liên hệ: {displayedTopic.lecturer?.email || "N/A"}
        </Typography>
        <Typography>
          Số điện thoại: {displayedTopic.lecturer?.phone || "N/A"}
        </Typography>
      </Card>

      <Box sx={{ overflow: "auto", maxHeight: "390px" }}>
        <Card
          style={{ marginBottom: "10px", padding: "10px" }}
          variant="elevation"
        >
          <Typography sx={{ fontSize: "18px" }}>
            <b>TÊN ĐỀ TÀI:</b> {displayedTopic.title || "N/A"}
          </Typography>

          <DownOutlined
            onClick={toggleDetails}
            style={{
              fontSize: "24px",
              float: "right",
              marginTop: "-35px",
              cursor: "pointer",
            }}
          />
        </Card>

        {showDetails && (
          <Card style={{ marginBottom: "10px", padding: "10px" }}>
            <Typography>
              <strong>Mô tả:</strong> {displayedTopic.description || "N/A"}
            </Typography>
            <Typography>
              <strong>Mục tiêu:</strong> {displayedTopic.goals || "N/A"}
            </Typography>
            <Typography>
              <strong>Yêu cầu:</strong> {displayedTopic.requirement || "N/A"}
            </Typography>
            <Typography>
              <strong>Chuẩn đầu ra:</strong>{" "}
              {displayedTopic.standardOutput || "N/A"}
            </Typography>
          </Card>
        )}
      </Box>

      <Button icon={<ReadOutlined />} style={{ marginTop: "10px" }}>
        HỦY ĐĂNG KÝ ĐỀ TÀI
      </Button>
    </div>
  );
};

export default ProjectDetails;
