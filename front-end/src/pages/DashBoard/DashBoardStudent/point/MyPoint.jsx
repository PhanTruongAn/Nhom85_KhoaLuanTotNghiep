import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Table } from "antd";
import { TableOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Điểm Hướng dẫn",
    dataIndex: "guidanceScore",
    key: "guidanceScore",
  },
  {
    title: "Điểm Phản biện",
    dataIndex: "reviewScore",
    key: "reviewScore",
  },
  {
    title: "Điểm Báo cáo",
    dataIndex: "reportScore",
    key: "reportScore",
  },
  {
    title: "Điểm Trung bình",
    dataIndex: "averageScore",
    key: "averageScore",
  },
];

const data = [
  {
    key: "1",
    guidanceScore: "Chưa có điểm",
    reviewScore: "Chưa có điểm",
    reportScore: "Chưa có điểm",
    averageScore: "Chưa có điểm",
  },
];

function MyPoint() {
  return (
    <Box padding={3} sx={{ width: "100%", height: "580px", borderRadius: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        marginBottom={2}
        sx={{ justifyContent: "center" }}
      >
        <TableOutlined
          style={{ fontSize: "34px", marginRight: "8px", color: "#1976d2" }}
        />
        <Typography variant="h4" color="#1976d2">
          Bảng Điểm Của Tôi
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 2,
          padding: "18px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body1">
          <strong>Họ tên:</strong> Điều Phan Quang Dũng
        </Typography>
        <Typography variant="body1">
          <strong>MSSV:</strong> 20093921
        </Typography>
        <Typography variant="body1">
          <strong>Giới tính:</strong> Nam
        </Typography>
        <Typography variant="body1">
          <strong>Chuyên ngành:</strong> Kỹ thuật phần mềm
        </Typography>
      </Box>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
        locale={{
          emptyText: "Chưa có dữ liệu",
        }}
        style={{
          marginTop: "16px",
          padding: "10px",
          borderRadius: "8px",
        }}
      />
    </Box>
  );
}

export default MyPoint;
