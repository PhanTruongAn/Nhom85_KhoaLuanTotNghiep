import React from "react";
import { Button } from "antd";
import "./ListNotification.scss";

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
  // Sắp xếp thông báo theo thời gian tạo (mới nhất trước)
  const sortedNotifications = notifications.sort((a, b) => {
    return new Date(b.createAt) - new Date(a.createAt);
  });

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2>Thông báo mới</h2>
        <span>{sortedNotifications.length} Thông báo</span>
      </div>
      {sortedNotifications.map((notification) => (
        <div className="notification-item" key={notification.id}>
          <div className="notification-date">
            {new Date(notification.createAt).toLocaleString("vi-VN")}
          </div>
          <div className="notification-title">
            Tiêu đề: {notification.title} (Trọng số: {notification.weight})
          </div>
          <Button type="link" className="notification-link">
            Đã xem
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ListNotification;