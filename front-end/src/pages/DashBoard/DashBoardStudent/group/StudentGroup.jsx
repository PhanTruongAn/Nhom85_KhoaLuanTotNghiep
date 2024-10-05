import React, { useState } from "react";
import { Row, Col, message } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Box } from "@mui/material"; // Thêm Box từ Material-UI
import { Card } from "../../../../components/Card/Card";
import { Link, Typography } from "@mui/material";
import "./StudentGroup.scss";
import studentApi from "../../../../apis/studentApi";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setGroup } from "../../../../redux/userSlice";
import EmptyData from "../../../../components/emptydata/EmptyData";

const StudentGroup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const [messageApi, contextHolder] = message.useMessage();

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
        console.log(res);
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
                  <Row style={{ padding: "5px" }}>
                    <Col span={24}>
                      <Typography variant="h5" fontWeight="bold">
                        Sinh viên {index + 1}: {item.fullName}
                      </Typography>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ padding: "5px" }}>
                    <Col span={12}>
                      <Typography>Mã số sinh viên: {item.username}</Typography>
                    </Col>
                    <Col span={12} style={{ TypographyAlign: "left" }}>
                      <Typography>Số điện thoại: {item.phone}</Typography>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ padding: "5px" }}>
                    <Col span={12}>
                      <Typography>Email liên hệ: {item.email}</Typography>
                    </Col>
                    <Col span={12} style={{ TypographyAlign: "left" }}>
                      <Typography>Giới tính: {item.gender}</Typography>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          <Row justify="space-between" style={{ marginTop: "20px" }}>
            <Col>
              <Link>Xem Đề tài của tôi</Link>
            </Col>
            <Col>
              <Button variant="contained" startIcon={<LogoutOutlined />}>
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
