import React, { useState, useRef } from "react"; // Thêm useRef
import { Button, Box, IconButton } from "@mui/material";
import { Table, message, Tooltip, Select, Modal, Space } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { InfoCircleOutlined } from "@ant-design/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";

const { Option } = Select;

const ManagerTopic = () => {
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef(null); // Tạo ref cho input file

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      messageApi.error("Vui lòng chọn một file Excel.");
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

        messageApi.success("Dữ liệu file đã được tải thành công!");
      } catch (error) {
        messageApi.error("Lỗi khi đọc file. Vui lòng kiểm tra lại định dạng.");
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSheetChange = (value) => {
    setSelectedSheet(value);
  };

  const handleViewDetails = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    messageApi.warning(`Đã xóa đề tài: ${record["Tên đề tài"]}`);
    const updatedData = jsonData[selectedSheet].filter(
      (item) => item["Tên đề tài"] !== record["Tên đề tài"]
    );
    setJsonData({ ...jsonData, [selectedSheet]: updatedData });
  };

  const columns = [
    {
      title: "Tên đề tài",
      dataIndex: "Tên đề tài",
      key: "Tên đề tài",
      ellipsis: true,
    },
    {
      title: "Mô tả đề tài",
      dataIndex: "Mô tả",
      key: "Mô tả",
      ellipsis: true,
    },
    {
      title: "Mục tiêu",
      dataIndex: "Mục tiêu đề tài",
      key: "Mục tiêu đề tài",
      ellipsis: true,
    },

    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Box>
          <Space>
            <Button
              onClick={() => handleViewDetails(record)}
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
              endIcon={<InfoCircleOutlined />}
            >
              Xem chi tiết
            </Button>

            <Button
              onClick={() => handleDelete(record)}
              variant="contained"
              size="small"
              color="error"
              sx={{ textTransform: "none" }}
              endIcon={<InfoCircleOutlined />}
            >
              Xóa
            </Button>
          </Space>
        </Box>
      ),
    },
  ];

  const handleConfirm = () => {
    if (!jsonData[selectedSheet] || jsonData[selectedSheet].length === 0) {
      messageApi.warning("Chưa có dữ liệu file để xác nhận.");
      return;
    }
    messageApi.success("Dữ liệu file đã được xác nhận!");
  };

  const handleCancel = () => {
    setJsonData({});
    messageApi.info("Đã hủy bỏ file dữ liệu!");
    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Xóa file đang chọn
    }
  };

  return (
    <Box className="container-fluid">
      {contextHolder}
      <Box className="row col-12">
        <Box className="col-6">
          <Box sx={{ padding: "10px 0px 10px 0px", fontSize: "18px" }}>
            Tải file danh sách đề tài
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
                  style={{ display: "none" }}
                  ref={fileInputRef} // Gán ref cho input file
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
            <Box>
              <Space>
                <Box>Giảng viên: </Box>
                <Select
                  style={{ width: 200 }}
                  value={selectedSheet}
                  onChange={handleSheetChange}
                  placeholder="Chọn Sheet"
                >
                  {sheetNames.map((sheetName) => (
                    <Option key={sheetName} value={sheetName}>
                      {sheetName}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Box>
          )}
        </Box>
      </Box>

      <Table
        style={{ marginTop: "10px" }}
        dataSource={jsonData[selectedSheet] || []}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 4 }}
        loading={loading}
        locale={{
          emptyText: "Chưa có dữ liệu",
        }}
      />

      <Box sx={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          onClick={handleConfirm}
          size="small"
          startIcon={<CheckIcon />}
        >
          Tạo đề tài
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

      <Modal
        title="Chi tiết đề tài"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={"80%"}
      >
        {currentRecord && (
          <Box>
            {Object.keys(currentRecord).map((key) => (
              <Box key={key} sx={{ marginBottom: "10px" }}>
                <strong>{key}:</strong> {currentRecord[key]}
              </Box>
            ))}
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default ManagerTopic;
