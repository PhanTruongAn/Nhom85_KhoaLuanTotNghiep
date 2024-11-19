import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";
import PropTypes from "prop-types";
import { message } from "antd";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomButton from "../../../../components/Button/CustomButton";
import { useSelector } from "react-redux";

function PointTopicStudent({
  selectedGroup,
  onClose,
  typeLecturer,
  objectSelect,
  loadingData,
}) {
  const isLecturerAdvisor = typeLecturer === "gvHuongDan";
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [students, setStudents] = useState(selectedGroup?.students || []);
  const [messageApi, contextHolder] = message.useMessage();
  const [discussionPoint, setDiscussionPoint] = useState();
  const [progressPoint, setProgressPoint] = useState();
  const [reportingPoint, setReportingPoint] = useState();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    discussionPoint: "",
    progressPoint: "",
    reportingPoint: "",
  });

  // Hàm xử lý khi thay đổi điểm
  const handleScoreChange = (event, setScore, fieldName) => {
    const value = event.target.value;
    setScore(value);

    // Reset lỗi khi có thay đổi
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  // Hàm validate điểm nhập vào
  const validateForm = () => {
    let valid = true;
    let newErrors = {
      discussionPoint: "",
      progressPoint: "",
      reportingPoint: "",
    };

    // Kiểm tra điểm phản biện
    if (discussionPoint === undefined || discussionPoint === "") {
      newErrors.discussionPoint = "Điểm phản biện không được để trống!";
      valid = false;
    } else if (discussionPoint < 0 || discussionPoint > 10) {
      newErrors.discussionPoint = "Điểm phản biện phải từ 0 đến 10!";
      valid = false;
    }

    // Kiểm tra điểm quá trình
    if (progressPoint === undefined || progressPoint === "") {
      newErrors.progressPoint = "Điểm quá trình không được để trống!";
      valid = false;
    } else if (progressPoint < 0 || progressPoint > 10) {
      newErrors.progressPoint = "Điểm quá trình phải từ 0 đến 10!";
      valid = false;
    }

    // Kiểm tra điểm báo cáo
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

  const handleSubmit = async () => {
    if (!validateForm()) return; // Ngừng gửi nếu form không hợp lệ
    setErrors({});
    if (loading) return;
    setLoading(true);
    const dataToSave = {
      discussionPoint,
      progressPoint,
      reportingPoint,
      comment,
      groupId: selectedGroup?.id,
      termId: currentTerm.id,
    };

    const res = await lecturerApi.evaluations(dataToSave);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setLoading(false);
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  return (
    <Box padding={3}>
      {contextHolder}
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
          Tên nhóm : {`Nhóm: ${selectedGroup?.groupName || ""}`}
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

        <Divider sx={{ marginY: 2 }} />

        {/* Grading Section */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>
              {loadingData ? (
                <Skeleton variant="text" width="100%" height={56} />
              ) : (
                <TextField
                  label="Điểm phản biện"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={objectSelect?.discussionPoint ?? discussionPoint ?? ""}
                  onChange={(event) =>
                    handleScoreChange(
                      event,
                      setDiscussionPoint,
                      "discussionPoint"
                    )
                  }
                  disabled={
                    isLecturerAdvisor || Boolean(objectSelect?.discussionPoint)
                  }
                  error={Boolean(errors.discussionPoint)}
                  helperText={errors.discussionPoint}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              {loadingData ? (
                <Skeleton variant="text" width="100%" height={56} />
              ) : (
                <TextField
                  label="Điểm quá trình"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={objectSelect?.progressPoint ?? progressPoint ?? ""}
                  onChange={(event) =>
                    handleScoreChange(event, setProgressPoint, "progressPoint")
                  }
                  disabled={
                    !isLecturerAdvisor || Boolean(objectSelect?.progressPoint)
                  }
                  error={Boolean(errors.progressPoint)}
                  helperText={errors.progressPoint}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              {loadingData ? (
                <Skeleton variant="text" width="100%" height={56} />
              ) : (
                <TextField
                  label="Điểm báo cáo"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={objectSelect?.reportingPoint ?? reportingPoint ?? ""}
                  onChange={(event) =>
                    handleScoreChange(
                      event,
                      setReportingPoint,
                      "reportingPoint"
                    )
                  }
                  disabled={
                    isLecturerAdvisor || Boolean(objectSelect?.reportingPoint)
                  }
                  error={Boolean(errors.reportingPoint)}
                  helperText={errors.reportingPoint}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" marginTop={3}>
          <Box>
            <CustomButton
              text="Chấm điểm"
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

PointTopicStudent.propTypes = {
  selectedGroup: PropTypes.shape({
    id: PropTypes.number,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
      })
    ),
  }),
  typeLecturer: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  objectSelect: PropTypes.object,
  loadingData: PropTypes.bool,
};

export default PointTopicStudent;
