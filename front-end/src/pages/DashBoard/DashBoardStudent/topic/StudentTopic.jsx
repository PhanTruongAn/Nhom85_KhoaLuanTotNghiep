import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import studentApi from "../../../../apis/studentApi";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { setGroup, setMyTopic } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { message } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
const ProjectDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const topic = useSelector((state) => state.userInit.topic);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Fetch group data
  const {
    data: groupData,
    isLoading: isLoadingGroup,
    refetch: refetchGroup,
  } = useQuery(
    ["my-group"],
    async () => {
      const res = await studentApi.getMyGroup(user.groupId);
      return res;
    },
    {
      enabled: !!user.groupId && isEmpty(group),
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
      enabled: !!group?.topicId && isEmpty(topic),
      keepPreviousData: true,
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

  const handleCancelTopic = async () => {
    setLoading(true);
    const data = {
      studentId: user.id,
      groupId: group.id,
    };
    const res = await studentApi.leaveTopic(data);
    if (res && res.status === 0) {
      dispatch(setGroup({ ...group, topicId: null }));
      dispatch(setMyTopic({}));
      refetchGroup();
      setLoading(false);
      messageApi.success(res.message);
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  return (
    <Box style={{ padding: "10px" }}>
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
        <>
          {isEmpty(topic) ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <EmptyData
                text={
                  isEmpty(group)
                    ? "Bạn chưa tham gia nhóm!"
                    : "Nhóm bạn chưa tham gia đề tài!"
                }
              />
            </Box>
          ) : (
            <>
              <Card
                sx={{ marginBottom: "10px", padding: "10px" }}
                variant="elevation"
              >
                <Typography sx={{ fontWeight: 700 }}>
                  THÔNG TIN GIẢNG VIÊN HƯỚNG DẪN
                </Typography>
                <Typography>
                  Họ và tên giảng viên:{" "}
                  {displayedTopic.lecturer?.fullName || "N/A"}
                </Typography>
                <Typography>
                  Email liên hệ: {displayedTopic.lecturer?.email || "N/A"}
                </Typography>
                <Typography>
                  Số điện thoại: {displayedTopic.lecturer?.phone || "N/A"}
                </Typography>
              </Card>
              <Box>
                <Accordion
                  sx={[
                    (theme) => ({
                      ...theme.applyStyles("dark", {
                        backgroundImage:
                          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                      }),
                    }),
                  ]}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography sx={{ fontSize: "18px" }}>
                      <b>TÊN ĐỀ TÀI:</b> {displayedTopic.title || "N/A"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <strong>Mô tả:</strong>{" "}
                      {displayedTopic.description || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Mục tiêu:</strong> {displayedTopic.goals || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Yêu cầu:</strong>{" "}
                      {displayedTopic.requirement || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Chuẩn đầu ra:</strong>{" "}
                      {displayedTopic.standardOutput || "N/A"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Accordion for canceling the topic */}
                <Accordion
                  sx={[
                    (theme) => ({
                      ...theme.applyStyles("dark", {
                        backgroundImage:
                          "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                      }),
                    }),
                  ]}
                >
                  <AccordionSummary
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    {/* <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancelTopic}
                    >
                      HỦY ĐĂNG KÝ ĐỀ TÀI
                    </Button> */}
                    <CustomButton
                      text="HỦY ĐĂNG KÝ ĐỀ TÀI"
                      onClick={handleCancelTopic}
                      type="error"
                      loading={loading}
                    />
                  </AccordionSummary>
                </Accordion>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ProjectDetails;
