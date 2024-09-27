import React from "react";
import { Card, Row, Col, Button, theme } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Typography } from "@mui/material";
import "./StudentGroup.scss";
// const { Typography, Typography } = Typography;

const StudentGroup = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <HomeOutlined style={{ fontSize: "26px" }} />
        <Typography variant="h5" fontWeight="bold" sx={{ margin: "5px 10px" }}>
          NHÓM SỐ 085
        </Typography>
      </Row>

      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s",
        }}
        hoverable
      >
        <Row style={{ padding: "5px" }}>
          <Col span={24}>
            <Typography variant="h5" fontWeight="bold">
              Sinh viên 1: Diêu Phan Quang Dũng
            </Typography>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: "5px" }}>
          <Col span={12}>
            <Typography>Mã số sinh viên: 20093921</Typography>
          </Col>
          <Col span={12}>
            <Typography>Số điện thoại: 0968771863</Typography>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: "5px" }}>
          <Col span={12}>
            <Typography>Email liên hệ: quangdungzkh@gmail.com</Typography>
          </Col>
          <Col span={12}>
            <Typography>Giới tính: Nam</Typography>
          </Col>
        </Row>
      </Card>

      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s",
        }}
        hoverable
      >
        <Row style={{ padding: "5px" }}>
          <Col span={24}>
            <Typography variant="h5" fontWeight="bold">
              Sinh viên 2: Phan Trường An
            </Typography>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: "5px" }}>
          <Col span={12}>
            <Typography>Mã số sinh viên: 20085191</Typography>
          </Col>
          <Col span={12} style={{ TypographyAlign: "left" }}>
            <Typography>Số điện thoại: 0388123402</Typography>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: "5px" }}>
          <Col span={12}>
            <Typography>Email liên hệ: phanan1000@gmail.com</Typography>
          </Col>
          <Col span={12} style={{ TypographyAlign: "left" }}>
            <Typography>Giới tính: Nam</Typography>
          </Col>
        </Row>
      </Card>

      <Row justify="space-between" style={{ marginTop: "20px" }}>
        <Col>
          <Link
            sx={[
              (theme) => ({
                ...theme.applyStyles("dark", {
                  color: "#1DA57A",
                }),
              }),
            ]}
          >
            Xem Đề tài của tôi
          </Link>
        </Col>
        <Col>
          <Button icon={<LogoutOutlined />}>Rời nhóm</Button>
        </Col>
      </Row>
    </div>
  );
};

export default StudentGroup;
