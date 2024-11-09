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
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PropTypes from "prop-types";
import { useState } from "react";

const UpdateGroupModalLecturer = ({ lecturerSelect, isOpen, closeModal }) => {
  const [newLecturerId, setNewLecturerId] = useState(""); // State for new lecturer ID
  const [isAddLecturerOpen, setIsAddLecturerOpen] = useState(false); // State for controlling the Add Lecturer dialog

  if (!lecturerSelect) return null;

  const handleAddLecturer = () => {
    if (newLecturerId.trim()) {
      console.log("Adding lecturer with ID:", newLecturerId);
      // Add the logic to add a lecturer using newLecturerId here, e.g., API call
      setNewLecturerId(""); // Clear input after adding
      setIsAddLecturerOpen(false); // Close the dialog after adding
    } else {
      console.log("Please enter a valid lecturer ID.");
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
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "700", color: "#006ed3" }}
        >
          <strong>Tên nhóm: {lecturerSelect.groupName}</strong>
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
          {lecturerSelect.lecturers?.map((lecturer) => (
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
              {lecturerSelect.isEditing && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlined />}
                  sx={{ mt: 1 }}
                  onClick={() =>
                    console.log("Remove lecturer", lecturer.fullName)
                  }
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
  lecturerSelect: PropTypes.shape({
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
};

export default UpdateGroupModalLecturer;
