import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Grow } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

function ConfirmModal({
  open,
  onClose,
  icon,
  onConfirm,
  description,
  loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 400, exit: 300 }}
      keepMounted
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "#1C1C1C" // Nền modal tối khi theme Dark
              : "#ffffff", // Nền sáng khi theme Light
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          mt: 2,
          width: 80, // Kích thước của hình tròn
          height: 80,
          borderRadius: "50%", // Bo tròn
          backgroundColor: "rgba(25, 118, 210, 0.2)",
        }}
      >
        {React.cloneElement(icon, { sx: { fontSize: 50, color: "#1976D2" } })}
      </Box>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Căn đều giữa
            width: "100%",
            gap: 2, // Khoảng cách giữa các nút
          }}
        >
          <Button
            fullWidth
            startIcon={<ClearIcon />}
            onClick={onClose}
            color="error"
            variant="contained"
          >
            Hủy
          </Button>
          <Button
            fullWidth
            onClick={onConfirm}
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="success" />
              ) : (
                React.cloneElement(icon, {
                  sx: { fontSize: 20, color: "white" },
                })
              )
            }
            disabled={loading}
          >
            Xác nhận
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConfirmModal;
