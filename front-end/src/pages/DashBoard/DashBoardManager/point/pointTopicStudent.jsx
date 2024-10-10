import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

function PointTopicStudent() {
  return (
    <Box padding={3}>
      <Typography variant="h5" color="#1976d2" marginBottom={2}>
        Chấm điểm đề tài
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 2,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" marginBottom={1}>
          Tên đề tài: Đề tài A
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Grid container spacing={2}>
          {/* Student 1 Info */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Sinh viên 1
            </Typography>
            <TextField
              label="Mã số sinh viên"
              value="SV001"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Họ và tên"
              value="Nguyễn Văn A"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Email"
              value="nguyenvana@example.com"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Số điện thoại"
              value="0123456789"
              fullWidth
              margin="dense"
              disabled
            />
          </Grid>

          {/* Student 2 Info */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Sinh viên 2
            </Typography>
            <TextField
              label="Mã số sinh viên"
              value="SV002"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Họ và tên"
              value="Trần Thị B"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Email"
              value="tranthib@example.com"
              fullWidth
              margin="dense"
              disabled
            />
            <TextField
              label="Số điện thoại"
              value="0987654321"
              fullWidth
              margin="dense"
              disabled
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Grading Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Điểm hướng dẫn"
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Điểm phản biện"
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Điểm báo cáo"
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Điểm trung bình"
              type="number"
              fullWidth
              variant="outlined"
              disabled
              value="(Điểm sẽ được tính tự động)" // Placeholder for automatic calculation
            />
          </Grid>
        </Grid>

        <TextField
          label="Nhận xét của giảng viên"
          multiline
          rows={4}
          fullWidth
          margin="dense"
          variant="outlined"
          sx={{ marginTop: 2 }}
        />

        <Box display="flex" justifyContent="space-between" marginTop={3}>
          <Box>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Chấm điểm
            </Button>
            <Button variant="contained" color="error">
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PointTopicStudent;
