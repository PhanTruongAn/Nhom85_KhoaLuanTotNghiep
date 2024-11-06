import React from "react";
import { Modal, Typography, Box, Button, TextField } from "@mui/material";
import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";

const UpdateGroupModalLecturer = ({ lecturerSelect, isOpen, closeModal }) => {
  if (!lecturerSelect) return null;

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
          <strong>Group Name: {lecturerSelect.groupName}</strong>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "700", color: "#006ed3" }}
        >
          <strong>Lecturer List:</strong>
        </Typography>
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
                Phone: {lecturer.phone || "No phone"}
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
                  Remove from Group
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
      </Card>
    </Modal>
  );
};

export default UpdateGroupModalLecturer;
