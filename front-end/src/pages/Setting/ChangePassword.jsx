import React, { useState } from "react";
import { message } from "antd";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
  Card,
} from "@mui/material";

import { useSelector } from "react-redux";
import lecturerApi from "../../apis/lecturerApi";
import studentApi from "../../apis/studentApi";
import "./ChangePassword.scss";

function ChangePassword() {
  const data = useSelector((state) => state.userInit.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = async () => {
    if (
      !formValues.currentPassword ||
      !formValues.newPassword ||
      !formValues.confirmPassword
    ) {
      messageApi.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (formValues.newPassword !== formValues.confirmPassword) {
      messageApi.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    const payload = {
      username: data.username,
      roleName: data.role.name,
      currentPassword: formValues.currentPassword,
      newPassword: formValues.newPassword,
    };
    const res =
      data.role.name === "STUDENT"
        ? await studentApi.changePassword(payload)
        : await lecturerApi.changePassword(payload);
    setLoading(false);

    if (res && res.status === 0) {
      messageApi.success(res.message);
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: "10px",
      }}
    >
      {contextHolder}
      <Card
        variant="elevation"
        sx={{
          width: { xs: "100%", sm: "80%", md: "30%" },
          padding: { xs: "20px", sm: "20px", md: "20px" },
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={[
            (theme) => ({
              textAlign: "center",
              marginBottom: "20px",
              ...theme.applyStyles("light", {
                color: "#006ed3",
              }),
            }),
          ]}
        >
          Đổi Mật Khẩu
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            name="currentPassword"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            value={formValues.currentPassword}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            value={formValues.newPassword}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Xác nhận mật khẩu mới"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Button
            onClick={onFinish}
            variant="contained"
            disabled={loading}
            sx={{
              width: "100%",
              textTransform: "none",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Đổi Mật Khẩu"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default ChangePassword;
