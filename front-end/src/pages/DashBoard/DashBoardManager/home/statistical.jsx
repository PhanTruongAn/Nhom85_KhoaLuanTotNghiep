import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Image1 from "../../../../images/anhdong/Statistical.jpg";

function Statistical() {
  // Dữ liệu cứng về sinh viên, nhóm, giáo viên, môn chuyên ngành và đề tài
  const students = 20;
  const groups = 7;
  const avgScore = 7.8;
  const teachers = 15;
  const specializedSubjects = 10;
  const topics = 5;

  const statsData = [
    {
      label: "Tổng số sinh viên",
      value: students,
      icon: "📅",
      color: {
        light: "#e0f7fa",
        dark: "#006064",
      },
    },
    {
      label: "Tổng số nhóm",
      value: groups,
      icon: "👥",
      color: {
        light: "#fff3e0",
        dark: "#bf360c",
      },
    },
    {
      label: "Điểm trung bình",
      value: avgScore,
      icon: "📈",
      color: {
        light: "#e8f5e9",
        dark: "#1b5e20",
      },
    },
    {
      label: "Tổng số giáo viên",
      value: teachers,
      icon: "👨‍🏫",
      color: {
        light: "#fce4ec",
        dark: "#880e4f",
      },
    },
    {
      label: "Tổng số môn chuyên ngành",
      value: specializedSubjects,
      icon: "📚",
      color: {
        light: "#f3e5f5",
        dark: "#4a148c",
      },
    },
    {
      label: "Tổng số đề tài",
      value: topics,
      icon: "📑",
      color: {
        light: "#fffde7",
        dark: "#f57f17",
      },
    },
  ];

  // Sum all numerical data for summary
  const totalEntries =
    students + groups + teachers + specializedSubjects + topics;

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
          mb: 4, // Space between image and statistics
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

      {/* Statistics Grid */}
      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={[
                (theme) => ({
                  padding: 3,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 3,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? stat.color.dark
                      : stat.color.light,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)", // Enlarges on hover
                  },
                }),
              ]}
            >
              <Box
                sx={{
                  fontSize: "50px",
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Statistical;
