import React, { useState } from "react";
import {
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Table, message, Tooltip } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";

const ManagerTopic = () => {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [sheetNames, setSheetNames] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      message.error("Vui lòng chọn một file Excel.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheets = workbook.SheetNames;

        const sheetData = {};
        sheets.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          sheetData[sheetName] = json;
        });

        setSheetNames(sheets);
        setSelectedSheet(sheets[0]); // Chọn sheet đầu tiên mặc định
        setJsonData(sheetData);

        message.success("Dữ liệu đã được tải thành công!");
      } catch (error) {
        message.error("Lỗi khi đọc file. Vui lòng kiểm tra lại định dạng.");
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  console.log("Json: ", jsonData);
  const handleSheetChange = (event) => {
    setSelectedSheet(event.target.value);
  };

  const handleViewDetails = (record) => {
    message.info(`Xem chi tiết của đề tài: ${record["Tên đề tài"]}`);
  };

  const handleDelete = (record) => {
    message.warning(`Đã xóa đề tài: ${record["Tên đề tài"]}`);
    const updatedData = jsonData[selectedSheet].filter(
      (item) => item["Tên đề tài"] !== record["Tên đề tài"]
    );
    setJsonData({ ...jsonData, [selectedSheet]: updatedData });
  };

  // Cột Action và giới hạn nội dung dài
  const columns = [
    {
      title: "Tên đề tài",
      dataIndex: "Tên đề tài",
      key: "Tên đề tài",
      ellipsis: true, // Giới hạn độ dài hiển thị, thay thế bằng "..."
    },
    {
      title: "Mô tả đề tài",
      dataIndex: "Mô tả",
      key: "Mô tả",
      ellipsis: true, // Giới hạn độ dài hiển thị, thay thế bằng "..."
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Box>
          <Tooltip title="Xem chi tiết">
            <IconButton
              color="primary"
              onClick={() => handleViewDetails(record)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton color="error" onClick={() => handleDelete(record)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleConfirm = () => {
    if (!jsonData[selectedSheet] || jsonData[selectedSheet].length === 0) {
      message.warning("Chưa có dữ liệu để xác nhận.");
      return;
    }
    message.success("Dữ liệu đã được xác nhận!");
  };

  const handleCancel = () => {
    setJsonData({});
    message.info("Đã hủy bỏ dữ liệu!");
  };

  return (
    <Box className="container-fluid">
      <Box className="row col-12">
        <Box className="col-6">
          <Box sx={{ padding: "10px 0px 10px 0px", fontSize: "18px" }}>
            Tải file danh sách nhóm
          </Box>
          <Box>
            <label>
              <Button
                startIcon={<UploadFileIcon />}
                component="span"
                variant="contained"
              >
                Tải file
                <input
                  id="file-input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  style={{ display: "none" }} // Ẩn input
                />
              </Button>
            </label>
          </Box>
        </Box>
        <Box
          className="col-6"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {sheetNames.length > 0 && (
            <FormControl fullWidth size="small">
              <InputLabel id="sheet-select-label">Chọn Sheet</InputLabel>
              <Select
                labelId="sheet-select-label"
                value={selectedSheet}
                label="Chọn Sheet"
                onChange={handleSheetChange}
              >
                {sheetNames.map((sheetName) => (
                  <MenuItem key={sheetName} value={sheetName}>
                    {sheetName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>

      <Table
        style={{ marginTop: "10px" }}
        dataSource={jsonData[selectedSheet] || []}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 3 }}
        loading={loading}
        locale={{
          emptyText: "Chưa có dữ liệu",
        }}
      />

      <Button
        variant="contained"
        onClick={handleConfirm}
        size="small"
        startIcon={<CheckIcon />}
      >
        Xác nhận
      </Button>
      <Button
        sx={{
          marginLeft: "10px",
        }}
        variant="contained"
        color="error"
        size="small"
        onClick={handleCancel}
        startIcon={<ClearIcon />}
      >
        Hủy bỏ
      </Button>
    </Box>
  );
};

export default ManagerTopic;
