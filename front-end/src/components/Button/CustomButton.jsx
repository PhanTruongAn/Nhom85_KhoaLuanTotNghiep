import React from "react";
import { Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CachedIcon from "@mui/icons-material/Cached";
function CustomButton({ onClick, loading, text, type, sx, disabled }) {
  const isSuccess = type === "success";
  const isError = type === "error";
  const isInfo = type === "refresh";
  return (
    <Button
      sx={sx ? sx : {}}
      variant="contained"
      color={isSuccess ? "info" : isError ? "error" : "primary"}
      // size="small"
      onClick={onClick}
      startIcon={
        loading ? (
          <CircularProgress
            size={20}
            color={isSuccess ? "info" : isError ? "error" : "primary"}
          />
        ) : isSuccess ? (
          <CheckIcon />
        ) : isError ? (
          <ClearIcon />
        ) : (
          <CachedIcon />
        )
      }
      disabled={loading || disabled}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
}

export default CustomButton;
