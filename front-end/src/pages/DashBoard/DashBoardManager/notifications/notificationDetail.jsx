import React from "react";
import { Card, Typography, Divider } from "@mui/material";

const NotificationDetail = ({ notification }) => {
  return (
    <Card
      sx={{
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        width: "100%", // Full width of the modal
        height: "100%", // Full height of the modal
        overflowY: "auto", // Scroll if content overflows
      }}
    >
      <Typography variant="h4">{notification.title}</Typography>
      <Divider />
      <Typography
        paragraph
        sx={{
          fontSize: "16px",
          lineHeight: "1.6",
          height: "80%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
          display: "block", // Make sure it's treated as a block element
        }}
      >
        {notification.content}
      </Typography>
      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "14px" }}
      >
        Ngày tạo: {new Date(notification.createAt).toLocaleString("vi-VN")}
      </Typography>
    </Card>
  );
};

export default NotificationDetail;
