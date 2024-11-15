import {
  Modal,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PropTypes from "prop-types";
import { useState } from "react";
import studentApi from "../../../../apis/studentApi";
import { useSelector } from "react-redux";
import { message } from "antd";
import lecturerApi from "../../../../apis/lecturerApi";
const UpdateGroupModal = ({ groupSelect, isOpen, closeModal, refetch }) => {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [loadingRemoveMember, setLoadingRemoveMember] = useState({});
  const [loadingChooseLeader, setLoadingChooseLeader] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const handleDelete = async (studentId) => {
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: true }));
    const res = await studentApi.removeMember({
      studentId: studentId,
      groupId: groupSelect?.id,
      termId: currentTerm.id,
    });
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      messageApi.error(res.message);
    }
    setLoadingRemoveMember((prev) => ({ ...prev, [studentId]: false }));
  };

  const handleChooseLeader = async (studentId) => {
    setLoadingChooseLeader((prev) => ({ ...prev, [studentId]: true }));
    const data = {
      studentId: studentId,
      groupId: groupSelect?.id,
      termId: currentTerm.id,
    };
    const res = await lecturerApi.chooseLeader(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      refetch();
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      messageApi.error(res.message);
    }
    setLoadingChooseLeader((prev) => ({ ...prev, [studentId]: false }));
  };
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
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
        {contextHolder}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenAddStudentDialog(true)}
            sx={{
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.3)",
              },
            }}
          >
            Thêm sinh viên
          </Button>
          {/* Dialog for Adding Student */}
          <Dialog
            open={openAddStudentDialog}
            onClose={() => setOpenAddStudentDialog(false)}
          >
            <DialogTitle>Thêm Sinh Viên</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Mã Sinh Viên"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setStudentId(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenAddStudentDialog(false)}
                color="error"
              >
                Hủy
              </Button>
              <Button
                onClick={() => setOpenAddStudentDialog(false)}
                color="primary"
              >
                Thêm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
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
              {/* Nút xóa khỏi nhóm */}
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={
                  loadingRemoveMember[student.id] ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    <DeleteOutlined />
                  )
                }
                sx={{ mt: 1 }}
                onClick={() => handleDelete(student.id)}
                disabled={loadingRemoveMember[student.id]}
              >
                Xóa khỏi nhóm
              </Button>

              {/* Nút "Làm nhóm trưởng" chỉ hiển thị cho sinh viên không phải nhóm trưởng */}
              {!student.isLeader && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleChooseLeader(student.id)}
                  startIcon={
                    loadingChooseLeader[student.id] ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <StarOutlined />
                    )
                  }
                  sx={{ mt: 1, ml: 1 }}
                  disabled={loadingChooseLeader[student.id]}
                >
                  Làm nhóm trưởng
                </Button>
              )}
            </Card>
          ))}
        </Box>

        <Button
          color="error"
          size="small"
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
UpdateGroupModal.propTypes = {
  groupSelect: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default UpdateGroupModal;
