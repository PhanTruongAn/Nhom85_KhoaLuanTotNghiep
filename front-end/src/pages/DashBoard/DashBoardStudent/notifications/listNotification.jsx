import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { Modal } from "antd"; // Import Modal from Ant Design
import NotificationDetail from "./notificationDetail"; // Import StudentNotifications

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
    content:
      "Phát biểu tại Lễ Khai giảng, TS. Phan Hồng Hải – Bí thư Đảng ủy, Hiệu trưởng nhà trường gửi lời chúc mừng đến hơn 10.000 tân sinh viên đã ổn định học tập tại Đại học Công nghiệp TP. HCM. Thầy Hải cho biết mục tiêu của năm học này của nhà trường là nâng cao chất lượng phục vụ sinh viên, đặc biệt tập trung vào việc xây dựng cơ sở vật chất và quỹ hỗ trợ sinh viên, giúp sinh viên an tâm khi theo học tại trường. Nhà trường đã xây dựng quỹ hỗ trợ người học theo tiêu chí mới. Nguồn quỹ này được chia thành nhiều loại học bổng khác nhau như học bổng dành cho sinh viên có thành tích học tập tốt, học bổng tân sinh viên, học bổng cho sinh viên vượt khó hiếu học. Năm học 2023-2024 vừa qua, viên chức, người lao động và sinh viên toàn trường đã nỗ lực phấn đấu hoàn thành xuất sắc nhiệm vụ đã đề ra. Nhiều viên chức, người lao động đạt nhiều danh hiệu thi đua, khen thưởng các cấp, kết quả học tập năm học cũng như số lượng sinh viên tốt nghiệp đạt loại giỏi, xuất sắc cao hơn năm trước. Tại đây, nhà trường đã dành 09 suất phần thưởng cho các tân sinh viên thủ khoa ngành xuất sắc vào IUH với trị giá 10 triệu đồng/sinh viên, trong đó có thêm phần thưởng đặc biệt đến từ nhà tài trợ Ngân hàng TMCP Nam Á – Chi nhánh Tân Định, 01 xe máy Air-Blade trị giá 50 triệu đồng dành cho sinh viên thủ khoa toàn trường trong kỳ tuyển sinh năm 2024.  Ngoài ra, còn có 25 suất học bổng, dành cho các sinh viên đã đạt thành tích tốt trong năm học 2023 – 2024. Mỗi suất học là 2 triệu, 25 bạn sinh viên sẽ được sướng tên và trao tại buổi lễ. Đây là phần nhỏ khích lệ và ghi nhận sự nỗ lực học tập trong năm học qua. Ngoài phần thưởng này, các bạn còn được xét học bổng 100%-130% so với học phí bình quân của mỗi học kỳ.",
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
    setSelectedNotification(notification); // Open the modal
  };

  const handleCloseModal = () => {
    setSelectedNotification(null); // Only close the modal
  };

  return (
    <>
      {/* Notification List */}
      <Box
        className="notification-container"
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          background: "#fff",
          borderRadius: "8px",
          padding: "16px",
          width: "700px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "box-shadow 0.3s",
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

        {/* Notification Items */}
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
              },
            }}
          >
            <Box component="div" fontSize="12px">
              {new Date(notification.createAt).toLocaleString("vi-VN")}
            </Box>
            <Box
              component="div"
              fontSize="14px"
              fontWeight="bold"
              margin="4px 0"
            >
              Tiêu đề: {notification.title} (Trọng số: {notification.weight})
            </Box>
            <Box component="div" fontSize="12px" textAlign="right">
              <i>Đã xem</i>
            </Box>
          </Box>
        ))}

        {/* Load More Button */}
        {visibleCount < sortedNotifications.length && (
          <Button
            onClick={() => setVisibleCount(visibleCount + 3)}
            style={{ marginTop: "10px" }}
          >
            Xem thêm
          </Button>
        )}
      </Box>

      <Modal
        title={selectedNotification?.title}
        visible={!!selectedNotification} // Modal visibility is controlled here
        onCancel={handleCloseModal}
        footer={null}
        centered // Center the modal in the viewport
        bodyStyle={{ padding: "20px", height: "500px" }} // Correct height
        width={1000} // Set width of modal
        zIndex={2000} // Ensure it appears above the notification list
      >
        {selectedNotification && (
          <NotificationDetail notification={selectedNotification} />
        )}
      </Modal>
    </>
  );
}

export default ListNotification;
