import { Box, Typography, Paper, Grid } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import managerApi from "../../../../apis/managerApi";
import CustomHooks from "../../../../utils/hooks";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";
import { message } from "antd";
import { isEmpty } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

function Statistical() {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await managerApi.getStatistics(currentTerm.id);
    return res;
  };

  CustomHooks.useQuery(["statistics", currentTerm], getData, {
    enabled: !isEmpty(currentTerm),
    onSuccess: (res) => {
      if (res && res.status === 0) {
        setData(res.data);
      } else {
        messageApi.error(res.message);
      }
    },
    onError: (err) => {
      console.log("Lỗi: ", err.message);
      messageApi.error("Lỗi khi lấy dữ liệu thống kê!");
    },
  });

  // Data for bar chart
  const barData = {
    labels: [
      "Sinh viên",
      "Giáo viên",
      "Nhóm Sinh Viên",
      "Đề tài",
      "Nhóm Giảng Viên",
    ],
    datasets: [
      {
        label: "Thống kê tổng quan",
        data: [
          data.totalStudents || 0,
          data.totalLecturers || 0,
          data.totalGroupsStudent || 0,
          data.totalTopics || 0,
          data.totalGroupsLecturer || 0,
        ],
        backgroundColor: [
          "#26c6da",
          "#66bb6a",
          "#ec407a",
          "#ffeb3b",
          "#ab47bc",
        ],
        borderColor: ["#006064", "#1b5e20", "#880e4f", "#f57f17", "#4a148c"],
        borderWidth: 1,
      },
    ],
  };

  // Data for grade distribution pie chart
  const gradeData = {
    labels: ["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"],
    datasets: [
      {
        data: [
          data.gradeCounts?.["A+"] || 0,
          data.gradeCounts?.["A"] || 0,
          data.gradeCounts?.["B+"] || 0,
          data.gradeCounts?.["B"] || 0,
          data.gradeCounts?.["C+"] || 0,
          data.gradeCounts?.["C"] || 0,
          data.gradeCounts?.["D+"] || 0,
          data.gradeCounts?.["D"] || 0,
          data.gradeCounts?.["F"] || 0,
        ],
        backgroundColor: [
          "#4caf50",
          "#8bc34a",
          "#ffeb3b",
          "#ff9800",
          "#f44336",
          "#9e9e9e",
          "#3f51b5",
          "#673ab7",
          "#e91e63",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Data for majors distribution pie chart
  const majorsData = {
    labels: data.totalMajors?.map((major) => major.majorName) || [],
    datasets: [
      {
        data: data.totalMajors?.map((major) => major.studentCount) || [],
        backgroundColor: [
          "#2196f3",
          "#ff5722",
          "#3f51b5",
          "#9c27b0",
          "#00bcd4",
          "#4caf50",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "center",
        align: "center",
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value) => (value > 0 ? value : null),
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value) => (value > 0 ? value : null),
      },
    },
  };
  console.log("Data: ", data);

  return (
    <Box sx={{ padding: 2 }}>
      {contextHolder}
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 1,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Thống Kê Tổng Quan
        </Typography>
      </Box>

      {/* Bar Chart - Full Width */}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu Đồ Cột - Thống Kê Tổng Quan
            </Typography>
            <Bar data={barData} options={barOptions} />
          </Paper>
        </Grid>

        {/* Pie Chart for Grades - Half Width */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu Đồ Tròn - Phân Bố Điểm
            </Typography>
            <Pie data={gradeData} options={pieOptions} />
          </Paper>
        </Grid>

        {/* Pie Chart for Majors Distribution - Half Width */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu Đồ Tròn - Phân Bổ Theo Ngành
            </Typography>
            <Pie data={majorsData} options={pieOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statistical;
