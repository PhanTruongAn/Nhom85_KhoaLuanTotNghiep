import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import AddIcon from "@mui/icons-material/Add";
import CreateGroupModal from "./CreateGroupModal"; // Nhập modal bạn đã tạo
import managerApi from "../../../../apis/managerApi";
import { message, Space } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
const CreateGroupStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({
    startGroup: 3,
    endGroup: 12,
    loadingSuccess: false,
    loadingError: false,
  });
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const buildDataToSave = () => {
    if (!state.startGroup || state.startGroup === "") {
      messageApi.warning("Hãy chọn nhóm bắt đầu!");
      updateState({ loadingSuccess: false });
      return null;
    }
    if (!state.endGroup || state.endGroup === "") {
      updateState({ loadingSuccess: false });
      messageApi.warning("Hãy chọn nhóm kết thúc!");
      return null;
    }
    const data = [];
    for (let i = state.startGroup; i <= state.endGroup; i++) {
      const groupName = i < 10 ? `00${i}` : 10 <= i < 99 ? `0${i}` : `${i}`;
      data.push({ groupName });
    }
    return data;
  };
  const handleConfirm = async () => {
    updateState({ loadingSuccess: true });
    const data = buildDataToSave();
    if (!data) {
      return data;
    }
    const res = await managerApi.createGroupsStudent(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      updateState({ loadingSuccess: false });
    } else {
      messageApi.error(res.message);
      updateState({ loadingSuccess: false });
    }
  };

  const handleCancel = () => {
    updateState({ loadingError: true });
    updateState({ startGroup: "", endGroup: "" });
    setTimeout(() => {
      updateState({ loadingError: false });
    }, 2000);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box className="container-fluid" sx={{ padding: "20px" }}>
      {contextHolder}
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
              value={state.startGroup}
              onChange={(e) => updateState({ startGroup: e.target.value })}
              required
            />
            <TextField
              label="Nhóm kết thúc"
              variant="outlined"
              value={state.endGroup}
              onChange={(e) => updateState({ endGroup: e.target.value })}
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
          <Space>
            <CustomButton
              onClick={handleConfirm}
              loading={state.loadingSuccess}
              text={"Tạo danh sách"}
              type="success"
            />
            <CustomButton
              onClick={handleCancel}
              loading={state.loadingError}
              text={"Hủy"}
              type="error"
            />
          </Space>
        </Box>
      </Card>

      <CreateGroupModal isOpen={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default CreateGroupStudent;
