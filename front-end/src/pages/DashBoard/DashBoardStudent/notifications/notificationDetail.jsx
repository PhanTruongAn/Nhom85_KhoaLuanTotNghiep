import React from "react";
import { Card, Typography, Divider } from "antd";

const NotificationDetail = ({ notification }) => {
  return (
    <Card
      bordered={true}
      style={{
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        width: "100%", // Full width of the modal
        height: "100%", // Full height of the modal
        overflowY: "auto", // Scroll if content overflows
      }}
    >
      <Typography.Title level={4} style={{ color: "#1890ff" }}>
        {notification.title}
      </Typography.Title>
      <Divider />
      <Typography.Paragraph
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          height: "60%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
          display: "block", // Make sure it's treated as a block element
        }}
      >
        {notification.content}
      </Typography.Paragraph>
      <Divider />
      <Typography.Text type="secondary" style={{ fontSize: "14px" }}>
        Ngày tạo: {new Date(notification.createAt).toLocaleString("vi-VN")}
      </Typography.Text>
    </Card>
  );
};

export default NotificationDetail;
