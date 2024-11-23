import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { message } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
import { useSelector } from "react-redux";

function EditPointStudent({ onClose }) {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);

  // Dữ liệu mẫu gán cứng
  const selectedGroup = {
    id: 1,
    groupName: "Nhóm 1",
    students: [
      {
        id: 1,
        username: "SV001",
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0123456789",
      },
      {
        id: 2,
        username: "SV002",
        fullName: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0987654321",
      },
    ],
  };

  const objectSelect = {
    discussionPoint: 8,
    progressPoint: 7,
    reportingPoint: 9,
  };

  const [students, setStudents] = useState(selectedGroup?.students || []);
  const [messageApi, contextHolder] = message.useMessage();
  const [discussionPoint, setDiscussionPoint] = useState(
    objectSelect.discussionPoint
  );
  const [progressPoint, setProgressPoint] = useState(
    objectSelect.progressPoint
  );
  const [reportingPoint, setReportingPoint] = useState(
    objectSelect.reportingPoint
  );
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    discussionPoint: "",
    progressPoint: "",
    reportingPoint: "",
  });

  const handleScoreChange = (event, setScore, fieldName) => {
    const value = event.target.value;
    setScore(value);

    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      discussionPoint: "",
      progressPoint: "",
      reportingPoint: "",
    };

    if (discussionPoint === undefined || discussionPoint === "") {
      newErrors.discussionPoint = "Điểm phản biện không được để trống!";
      valid = false;
    } else if (discussionPoint < 0 || discussionPoint > 10) {
      newErrors.discussionPoint = "Điểm phản biện phải từ 0 đến 10!";
      valid = false;
    }

    if (progressPoint === undefined || progressPoint === "") {
      newErrors.progressPoint = "Điểm quá trình không được để trống!";
      valid = false;
    } else if (progressPoint < 0 || progressPoint > 10) {
      newErrors.progressPoint = "Điểm quá trình phải từ 0 đến 10!";
      valid = false;
    }

    if (reportingPoint === undefined || reportingPoint === "") {
      newErrors.reportingPoint = "Điểm báo cáo không được để trống!";
      valid = false;
    } else if (reportingPoint < 0 || reportingPoint > 10) {
      newErrors.reportingPoint = "Điểm báo cáo phải từ 0 đến 10!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setErrors({});
    if (loading) return;
    setLoading(true);

    // Gán cứng phản hồi sau khi lưu
    setTimeout(() => {
      messageApi.success("Điểm đã được lưu thành công!");
      setLoading(false);
    }, 1000);
  };

  return (
    <Box padding={1} sx={{ borderRadius: "20px" }}>
      {contextHolder}
      <Typography variant="h5" color="#1976d2" marginBottom={1}>
        Chấm điểm đề tài
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 2,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" marginBottom={1}>
          Tên nhóm : {`${selectedGroup?.groupName || ""}`}
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <Grid container spacing={2}>
          {students.map((student, index) => (
            <Grid item xs={12} sm={6} key={student.id || index}>
              <Typography variant="subtitle1" fontWeight="bold">
                Sinh viên {index + 1}
              </Typography>
              <TextField
                label="Mã số sinh viên"
                value={student.username}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Họ và tên"
                value={student.fullName}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Email"
                value={student?.email || ""}
                fullWidth
                margin="dense"
                disabled
              />
              <TextField
                label="Số điện thoại"
                value={student?.phone || ""}
                fullWidth
                margin="dense"
                disabled
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginY: 1 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                label="Điểm phản biện"
                type="number"
                fullWidth
                variant="outlined"
                value={discussionPoint}
                onChange={(event) =>
                  handleScoreChange(
                    event,
                    setDiscussionPoint,
                    "discussionPoint"
                  )
                }
                error={Boolean(errors.discussionPoint)}
                helperText={errors.discussionPoint}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                label="Điểm quá trình"
                type="number"
                fullWidth
                variant="outlined"
                value={progressPoint}
                onChange={(event) =>
                  handleScoreChange(event, setProgressPoint, "progressPoint")
                }
                error={Boolean(errors.progressPoint)}
                helperText={errors.progressPoint}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                label="Điểm báo cáo"
                type="number"
                fullWidth
                variant="outlined"
                value={reportingPoint}
                onChange={(event) =>
                  handleScoreChange(event, setReportingPoint, "reportingPoint")
                }
                error={Boolean(errors.reportingPoint)}
                helperText={errors.reportingPoint}
              />
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Box>
            <CustomButton
              text="Sửa điểm"
              type="success"
              sx={{ marginRight: 2 }}
              onClick={handleSubmit}
              loading={loading}
            />

            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditPointStudent;
