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

  // Tạo trạng thái loading riêng cho nút "Chọn làm nhóm trưởng" và "Xóa khỏi nhóm"
  const [loadingTransferLeader, setLoadingTransferLeader] = useState({});
  const [loadingRemoveMember, setLoadingRemoveMember] = useState({});

  const getMyGroup = async () => {
    const res = await studentApi.getMyGroup(user.groupId);
    return res;
  };

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["my-group"],
    getMyGroup,
    {
      enabled: !!user.groupId && isEmpty(group),
      keepPreviousData: true,
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
    // Thiết lập trạng thái loading cho nút "Xóa khỏi nhóm"
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: true }));

    const data = {
      studentId: studentId,
      groupId: group.id,
    };
    const res = await studentApi.removeMember(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
    } else {
      messageApi.error(res.message);
    }
    // Kết thúc trạng thái loading
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: false }));
  };

  const handleTransferLeader = async (memberId) => {
    // Thiết lập trạng thái loading cho nút "Chọn làm nhóm trưởng"
    setLoadingTransferLeader((prev) => ({ ...prev, [memberId]: true }));

    const data = {
      leaderId: user.id,
      memberId: memberId,
    };
    const res = await studentApi.transferLeader(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      dispatch(setUser({ ...user, isLeader: false }));
      refetch();
    } else {
      messageApi.error(res.message);
    }
    // Kết thúc trạng thái loading
    setLoadingTransferLeader((prev) => ({ ...prev, [memberId]: false }));
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

                    <Col span={14}>
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
                    {user.isLeader && item.id !== user.id && (
                      <Col span={6}>
                        <Space direction="vertical">
                          <CustomButton
                            type="success"
                            text="Chọn làm nhóm trưởng"
                            onClick={() => handleTransferLeader(item.id)}
                            loading={loadingTransferLeader[item.id] || false} // Sử dụng trạng thái loading riêng cho nút "Chọn làm nhóm trưởng"
                          />
                          <CustomButton
                            type="error"
                            text="Xóa khỏi nhóm"
                            onClick={() => handleRemoveMemberFromGroup(item.id)}
                            loading={loadingRemoveMember[item.id] || false} // Sử dụng trạng thái loading riêng cho nút "Xóa khỏi nhóm"
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // Căn giữa theo chiều dọc với chiều cao 60% view height
          }}
        >
          <EmptyData text={!user.groupId ? "Bạn chưa tham gia nhóm!" : null} />
        </Box>
      )}
    </div>
  );
};

export default StudentGroup;
