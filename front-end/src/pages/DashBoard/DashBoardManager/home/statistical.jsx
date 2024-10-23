import React, { useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Thống Kê
      </Typography>
      <Grid container spacing={2}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={[
                (theme) => ({
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? stat.color.dark
                      : stat.color.light,
                }),
              ]}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Statistical;
