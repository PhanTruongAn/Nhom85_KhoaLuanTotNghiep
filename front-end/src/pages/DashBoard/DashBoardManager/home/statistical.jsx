import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function Statistical() {
  // Dữ liệu cứng về sinh viên, nhóm, giáo viên, môn chuyên ngành và đề tài
  const students = 20;
  const groups = 7;
  const avgScore = 7.8;
  const teachers = 15;
  const specializedSubjects = 10;
  const topics = 5;

  // Component hiển thị các thống kê
  const statsData = [
    { label: "Tổng số sinh viên", value: students, icon: "📅" },
    { label: "Tổng số nhóm", value: groups, icon: "👥" },
    { label: "Điểm trung bình", value: avgScore, icon: "📈" },
    { label: "Tổng số giảng viên", value: teachers, icon: "👨‍🏫" },
    {
      label: "Tổng số môn chuyên ngành",
      value: specializedSubjects,
      icon: "📚",
    },
    { label: "Tổng số đề tài", value: topics, icon: "📑" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Thống Kê
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {statsData.map((stat, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              width: { xs: "100%", sm: "45%", md: "30%" }, // responsive width
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                fontSize: "40px",
                marginRight: 2,
              }}
            >
              {stat.icon}
            </Box>
            <Box>
              <Typography variant="h5" component="div">
                {stat.value}
              </Typography>
              <Typography variant="body2">{stat.label}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Statistical;
