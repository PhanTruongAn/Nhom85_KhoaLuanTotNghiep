import { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { message } from "antd";
import { useSelector } from "react-redux";
import lecturerApi from "../../apis/lecturerApi";
import studentApi from "../../apis/studentApi";
import CustomButton from "../../components/Button/CustomButton";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons

function ChangePassword() {
  const data = useSelector((state) => state.userInit.user);
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật giá trị form
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Kiểm tra lỗi nếu trường bị thay đổi và ẩn lỗi
    if (errors[name]) {
      // Kiểm tra nếu trường mới nhập đúng, thì loại bỏ lỗi
      const newErrors = { ...errors };
      if (name === "currentPassword" && value) {
        newErrors.currentPassword = ""; // Xoá lỗi nếu trường mật khẩu hiện tại không còn lỗi
      }
      if (name === "newPassword" && value) {
        newErrors.newPassword = ""; // Xoá lỗi nếu trường mật khẩu mới không còn lỗi
      }
      if (name === "confirmPassword" && value) {
        newErrors.confirmPassword = ""; // Xoá lỗi nếu trường xác nhận mật khẩu không còn lỗi
      }
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.currentPassword)
      newErrors.currentPassword = "Mật khẩu hiện tại là bắt buộc!";
    if (!formValues.newPassword)
      newErrors.newPassword = "Mật khẩu mới là bắt buộc!";
    if (!formValues.confirmPassword)
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc!";
    if (formValues.newPassword !== formValues.confirmPassword)
      newErrors.confirmPassword =
        "Mật khẩu mới và xác nhận mật khẩu không khớp!";

    // Kiểm tra mật khẩu mới có ít nhất 8 ký tự, có chữ và số
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (formValues.newPassword && !passwordRegex.test(formValues.newPassword)) {
      newErrors.newPassword =
        "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ cái và số.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Dừng việc gửi nếu form không hợp lệ

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

  // Toggle show/hide password
  const handleClickShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          width: "100%",
          maxWidth: "500px",
          height: "auto",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Đổi Mật Khẩu
        </Typography>
        <TextField
          label="Mật khẩu hiện tại"
          variant="outlined"
          type={showPassword.currentPassword ? "text" : "password"}
          name="currentPassword"
          value={formValues.currentPassword}
          onChange={handleChange}
          required
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("currentPassword")}
                  edge="end"
                >
                  {showPassword.currentPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          type={showPassword.newPassword ? "text" : "password"}
          name="newPassword"
          value={formValues.newPassword}
          onChange={handleChange}
          required
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("newPassword")}
                  edge="end"
                >
                  {showPassword.newPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          variant="outlined"
          type={showPassword.confirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("confirmPassword")}
                  edge="end"
                >
                  {showPassword.confirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CustomButton
          text="Đổi mật khẩu"
          onClick={handleSubmit}
          type="success"
          loading={loading}
        />
      </Box>
    </Box>
  );
}

export default ChangePassword;
