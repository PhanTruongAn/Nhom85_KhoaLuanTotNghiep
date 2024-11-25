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
  CircularProgress,
} from "@mui/material";
import { message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PropTypes from "prop-types";
import { useState } from "react";
import managerApi from "../../../../apis/managerApi";
import { useSelector } from "react-redux";
const UpdateGroupModalLecturer = ({
  groupSelected,
  isOpen,
  closeModal,
  refetch,
}) => {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [newLecturerId, setNewLecturerId] = useState("");
  const [isAddLecturerOpen, setIsAddLecturerOpen] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  if (!groupSelected) return null;

  const handleAddLecturer = async () => {
    let dataToSave = {
      username: newLecturerId,
      groupId: groupSelected.id,
      termId: currentTerm.id,
    };
    let res = await managerApi.addLecturerToGroup(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setNewLecturerId("");
      refetch();
      setIsAddLecturerOpen(false);
      setTimeout(() => {
        closeModal();
      }, 1500);
    } else {
      messageApi.error(res.message);
    }
  };

  const handleDelete = async (lecturerId) => {
    setLoadingState((prev) => ({ ...prev, [lecturerId]: true }));

    const res = await managerApi.deleteLecturerFromGroup({ lecturerId });
    const messageType = res.status === 0 ? "success" : "error";
    messageApi[messageType](res.message);
    setLoadingState((prev) => ({ ...prev, [lecturerId]: false }));
    if (res && res.status === 0) {
      refetch();
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: 800,
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
          sx={{ fontWeight: "700", color: "#006ed3" }}
        >
          <strong>Tên nhóm: {groupSelected.name}</strong>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "700", color: "#006ed3" }}
        >
          <strong>Danh sách giảng viên:</strong>
        </Typography>
        {/* Add Lecturer Button at the top-right corner */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={() => setIsAddLecturerOpen(true)}
            sx={{
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.3)",
              },
            }}
          >
            Thêm giảng viên
          </Button>
        </Box>
        <Box sx={{ maxHeight: "400px", overflow: "auto", mb: 2 }}>
          {groupSelected.lecturers?.map((lecturer) => (
            <Card
              key={lecturer.id}
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
                {lecturer.fullName}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                Email: {lecturer.email || "No email"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                Số điện thoại: {lecturer.phone || "No phone"}
              </Typography>
              {groupSelected.isEditing && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={
                    loadingState[lecturer.id] ? (
                      <CircularProgress size={20} color="error" />
                    ) : (
                      <DeleteOutlined />
                    )
                  }
                  disabled={loadingState[lecturer.id]}
                  sx={{ mt: 1 }}
                  onClick={() => handleDelete(lecturer.id)} // Pass the specific lecturer's id
                >
                  Xóa khỏi nhóm
                </Button>
              )}
            </Card>
          ))}
        </Box>

        <Button
          color="error"
          variant="text"
          onClick={closeModal}
          sx={{ mt: 2, float: "right" }}
        >
          Close
        </Button>

        {/* Dialog for adding a new lecturer */}
        <Dialog
          open={isAddLecturerOpen}
          onClose={() => setIsAddLecturerOpen(false)}
        >
          <DialogTitle>Thêm bằng mã giảng viên</DialogTitle>
          <DialogContent>
            <TextField
              label="Mã giảng viên"
              variant="outlined"
              fullWidth
              value={newLecturerId}
              onChange={(e) => setNewLecturerId(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsAddLecturerOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddLecturer}
              color="primary"
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Modal>
  );
};

UpdateGroupModalLecturer.propTypes = {
  groupSelected: PropTypes.shape({
    groupName: PropTypes.string,
    lecturers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        fullName: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string,
      })
    ),
    isEditing: PropTypes.bool,
  }),
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdateGroupModalLecturer;
