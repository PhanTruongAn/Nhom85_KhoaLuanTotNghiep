import { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog } from "@mui/material";
import NotificationDetail from "./notificationDetail"; // Import NotificationDetail
import { useSelector } from "react-redux";
import _ from "lodash";
function ListNotification() {
  const notes = useSelector((state) => state.userInit.notes);
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const notifications = _.cloneDeep(notes);
  const containerRef = useRef(null);

  useEffect(() => {
    const sorted = notifications.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
    setSortedNotifications(sorted);
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        visibleCount < sortedNotifications.length
      ) {
        setVisibleCount((prevCount) => prevCount + 3);
      }
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification); // Open the dialog
  };

  const handleCloseModal = () => {
    setSelectedNotification(null); // Only close the dialog
  };

  return (
    <Box>
      <Box
        className="notification-container"
        ref={containerRef}
        onScroll={handleScroll}
        sx={[
          (theme) => ({
            borderRadius: "8px",
            padding: "16px",
            width: "700px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxHeight: "400px",
            overflowY: "auto",
            cursor: "pointer",
            ...theme.applyStyles("dark", {
              backgroundColor: "#1E1E1E",
            }),
          }),
        ]}
      >
        <Box display="flex" justifyContent="space-between" marginBottom="16px">
          <Box component="h2" fontSize="20px" fontWeight="bold">
            Thông báo mới
          </Box>
          <Box component="span" fontSize="14px">
            {sortedNotifications.length} Thông báo
          </Box>
        </Box>
        {sortedNotifications.slice(0, visibleCount).map((notification) => (
          <Box
            className="notification-item"
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            sx={[
              (theme) => ({
                borderRadius: "4px",
                padding: "12px",
                marginBottom: "10px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e6f7ff",
                  color: "black",
                },
                ...theme.applyStyles("dark", {
                  backgroundColor: "#2E2E2E",
                }),
              }),
            ]}
          >
            <Box component="div" fontSize="12px">
              {new Date(notification.createdAt).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Box>
            <Box
              component="div"
              fontSize="14px"
              fontWeight="bold"
              margin="4px 0"
            >
              Tiêu đề: {notification.title}
            </Box>
          </Box>
        ))}
        {visibleCount < sortedNotifications.length && (
          <Button
            size="small"
            onClick={() => setVisibleCount(visibleCount + 3)}
            style={{ marginTop: "10px" }}
          >
            Xem thêm
          </Button>
        )}
      </Box>
      <Dialog
        open={!!selectedNotification}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { padding: "20px", height: "700px" }, // Use maxHeight for flexibility
        }}
      >
        {selectedNotification && (
          <NotificationDetail notification={selectedNotification} />
        )}
      </Dialog>
    </Box>
  );
}

export default ListNotification;
