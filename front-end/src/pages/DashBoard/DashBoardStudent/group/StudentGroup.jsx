import React from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "@mui/material";
import "./StudentGroup.scss";
const { Title, Text } = Typography;

const StudentGroup = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row align="middle" style={{ marginBottom: "20px" }}>
        <HomeOutlined style={{ marginRight: "8px", fontSize: "26px" }} />
        <Title level={2} style={{ margin: 0 }}>
          NHÓM SỐ 085
        </Title>
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
        <Row>
          <Col span={24}>
            <Title level={3}>Sinh viên 1: Diêu Phan Quang Dũng</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>Mã số sinh viên: 20093921</Text>
          </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            <Text>Số điện thoại: 0968771863</Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>Email liên hệ: quangdungzkh@gmail.com</Text>
          </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            <Text>Giới tính: Nam</Text>
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
        <Row>
          <Col span={24}>
            <Title level={3}>Sinh viên 2: Phan Trường An</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>Mã số sinh viên: 20085191</Text>
          </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            <Text>Số điện thoại: 0388123402</Text>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Text>Email liên hệ: phanan1000@gmail.com</Text>
          </Col>
          <Col span={12} style={{ textAlign: "left" }}>
            <Text>Giới tính: Nam</Text>
          </Col>
        </Row>
      </Card>

      <Row justify="space-between" style={{ marginTop: "20px" }}>
        <Col>
          <Link>Xem Đề tài của tôi</Link>
        </Col>
        <Col>
          <Button icon={<LogoutOutlined />}>Rời nhóm</Button>
        </Col>
      </Row>
    </div>
  );
};

export default StudentGroup;
