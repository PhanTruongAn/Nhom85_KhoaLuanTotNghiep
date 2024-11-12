import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import studentApi from "../../../../apis/studentApi";
import { useSelector, useDispatch } from "react-redux";
import CustomHooks from "../../../../utils/hooks";
import { isEmpty } from "lodash";
import { setGroup, setMyTopic } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { message } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
import { formatContent } from "../../../../utils/formatContent";
const ProjectDetails = () => {
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const topic = useSelector((state) => state.userInit.topic);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Kiểm tra hạn đăng ký đề tài
  const currentDate = new Date();
  const isWithinChooseTopicPeriod =
    currentDate > new Date(currentTerm?.endChooseTopicDate);
  // Fetch group data
  const { data: groupData, refetch: refetchGroup } = CustomHooks.useQuery(
    ["my-group"],
    async () => {
      const res = await studentApi.getMyGroup(user.id, currentTerm.id);
      return res;
    },
    {
      enabled: isEmpty(group),
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
  const { isFetching } = CustomHooks.useQuery(
    ["my-topic"],
    async () => {
      const res = await studentApi.getMyTopic(
        group?.topicId || groupData?.topicId
      );
      return res;
    },
    {
      enabled: !!group?.topicId && isEmpty(topic),
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
    <Box
      sx={{
        padding: { xs: "5px", sm: "10px" },
        width: "100%",
        maxHeight: "80vh",
      }}
    >
      {contextHolder}
      {isFetching ? (
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
                <Typography
                  sx={[
                    (theme) => ({
                      ...theme.applyStyles("light", {
                        color: "#006ed3",
                        fontWeight: "700",
                      }),
                    }),
                  ]}
                >
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
                      backgroundColor: "#ebf6ff",
                      ...theme.applyStyles("dark", {
                        backgroundColor: "#303030",
                      }),
                    }),
                  ]}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      sx={[
                        (theme) => ({
                          fontSize: "18px",
                          ...theme.applyStyles("light", {
                            color: "#006ed3",
                          }),
                        }),
                      ]}
                    >
                      <b>TÊN ĐỀ TÀI:</b> {displayedTopic.title || "N/A"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ minHeight: "150px" }}>
                    {/* Set minHeight to prevent layout shift */}
                    <Typography>
                      <strong>Mô tả:</strong>{" "}
                      {formatContent(displayedTopic.description) || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Mục tiêu:</strong>{" "}
                      {formatContent(displayedTopic.goals) || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Yêu cầu:</strong>{" "}
                      {formatContent(displayedTopic.requirement) || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Chuẩn đầu ra:</strong>{" "}
                      {formatContent(displayedTopic.standardOutput) || "N/A"}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* Accordion for canceling the topic */}
                <Accordion
                  sx={[
                    (theme) => ({
                      backgroundColor: "#ebf6ff",
                      ...theme.applyStyles("dark", {
                        backgroundColor: "#303030",
                      }),
                    }),
                  ]}
                >
                  <AccordionSummary
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <CustomButton
                      text="HỦY ĐĂNG KÝ ĐỀ TÀI"
                      onClick={handleCancelTopic}
                      type="error"
                      loading={loading}
                      fullWidth // Make the button full width
                      disabled={isWithinChooseTopicPeriod}
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
