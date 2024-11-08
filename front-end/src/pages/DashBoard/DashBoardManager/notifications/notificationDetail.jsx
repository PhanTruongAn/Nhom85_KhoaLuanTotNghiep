import { Card, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { formatContent } from "../../../../utils/formatContent";

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
          marginTop: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
          height: "80%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
          display: "block", // Make sure it's treated as a block element
        }}
      >
        {formatContent(notification.content)}
      </Typography>
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

NotificationDetail.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationDetail;
