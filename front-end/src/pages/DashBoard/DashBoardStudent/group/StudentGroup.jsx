import { useState } from "react";
import { Row, Col, message, Space } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import { Typography, CircularProgress, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import studentApi from "../../../../apis/studentApi";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setGroup, setMyTopic, setUser } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";
import Avatar from "../../../../components/Avatar/Avatar";
import CustomButton from "../../../../components/Button/CustomButton";
import CustomHooks from "../../../../utils/hooks";
const StudentGroup = () => {
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [loadingTransferLeader, setLoadingTransferLeader] = useState({});
  const [loadingRemoveMember, setLoadingRemoveMember] = useState({});

  // Kiểm tra hạn đăng ký nhóm
  const currentDate = new Date();
  const isWithinChooseGroupPeriod =
    currentDate > new Date(currentTerm?.endChooseGroupDate);

  const getMyGroup = async () => {
    const res = await studentApi.getMyGroup(user.id, currentTerm.id);
    if (res && res.status === 0) {
      dispatch(setGroup(res.data));
    }
    return res.data;
  };

  const { refetch } = CustomHooks.useQuery(["my-group", group], getMyGroup, {
    enabled: !isEmpty(currentTerm),
  });
  const handleLeaveGroup = async () => {
    setLoading(true);
    const data = {
      studentId: user.id,
      groupId: group.id,
      termId: currentTerm.id,
    };
    const res = await studentApi.leaveGroup(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setLoading(false);
      dispatch(setUser({ ...user, isLeader: false }));
      dispatch(setMyTopic({}));
      dispatch(setGroup({}));
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  const handleRemoveMemberFromGroup = async (studentId) => {
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: true }));

    const data = {
      studentId: studentId,
      groupId: group.id,
      termId: currentTerm.id,
    };
    const res = await studentApi.removeMember(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
    } else {
      messageApi.error(res.message);
    }
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: false }));
  };

  const handleTransferLeader = async (memberId) => {
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
    setLoadingTransferLeader((prev) => ({ ...prev, [memberId]: false }));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}
      {!isEmpty(group) ? (
        <>
          <Row align="middle" style={{ marginBottom: "20px" }}>
            <HomeOutlined style={{ fontSize: "26px", color: "#006ed3" }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                margin: "5px 10px",
                color: "#006ed3",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" }, // Font size adjusts with screen size
              }}
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
                  <Row gutter={[16, 16]} style={{ alignItems: "center" }}>
                    <Col xs={24} sm={4}>
                      <Box sx={{ marginLeft: "-30px" }}>
                        <Avatar
                          gender={item.gender}
                          sx={{
                            width: { xs: "40px", sm: "50px", md: "60px" },
                            height: { xs: "40px", sm: "50px", md: "60px" },
                          }} // Avatar size scales
                        />
                      </Box>
                    </Col>

                    <Col xs={24} sm={14}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                        }} // Font size adjusts with screen size
                      >
                        Sinh viên {index + 1}: {item.fullName}
                      </Typography>
                      <Row gutter={4}>
                        <Col span={12}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                          >
                            Mã số sinh viên: {item.username}
                          </Typography>
                        </Col>
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                          >
                            Số điện thoại: {item.phone}
                          </Typography>
                        </Col>
                      </Row>
                      <Row gutter={4}>
                        <Col span={12}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                          >
                            Email liên hệ: {item.email}
                          </Typography>
                        </Col>
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Typography
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                          >
                            Giới tính: {item.gender}
                          </Typography>
                        </Col>
                      </Row>
                    </Col>
                    {user.isLeader && item.id !== user.id && (
                      <Col xs={24} sm={6}>
                        <Space direction="vertical">
                          <CustomButton
                            type="success"
                            text="Chọn làm nhóm trưởng"
                            onClick={() => handleTransferLeader(item.id)}
                            loading={loadingTransferLeader[item.id] || false}
                            disabled={isWithinChooseGroupPeriod}
                          />
                          <CustomButton
                            type="error"
                            text="Xóa khỏi nhóm"
                            onClick={() => handleRemoveMemberFromGroup(item.id)}
                            loading={loadingRemoveMember[item.id] || false}
                            disabled={isWithinChooseGroupPeriod}
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
              <Link to="/dashboard/my-topic">
                <i>Xem đề tài của nhóm</i>
              </Link>
            </Col>
            <Col>
              <Button
                variant="contained"
                disabled={loading || isWithinChooseGroupPeriod}
                onClick={handleLeaveGroup}
                size="small"
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
            height: "60vh",
          }}
        >
          <EmptyData text={!user.groupId ? "Bạn chưa tham gia nhóm!" : null} />
        </Box>
      )}
    </Box>
  );
};

export default StudentGroup;
