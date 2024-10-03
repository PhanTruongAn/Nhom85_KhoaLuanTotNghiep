import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";

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
    content: "Đây là nội dung của thông báo 5.",
    createAt: "2024-08-17T16:50:00Z",
    weight: 5,
  },
];

function ListNotification() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortedNotifications, setSortedNotifications] = useState([]);
  const containerRef = useRef(null);

  // Sort notifications by date (descending order)
  useEffect(() => {
    const sorted = notifications.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setSortedNotifications(sorted);
  }, []);

  // Handle scroll event
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

  return (
    <Box
      className="notification-container"
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "16px",
        width: "700px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "box-shadow 0.3s",
        maxHeight: "400px",
        overflowY: "auto", // Important to enable scrolling
        cursor: "pointer",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" marginBottom="16px">
        <Box component="h2" fontSize="18px">
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
          sx={{
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "10px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s",
            "&:hover": {},
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
        ></Button>
      )}
    </Box>
  );
}

export default ListNotification;
