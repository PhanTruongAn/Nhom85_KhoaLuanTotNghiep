import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
} from "@mui/material";

function Statistical() {
  const [chartType, setChartType] = useState("avgScore");

  // Dữ liệu cứng về 20 sinh viên
  const students = [
    { id: 1, name: "Student 1", score: 8.5, group: "A" },
    { id: 2, name: "Student 2", score: 7.8, group: "A" },
    { id: 3, name: "Student 3", score: 9.2, group: "A" },
    { id: 4, name: "Student 4", score: 6.4, group: "B" },
    { id: 5, name: "Student 5", score: 7.2, group: "B" },
    { id: 6, name: "Student 6", score: 5.8, group: "B" },
    { id: 7, name: "Student 7", score: 8.0, group: "C" },
    { id: 8, name: "Student 8", score: 7.3, group: "C" },
    { id: 9, name: "Student 9", score: 6.9, group: "C" },
    { id: 10, name: "Student 10", score: 9.5, group: "D" },
    { id: 11, name: "Student 11", score: 8.2, group: "D" },
    { id: 12, name: "Student 12", score: 6.3, group: "D" },
    { id: 13, name: "Student 13", score: 8.9, group: "E" },
    { id: 14, name: "Student 14", score: 9.1, group: "E" },
    { id: 15, name: "Student 15", score: 7.6, group: "E" },
    { id: 16, name: "Student 16", score: 5.4, group: "F" },
    { id: 17, name: "Student 17", score: 6.5, group: "F" },
    { id: 18, name: "Student 18", score: 7.0, group: "F" },
    { id: 19, name: "Student 19", score: 7.9, group: "G" },
    { id: 20, name: "Student 20", score: 9.2, group: "G" },
  ];

  // Chuyển đổi điểm từ thang điểm 10 sang thang điểm 4
  const convertToFourScale = (score) => {
    if (score >= 9) return 4.0;
    if (score >= 8) return 3.0;
    if (score >= 7) return 2.0;
    if (score >= 6) return 1.0;
    return 0.0;
  };

  const studentsWithFourScale = students.map((student) => ({
    ...student,
    fourScale: convertToFourScale(student.score),
  }));

  // Thống kê số lượng sinh viên ở từng mức thang điểm 4
  const gradeCounts = studentsWithFourScale.reduce(
    (acc, student) => {
      if (student.fourScale === 4.0) acc.A += 1;
      else if (student.fourScale === 3.0) acc.B += 1;
      else if (student.fourScale === 2.0) acc.C += 1;
      else if (student.fourScale === 1.0) acc.D += 1;
      else acc.F += 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, F: 0 }
  );

  const gradeData = Object.keys(gradeCounts).map((key) => ({
    grade: key,
    count: gradeCounts[key],
  }));

  // Thống kê số lượng nhóm đạt theo từng thang điểm 4
  const groupGrades = studentsWithFourScale.reduce((acc, student) => {
    const { group, fourScale } = student;
    if (!acc[group]) acc[group] = new Set();
    acc[group].add(fourScale);
    return acc;
  }, {});

  const groupsByGrade = Object.values(groupGrades).reduce(
    (acc, grades) => {
      if (grades.has(4.0)) acc.A += 1;
      if (grades.has(3.0)) acc.B += 1;
      if (grades.has(2.0)) acc.C += 1;
      if (grades.has(1.0)) acc.D += 1;
      if (grades.has(0.0)) acc.F += 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, F: 0 }
  );

  const groupGradeData = Object.keys(groupsByGrade).map((key) => ({
    grade: key,
    count: groupsByGrade[key],
  }));

  // Chọn dữ liệu hiển thị dựa trên loại biểu đồ
  const getData = () => {
    switch (chartType) {
      case "totalStudents":
        return [{ name: "Total Students", value: students.length }];
      case "totalGroups":
        return groupGradeData;
      case "avgScore":
        return gradeData;
      default:
        return gradeData;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ overflow: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Thống Kê Sinh Viên
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Chọn loại thống kê</InputLabel>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            label="Chọn loại thống kê"
          >
            <MenuItem value="avgScore">
              Thống kê điểm theo thang điểm 4
            </MenuItem>
            <MenuItem value="totalStudents">
              Thống kê tổng số sinh viên
            </MenuItem>
            <MenuItem value="totalGroups">Thống kê số lượng nhóm đạt</MenuItem>
          </Select>
        </FormControl>

        <Paper elevation={3} sx={{ padding: 1 }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={getData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={
                  chartType === "totalGroups" || chartType === "avgScore"
                    ? "grade"
                    : "name"
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={
                  chartType === "avgScore" || chartType === "totalGroups"
                    ? "count"
                    : "value"
                }
                fill={
                  chartType === "avgScore" || chartType === "totalGroups"
                    ? "#8884d8"
                    : "#82ca9d"
                }
                name={
                  chartType === "avgScore"
                    ? "Số lượng học sinh"
                    : chartType === "totalStudents"
                    ? "Tổng số sinh viên"
                    : "Số nhóm đạt"
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
}

export default Statistical;
