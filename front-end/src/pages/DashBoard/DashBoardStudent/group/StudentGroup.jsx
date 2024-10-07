import React, { useState } from "react";
import { Row, Col, message, Space } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import { Link, Typography, CircularProgress, Button, Box } from "@mui/material";
import "./StudentGroup.scss";
import studentApi from "../../../../apis/studentApi";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setGroup, setUser } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";
import Avatar from "../../../../components/Avatar/Avatar";
import CustomButton from "../../../../components/Button/CustomButton";
const StudentGroup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    loadingButtonSuccess: false,
    loadingButtonError: false,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const getMyGroup = async () => {
    const res = await studentApi.getMyGroup(user.groupId);
    return res;
  };

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["my-group"],
    getMyGroup,
    {
      enabled: isEmpty(group),
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          messageApi.success(res.message);
          dispatch(setGroup(res.data));
        } else {
          messageApi.error(res.message);
        }
      },
      onError: (error) => {
        messageApi.error("Có lỗi xảy ra: " + error);
      },
    }
  );

  const handleLeaveGroup = async () => {
    setLoading(true);
    const data = {
      studentId: user.id,
      groupId: group.id,
    };
    const res = await studentApi.leaveGroup(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setLoading(false);
      dispatch(setUser({ ...user, groupId: null }));
      dispatch(setGroup({}));
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  const handleRemoveMemberFromGroup = async (studentId) => {
    updateState({ loadingButtonError: true });
    const data = {
      studentId: studentId,
      groupId: group.id,
    };
    const res = await studentApi.removeMember(data);
    if (res && res.status === 0) {
      updateState({ loadingButtonError: false });
      dispatch(setGroup(res.data));
      messageApi.success(res.message);
    } else {
      updateState({ loadingButtonError: false });
      messageApi.error(res.message);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      {!isEmpty(group) ? (
        <>
          <Row align="middle" style={{ marginBottom: "20px" }}>
            <HomeOutlined style={{ fontSize: "26px" }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ margin: "5px 10px" }}
            >
              Nhóm số: {group.groupName}
            </Typography>
          </Row>

          {group.students &&
            group.students.map((item, index) => {
              return (
                <Card
                  key={index}
                  sx={{
                    marginBottom: "20px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                  }}
                >
                  <Row gutter={4} style={{ alignItems: "center" }}>
                    <Col span={4}>
                      <Box sx={{ marginLeft: "-30px" }}>
                        <Avatar gender={item.gender} />
                      </Box>
                    </Col>

                    <Col span={15}>
                      <Typography variant="h5" fontWeight="bold">
                        Sinh viên {index + 1}: {item.fullName}
                      </Typography>
                      <Row gutter={4}>
                        <Col span={10}>
                          <Typography>
                            Mã số sinh viên: {item.username}
                          </Typography>
                        </Col>
                        <Col span={10} style={{ textAlign: "left" }}>
                          <Typography>Số điện thoại: {item.phone}</Typography>
                        </Col>
                      </Row>
                      <Row gutter={4}>
                        <Col span={10}>
                          <Typography>Email liên hệ: {item.email}</Typography>
                        </Col>
                        <Col span={10} style={{ textAlign: "left" }}>
                          <Typography>Giới tính: {item.gender}</Typography>
                        </Col>
                      </Row>
                    </Col>
                    {item.isLeader || user.username === item.username ? null : (
                      <Col span={5}>
                        <Space direction="vertical">
                          <CustomButton
                            type="success"
                            text="Chọn làm nhóm trưởng"
                          />
                          <CustomButton
                            type="error"
                            text="Xóa khỏi nhóm"
                            onClick={(e) =>
                              handleRemoveMemberFromGroup(item.id)
                            }
                            loading={state.loadingButtonError}
                          />
                        </Space>
                      </Col>
                    )}
                  </Row>
                </Card>
              );
            })}
          <Row justify="space-between" style={{ marginTop: "20px" }}>
            <Col>
              <Link>Xem Đề tài của tôi</Link>
            </Col>
            <Col>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleLeaveGroup}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="primary" />
                  ) : (
                    <LogoutOutlined />
                  )
                }
              >
                Rời nhóm
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          justifyContent="center"
          width="100%"
          height="auto"
          alignSelf="center"
        >
          <EmptyData
            text={!user.groupId ? "Bạn hãy tham gia nhóm trước đã!" : null}
          />
        </Box>
      )}
    </div>
  );
};

export default StudentGroup;
