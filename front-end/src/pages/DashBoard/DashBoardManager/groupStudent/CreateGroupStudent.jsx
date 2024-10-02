import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CreateGroupModal from "./CreateGroupModal"; // Nhập modal bạn đã tạo

const CreateGroupStudent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [startGroup, setStartGroup] = useState("");
  const [endGroup, setEndGroup] = useState("");

  const handleConfirm = () => {
    alert(`Nhóm từ ${startGroup} đến ${endGroup} đã được xác nhận!`);
  };

  const handleCancel = () => {
    setStartGroup("");
    setEndGroup("");
    alert("Đã hủy bỏ!");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box className="container-fluid" sx={{ padding: "20px" }}>
      <Card sx={{ padding: "20px", borderRadius: "8px" }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Tạo Nhóm Sinh Viên
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpenModal}
          startIcon={<AddIcon />}
          sx={{ padding: "10px" }}
        >
          Thêm một nhóm mới
        </Button>

        <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
          <Typography variant="h5" sx={{ padding: "10px", fontWeight: "bold" }}>
            Tạo nhiều nhóm sinh viên:
          </Typography>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Nhóm bắt đầu"
              variant="outlined"
              value={startGroup}
              onChange={(e) => setStartGroup(e.target.value)}
              required
            />
            <TextField
              label="Nhóm kết thúc"
              variant="outlined"
              value={endGroup}
              onChange={(e) => setEndGroup(e.target.value)}
              required
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirm}
            size="small"
            startIcon={<CheckIcon />}
            sx={[
              (theme) => ({
                marginRight: "10px",
                ...theme.applyStyles("dark", {
                  color: "#fff",
                }),
              }),
            ]}
          >
            Xác nhận
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleCancel}
            startIcon={<ClearIcon />}
          >
            Hủy bỏ
          </Button>
        </Box>
      </Card>

      <CreateGroupModal isOpen={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default CreateGroupStudent;
