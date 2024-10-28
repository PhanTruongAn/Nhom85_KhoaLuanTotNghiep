import React from "react";
import { Card, Typography, Divider } from "@mui/material";
import { formatContent } from "../../../../utils/formatContent";
const NotificationDetail = ({ notification }) => {
  // Hàm để chuyển đổi nội dung thành cấu trúc văn bản

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
      <Typography sx={{ textAlign: "center" }} variant="h4">
        {notification.title}
      </Typography>
      <Divider />
      <div
        style={{
          marginTop: "20px",
          height: "80%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
        }}
      >
        {formatContent(notification.content)}
      </div>
      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "14px" }}
      >
        Ngày tạo:{" "}
        {new Date(notification.createdAt).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
    </Card>
  );
};

export default NotificationDetail;
