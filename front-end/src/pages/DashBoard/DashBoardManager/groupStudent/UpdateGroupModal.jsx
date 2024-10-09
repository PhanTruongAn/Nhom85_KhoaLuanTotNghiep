import React, { useEffect } from "react";
import { Modal, Typography, Box, Button, Card } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
const UpdateGroupModal = ({
  groupSelect,
  isOpen,
  closeModal,
  onCancel,
  handleDeleteStudent,
}) => {
  useEffect(() => {
    if (groupSelect) {
      // No need to set form values since we're not using a form
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
      <Box
        sx={{
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
          Tên nhóm: {groupSelect?.groupName}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Tên đề tài: {groupSelect?.topic?.title}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Danh sách sinh viên:
        </Typography>
        {groupSelect?.students?.map((student, index) => (
          <Card
            key={student.id}
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
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteStudent(student.id)}
                endIcon={<DeleteOutlined />}
              >
                Xóa sinh viên
              </Button>
            </Box>
          </Card>
        ))}
        <Button variant="contained" onClick={closeModal} sx={{ mt: 2 }}>
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateGroupModal;
