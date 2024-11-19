import { useState } from "react";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { message } from "antd";
import { useSelector } from "react-redux";
import managerApi from "../../../../../apis/managerApi";
import CustomButton from "../../../../../components/Button/CustomButton";

function CreateNotification() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [recipient, setRecipient] = useState("all");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    details: "",
    recipient: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Tiêu đề là bắt buộc!";
    if (!details) newErrors.details = "Chi tiết là bắt buộc!";
    if (!recipient) newErrors.recipient = "Đối tượng là bắt buộc!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    setLoading(true);
    let dataToSave = {
      termId: currentTerm.id,
      title: title,
      content: details,
      recipient: recipient,
    };

    let res = await managerApi.createNote(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setTitle("");
      setDetails("");
      setRecipient("all");
      setLoading(false);
    } else {
      messageApi.error(res.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        p: 3,
        overflowX: "hidden",
        overflowY: "auto",
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
          maxWidth: "900px",
          height: "77vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Gửi thông báo
        </Typography>
        <TextField
          label="Tiêu đề"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Chi tiết"
          variant="outlined"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          multiline
          rows={7}
          required
          error={!!errors.details}
          helperText={errors.details}
        />
        <FormControl fullWidth error={!!errors.recipient}>
          <InputLabel id="recipient-label">Đối tượng</InputLabel>
          <Select
            labelId="recipient-label"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            label="Recipient"
            required
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="student">Sinh viên</MenuItem>
            <MenuItem value="lecturer">Giảng viên</MenuItem>
          </Select>
          {errors.recipient && (
            <Typography color="error" variant="caption">
              {errors.recipient}
            </Typography>
          )}
        </FormControl>
        <CustomButton
          text=" Gửi thông báo"
          onClick={handleSubmit}
          type="success"
          loading={loading}
        />
      </Box>
    </Box>
  );
}

export default CreateNotification;
