import { Card, Typography, Divider } from "@mui/material";
import { formatContent } from "../../../../utils/formatContent";
import PropTypes from "prop-types";
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
        "@media (max-width:600px)": {
          padding: "15px", // Adjust padding for smaller screens
        },
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4">
        {notification.title}
      </Typography>
      <Divider sx={{ margin: "10px 0" }} />
      <div
        style={{
          marginTop: "20px",
          height: "80%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
        }}
      >
        {formatContent(notification.content)}
      </div>
      <Divider sx={{ margin: "10px 0" }} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontSize: "14px",
          "@media (max-width:600px)": {
            fontSize: "12px", // Adjust font size for smaller screens
          },
        }}
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
