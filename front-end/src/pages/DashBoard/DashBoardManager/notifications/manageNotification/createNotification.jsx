import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

function CreateNotification() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [recipient, setRecipient] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Details:", details);
    console.log("Recipient:", recipient);
    setTitle("");
    setDetails("");
    setRecipient("all");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
        bgcolor: "background.default",
      }}
    >
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
          height: "500px",
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
        />
        <TextField
          label="Chi tiết"
          variant="outlined"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          multiline
          rows={7}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="recipient-label">Đối tượng</InputLabel>
          <Select
            labelId="recipient-label"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            label="Recipient"
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="students">Sinh viên</MenuItem>
            <MenuItem value="lecturers">Giảng viên</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Gửi thông báo
        </Button>
      </Box>
    </Box>
  );
}

export default CreateNotification;
