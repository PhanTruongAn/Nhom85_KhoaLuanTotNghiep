import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Table } from "antd";
import { TableOutlined } from "@ant-design/icons";
import EmptyData from "../emptydata/EmptyData";

const initialColumns = [
  {
    title: "Thông tin chung",
    dataIndex: "generalInfo",
    key: "generalInfo",
    visible: true,
  },
  {
    title: "Lớp chuyên ngành",
    dataIndex: "specializedClass",
    key: "specializedClass",
    visible: true,
  },
  {
    title: "Điểm Hướng dẫn",
    dataIndex: "guidanceScore",
    key: "guidanceScore",
    visible: true,
  },
  {
    title: "Điểm Phản biện",
    dataIndex: "reviewScore",
    key: "reviewScore",
    visible: true,
  },
  {
    title: "Điểm Báo cáo",
    dataIndex: "reportScore",
    key: "reportScore",
    visible: true,
  },
  {
    title: "Điểm Trung bình",
    dataIndex: "averageScore",
    key: "averageScore",
    visible: true,
  },
  { title: "Tình trạng", dataIndex: "status", key: "status", visible: true },
];

const data = []; // Giữ data rỗng để hiển thị thông báo không có dữ liệu

function MyPoint() {
  const [columns, setColumns] = useState(initialColumns);
  const [openDialog, setOpenDialog] = useState(false);

  const handleToggleColumn = (key) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleShowAll = () => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({ ...col, visible: true }))
    );
  };

  const handleHideAll = () => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({ ...col, visible: false }))
    );
  };

  const visibleColumns = columns.filter((col) => col.visible);

  return (
    <Box
      padding={3}
      sx={{
        width: "100%",
        height: "580px",
        borderRadius: 2,
      }}
    >
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TableOutlined
          style={{ fontSize: "24px", marginRight: "8px", color: "#1976d2" }}
        />
        <Typography variant="h5" color="#1976d2">
          Điểm của tôi
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{
          marginBottom: "16px",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        Điều chỉnh cột hiển thị
      </Button>

      {/* Hộp thoại điều chỉnh cột */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Điều chỉnh Cột hiển thị</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {columns.map((col) => (
              <FormControlLabel
                key={col.key}
                control={
                  <Checkbox
                    checked={col.visible}
                    onChange={() => handleToggleColumn(col.key)}
                    color="primary"
                  />
                }
                label={col.title}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideAll} color="secondary">
            Ẩn tất cả
          </Button>
          <Button onClick={handleShowAll} color="secondary">
            Hiện tất cả
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị bảng hoặc thông báo không có dữ liệu */}
      {data.length === 0 ? (
        <Table
          style={{
            padding: "10px",
            borderRadius: "8px",
            height: "400px",
          }}
          columns={visibleColumns}
          dataSource={[]}
          pagination={false}
          rowKey="dataIndex"
          locale={{
            emptyText: (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                paddingTop={"50px"}
                style={{ height: "100%" }}
              >
                <EmptyData />
              </Box>
            ),
          }}
        />
      ) : (
        <Table
          style={{
            padding: "10px",
            borderRadius: "8px",
            height: "400px",
          }}
          columns={visibleColumns}
          dataSource={data}
          pagination={false}
          rowKey="dataIndex"
        />
      )}
    </Box>
  );
}

export default MyPoint;
