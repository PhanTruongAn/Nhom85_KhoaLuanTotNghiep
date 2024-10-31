import React from "react";
import { Button, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CachedIcon from "@mui/icons-material/Cached";
import PropTypes from "prop-types";
function CustomButton({ onClick, loading, text, type, sx, disabled }) {
  const isSuccess = type === "success";
  const isError = type === "error";
  const isInfo = type === "refresh";
  return (
    <Button
      sx={sx ? sx : {}}
      variant="contained"
      color={isSuccess ? "success" : isError ? "error" : "primary"}
      // size="small"
      onClick={onClick}
      startIcon={
        loading ? (
          <CircularProgress
            size={20}
            color={isSuccess ? "success" : isError ? "error" : "primary"}
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
CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default CustomButton;
