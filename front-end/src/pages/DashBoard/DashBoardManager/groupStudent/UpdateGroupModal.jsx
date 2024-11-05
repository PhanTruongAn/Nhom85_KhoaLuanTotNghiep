import React, { useEffect } from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
const UpdateGroupModal = ({
  groupSelect,
  isOpen,
  closeModal,
  onCancel,
  handleDeleteStudent,
}) => {
  useEffect(() => {
    if (groupSelect) {
    }
  }, [groupSelect]);

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 800,
          // bgcolor: "#001529",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          gutterBottom
          sx={[
            (theme) => ({
              fontWeight: "700",
              ...theme.applyStyles("light", {
                color: "#006ed3",
              }),
            }),
          ]}
        >
          <strong>Tên nhóm: {groupSelect?.groupName}</strong>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={[
            (theme) => ({
              fontWeight: "700",
              ...theme.applyStyles("light", {
                color: "#006ed3",
              }),
            }),
          ]}
        >
          <strong>Đề tài:</strong>{" "}
          {groupSelect?.topic?.title || "Chưa có đề tài"}
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={[
            (theme) => ({
              fontWeight: "700",
              ...theme.applyStyles("light", {
                color: "#006ed3",
              }),
            }),
          ]}
        >
          <strong>Danh sách sinh viên:</strong>
        </Typography>
        <Box
          sx={{
            maxHeight: "400px", // Chiều cao tối đa cho danh sách sinh viên
            overflow: "auto", // Hiển thị thanh cuộn dọc khi cần
            mb: 2,
          }}
        >
          {groupSelect?.students?.map((student, index) => (
            <Card
              key={student.id}
              variant="outlined"
              sx={{
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ fontSize: "18px" }}
              >
                {`Sinh viên ${index + 1}: `}
                {student.isLeader ? "Nhóm trưởng - " : ""}
                {student.fullName}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                Mã số sinh viên: {student.username}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                Email: {student.email || "Không có"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                SĐT: {student.phone || "Không có"}
              </Typography>
            </Card>
          ))}
        </Box>

        <Button
          color="error"
          variant="text"
          onClick={closeModal}
          sx={{ mt: 2, float: "right" }}
        >
          Đóng
        </Button>
      </Card>
    </Modal>
  );
};

export default UpdateGroupModal;
