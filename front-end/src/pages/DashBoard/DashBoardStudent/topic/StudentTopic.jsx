import React, { useState } from "react";
import { Collapse, Button, message } from "antd";
import {
  InfoCircleOutlined,
  DownOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Typography, Box } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import studentApi from "../../../../apis/studentApi";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { setGroup, setMyTopic } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";
const { Panel } = Collapse;

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const topic = useSelector((state) => state.userInit.topic);
  const [messageApi, contextHolder] = message.useMessage();
  const [showDetails, setShowDetails] = useState(false);
  const [topicId, setTopicId] = useState();
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Fetch group data
  const { data: groupData, isLoading: isLoadingGroup } = useQuery(
    ["my-group"],
    async () => {
      const res = await studentApi.getMyGroup(user.groupId);
      return res;
    },
    {
      enabled: !!user.groupId && isEmpty(group), // Chỉ chạy nếu user có groupId và group redux rỗng
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          dispatch(setGroup(res.data));
        } else {
          messageApi.error(res.message);
        }
      },
      onError: (error) => {
        messageApi.error("Có lỗi xảy ra khi lấy thông tin group: " + error);
      },
    }
  );

  // Fetch topic data
  const { data: topicData, isLoading: isLoadingTopic } = useQuery(
    ["my-topic"],
    async () => {
      const res = await studentApi.getMyTopic(group?.topicId);
      return res;
    },
    {
      enabled: !!group?.topicId && isEmpty(topic), // Chỉ chạy nếu group có topicId và topic redux rỗng
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          console.log("Topic data: ", res);
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

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      {isLoadingGroup || isLoadingTopic ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <EmptyData />
        </Box>
      ) : (
        <div>
          <Card
            sx={{ marginBottom: "20px", padding: "10px" }}
            variant="elevation"
          >
            <Typography sx={{ fontWeight: 700 }}>
              THÔNG TIN GIẢNG VIÊN HƯỚNG DẪN
            </Typography>
            <Typography>Họ và tên giảng viên: Đặng Thị Thu Hà</Typography>
            <Typography>Email liên hệ: dtthuha79@gmail.com</Typography>
            <Typography>Số điện thoại: 0903016048</Typography>
          </Card>

          <Card
            style={{ marginBottom: "20px", padding: "10px" }}
            variant="elevation"
          >
            <Typography sx={{ fontSize: "18px" }}>TÊN ĐỀ TÀI:</Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Xây dựng website đăng ký đề tài và giám sát thực hiện khóa luận
              tốt nghiệp cho sinh viên Khoa CNTT-IUH
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
            <Collapse
              expandIcon={({ isActive }) => (
                <InfoCircleOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Panel header="Dự kiến sản phẩm nghiên cứu của đề tài">
                <Typography>
                  - Website cho phép SV đăng ký đề tài KLTN (chọn đề tài,
                  GVHD,...)
                  <br />- GV giám sát việc đăng ký của SV với mời GV, thiết lập
                  các khoảng thời gian theo tiến độ thực hiện đề tài.
                </Typography>
              </Panel>

              {/* Other Panels */}
            </Collapse>
          )}

          <Button icon={<ReadOutlined />} style={{ marginTop: "20px" }}>
            HỦY ĐĂNG KÝ ĐỀ TÀI
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
