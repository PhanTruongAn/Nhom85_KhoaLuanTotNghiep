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
import PropTypes from "prop-types";
import { message } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
import { useSelector } from "react-redux";
import managerApi from "../../../../apis/managerApi";

function EditPointStudent({ onClose, selectedRecord, refetch }) {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);

  const [students, setStudents] = useState(
    selectedRecord?.group?.students || []
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [discussionPoint, setDiscussionPoint] = useState(
    selectedRecord?.discussionPoint || undefined
  );
  const [progressPoint, setProgressPoint] = useState(
    selectedRecord?.progressPoint || undefined
  );
  const [reportingPoint, setReportingPoint] = useState(
    selectedRecord?.reportingPoint || undefined
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    discussionPoint: "",
    progressPoint: "",
    reportingPoint: "",
  });

  const handleScoreChange = (event, setScore, fieldName) => {
    const value = event.target.value;
    const numericValue = value === "" ? "" : Number(value);
    setScore(numericValue);
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});

    const data = {
      id: selectedRecord?.id || null,
      discussionPoint: discussionPoint,
      progressPoint: progressPoint,
      reportingPoint: reportingPoint,
    };
    const res = await managerApi.editEvaluation(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setTimeout(() => {
        onClose();
        refetch();
      }, 1500);
    } else {
      messageApi.error(res.message);
    }
    setLoading(false);
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
          <strong>Tên nhóm: </strong>
          {`${selectedRecord?.group?.groupName || ""}`}
        </Typography>
        <Typography variant="h6" marginBottom={1}>
          <strong>Giảng viên hướng dẫn: </strong>
          {`${selectedRecord?.Lecturer?.fullName || ""}`}
        </Typography>
        <Typography variant="h6" marginBottom={1}>
          <strong>Giảng viên phản biện và báo cáo: </strong>
          {`${selectedRecord?.GroupLecturer?.name || ""}`}
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
EditPointStudent.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};
export default EditPointStudent;
