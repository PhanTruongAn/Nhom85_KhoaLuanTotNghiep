import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";

function OneAccount({ onClose }) {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Submitting:", { fullName, studentId, email, password });
    // You can call an API to save the account details
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <TextField
        label="Student ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      <Button
        sx={{ marginLeft: "10px", mt: 2 }}
        variant="contained"
        onClick={onClose}
        color="error"
      >
        Close
      </Button>
    </Box>
  );
}

export default OneAccount;
