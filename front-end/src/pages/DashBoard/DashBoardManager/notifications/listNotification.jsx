import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import NotificationDetail from "./notificationDetail"; // Import NotificationDetail

const notifications = [
  {
    id: 1,
    title: "Thông báo 1",
    content: "Đây là nội dung của thông báo 1.",
    createAt: "2024-08-13T03:15:00Z",
    weight: 1,
  },
  {
    id: 2,
    title: "Thông báo 2",
    content: "Đây là nội dung của thông báo 2.",
    createAt: "2024-08-14T10:20:00Z",
    weight: 2,
  },
  {
    id: 3,
    title: "Thông báo 3",
    content: "Đây là nội dung của thông báo 3.",
    createAt: "2024-08-15T12:30:00Z",
    weight: 3,
  },
  {
    id: 4,
    title: "Thông báo 4",
    content: "Đây là nội dung của thông báo 4.",
    createAt: "2024-08-16T14:45:00Z",
    weight: 4,
  },
  {
    id: 5,
    title: "Thông báo 5",
    content: "Phát biểu tại Lễ Khai giảng...",
    createAt: "2024-08-17T16:50:00Z",
    weight: 5,
  },
];

function ListNotification() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const sorted = notifications.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
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
    <Box
      className="notification-container"
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        borderRadius: "8px",
        padding: "16px",
        width: "700px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        maxHeight: "400px",
        overflowY: "auto",
        cursor: "pointer",
      }}
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
          sx={{
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "10px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#e6f7ff",
              color: "black",
            },
          }}
        >
          <Box component="div" fontSize="12px">
            {new Date(notification.createAt).toLocaleString("vi-VN")}
          </Box>
          <Box component="div" fontSize="14px" fontWeight="bold" margin="4px 0">
            Tiêu đề: {notification.title} (Trọng số: {notification.weight})
          </Box>
          <Box component="div" fontSize="12px" textAlign="right">
            <i>Đã xem</i>
          </Box>
        </Box>
      ))}

      {visibleCount < sortedNotifications.length && (
        <Button
          onClick={() => setVisibleCount(visibleCount + 3)}
          style={{ marginTop: "10px" }}
        >
          Xem thêm
        </Button>
      )}

      <Dialog
        open={!!selectedNotification}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { padding: "20px", height: "500px" } }}
      >
        <DialogTitle>{selectedNotification?.title}</DialogTitle>
        <DialogContent>
          {selectedNotification && (
            <NotificationDetail notification={selectedNotification} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ListNotification;
