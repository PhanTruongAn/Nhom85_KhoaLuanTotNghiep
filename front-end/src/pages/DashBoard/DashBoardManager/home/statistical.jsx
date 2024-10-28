import React from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import Image1 from "../../../../images/anhdong/Statistical.jpg";

// Register plugins
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
  // Data for bar chart (overview)
  const barData = {
    labels: ["Sinh viên", "Điểm TB", "Giáo viên", "Đề tài"],
    datasets: [
      {
        label: "Thống kê tổng quan",
        data: [20, 7.8, 15, 5],
        backgroundColor: ["#26c6da", "#66bb6a", "#ec407a", "#ffeb3b"],
        borderColor: ["#006064", "#1b5e20", "#880e4f", "#f57f17"],
        borderWidth: 1,
      },
    ],
  };

  // Data for pie charts
  const gradeData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        data: [5, 8, 4, 2, 1, 0], // Sample grade data
        backgroundColor: [
          "#4caf50",
          "#8bc34a",
          "#ffeb3b",
          "#ff9800",
          "#f44336",
          "#9e9e9e",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const facultyData = {
    labels: ["Khoa CNTT", "Khoa Truyền Thông", "Khoa Khoa Học Máy Tính"],
    datasets: [
      {
        data: [12, 5, 3], // Sample faculty data
        backgroundColor: ["#2196f3", "#ff5722", "#3f51b5"],
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
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => (value > 0 ? value : null), // Display value only if greater than 0
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
      datalabels: {
        color: "#fff", // Set label color to white
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => (value > 0 ? value : null), // Display value only if greater than 0
      },
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Image Banner */}
      <Box
        sx={{
          backgroundImage: `url(${Image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 2,
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

        {/* Pie Chart for Faculty Distribution - Half Width */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Biểu Đồ Tròn - Phân Bổ Theo Khoa
            </Typography>
            <Pie data={facultyData} options={pieOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statistical;
