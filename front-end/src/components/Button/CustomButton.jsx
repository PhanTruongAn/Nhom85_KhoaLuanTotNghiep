import React from "react";
import { Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
function CustomButton({ onClick, loading, text, type }) {
  const isSuccess = type === "success";
  return (
    <Button
      variant="contained"
      color={isSuccess ? "success" : "error"}
      size="small"
      onClick={onClick}
      startIcon={
        loading ? (
          <CircularProgress size={20} color={isSuccess ? "success" : "error"} />
        ) : isSuccess ? (
          <CheckIcon />
        ) : (
          <ClearIcon />
        )
      }
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
}

export default CustomButton;
