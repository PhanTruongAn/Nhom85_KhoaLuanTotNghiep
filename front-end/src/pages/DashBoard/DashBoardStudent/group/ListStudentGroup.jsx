import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import "./ListStudentGroup.scss";

const allGroups = [
  { name: "Nhóm 1", students: ["Sinh viên A", "Sinh viên B"] },
  { name: "Nhóm 2", students: ["Sinh viên C"] },
  { name: "Nhóm 3", students: [] },
  { name: "Nhóm 4", students: ["Sinh viên D"] },
  { name: "Nhóm 5", students: ["Sinh viên E"] },
  { name: "Nhóm 6", students: [] },
  { name: "Nhóm 7", students: [] },
  { name: "Nhóm 8", students: [] },
  { name: "Nhóm 9", students: [] },
  { name: "Nhóm 10", students: [] },
  { name: "Nhóm 11", students: [] },
  { name: "Nhóm 12", students: [] },
  { name: "Nhóm 13", students: [] },
  { name: "Nhóm 14", students: [] },
  { name: "Nhóm 15", students: [] },
  { name: "Nhóm 16", students: [] },
];

function ListStudentGroup() {
  const [visibleGroups, setVisibleGroups] = useState(12);
  const containerRef = useRef(null);

  const loadMoreGroups = () => {
    setVisibleGroups((prev) => Math.min(prev + 12, allGroups.length));
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreGroups();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box className="list-container" ref={containerRef}>
      <Grid container spacing={2}>
        {allGroups.slice(0, visibleGroups).map((group, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card variant="elevation">
              <CardContent>
                <Typography variant="h5" component="div">
                  {group.name}
                </Typography>
                <Divider sx={{ my: 1, borderBottomWidth: 2 }} />
                <Typography sx={{ mb: "10px" }} color="text.secondary">
                  Số lượng sinh viên: {group.students.length}/2
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Tham gia nhóm
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListStudentGroup;
