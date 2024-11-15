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
  const handleScoreChange = (event, setScore) => {
    const value = event.target.value;
    setScore(value);
  };

  const handleSubmit = async () => {
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
                    handleScoreChange(event, setDiscussionPoint)
                  }
                  disabled={
                    isLecturerAdvisor || objectSelect?.discussionPoint != null
                  }
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
                    handleScoreChange(event, setProgressPoint)
                  }
                  disabled={!isLecturerAdvisor || objectSelect?.progressPoint}
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
                    handleScoreChange(event, setReportingPoint)
                  }
                  disabled={
                    isLecturerAdvisor || objectSelect?.reportingPoint != null
                  }
                />
              )}
            </Box>
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
