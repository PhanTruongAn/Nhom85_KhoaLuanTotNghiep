import { Card, Typography, Divider, Box } from "@mui/material";
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
        "@media (max-width:600px)": {
          padding: "15px", // Adjust padding for smaller screens
        },
      }}
    >
      <Box
        sx={{
          height: "90%", // Keep the height restriction
          overflowY: "auto", // Scroll when content exceeds the height
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)", // Font size scales based on screen width
          }}
          variant="h4"
        >
          {notification.title}
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />
        {formatContent(notification.content)}
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          marginTop: "20px",
          fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)", // Font size scales based on screen width
          "@media (max-width:600px)": {
            fontSize: "0.9rem", // Adjust font size for smaller screens
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
