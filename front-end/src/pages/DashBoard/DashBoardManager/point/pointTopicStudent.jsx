import { useState, useEffect } from "react";
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
import lecturerApi from "../../../../apis/lecturerApi";
import CustomButton from "../../../../components/Button/CustomButton";
import { useSelector } from "react-redux";
function PointTopicStudent({ selectedGroup, onClose, typeLecturer }) {
  const isLecturerAdvisor = typeLecturer === "gvHuongDan";
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [students, setStudents] = useState(selectedGroup?.students || []);
  const [messageApi, contextHolder] = message.useMessage();
  const [discussionPoint, setDiscussionPoint] = useState("");
  const [progressPoint, setProgressPoint] = useState("");
  const [reportingPoint, setReportingPoint] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const handleScoreChange = (event, setScore) => {
    const value = event.target.value;
    setScore(value);
  };

  const averagePoint =
    (parseFloat(discussionPoint || 0) +
      parseFloat(progressPoint || 0) +
      parseFloat(reportingPoint || 0)) /
    3;

  useEffect(() => {
    setStudents(selectedGroup?.students || []);
    setDiscussionPoint("");
    setProgressPoint("");
    setReportingPoint("");
    setComment("");
  }, [selectedGroup]);

  const handleSubmit = async () => {
    setLoading(true);
    const dataToSave = {
      discussionPoint,
      progressPoint,
      reportingPoint,
      comment,
      averagePoint,
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
          Tên đề tài: Đề tài A
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
            <TextField
              label="Điểm phản biện"
              type="number"
              fullWidth
              variant="outlined"
              value={discussionPoint}
              onChange={(event) => handleScoreChange(event, setDiscussionPoint)}
              disabled={isLecturerAdvisor}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Điểm quá trình"
              type="number"
              fullWidth
              variant="outlined"
              value={progressPoint}
              onChange={(event) => handleScoreChange(event, setProgressPoint)}
              disabled={!isLecturerAdvisor}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Điểm báo cáo"
              type="number"
              fullWidth
              variant="outlined"
              value={reportingPoint}
              onChange={(event) => handleScoreChange(event, setReportingPoint)}
              disabled={isLecturerAdvisor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Điểm trung bình"
              type="number"
              fullWidth
              variant="outlined"
              disabled
              value={averagePoint.toFixed(2)}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Box display="flex" justifyContent="space-between" marginTop={3}>
          <Box>
            <CustomButton
              text="Chấm điểm"
              type="success"
              sx={{ marginRight: 2 }}
              onClick={handleSubmit}
              loading={loading}
            />

            <Button variant="contained" color="error" onClick={onClose}>
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
};
export default PointTopicStudent;
