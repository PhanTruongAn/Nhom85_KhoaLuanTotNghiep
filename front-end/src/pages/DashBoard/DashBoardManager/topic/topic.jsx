import React, { useState, useRef } from "react"; // Thêm useRef
import { Button, Box, IconButton } from "@mui/material";
import { Table, message, Tooltip, Select, Modal, Space } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import EmptyData from "../../../../components/emptydata/EmptyData";
import _ from "lodash";
import * as XLSX from "xlsx";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomButton from "../../../../components/Button/CustomButton";
const { Option } = Select;

const ManagerTopic = () => {
  const user = useSelector((state) => state.userInit.user);
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    loadingSuccess: false,
    loadingError: false,
  });
  const [selectedSheet, setSelectedSheet] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef(null); // Tạo ref cho input file

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const buildDataToSave = () => {
    const data = _.cloneDeep(jsonData[selectedSheet]);
    const dataSave = [];
    Object.entries(data).map(([key, value]) => {
      dataSave.push({
        title: value["Tên đề tài"],
        description: value["Mô tả"],
        goals: value["Mục tiêu đề tài"],
        requirement: value["Yêu cầu đầu vào"],
        standardOutput: value["Yêu cầu đầu ra"],
        quantityGroup: value["Số lượng nhóm"],
        lecturerId: user.id,
      });
    });
    return dataSave;
  };
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
      title: "Số lượng nhóm",
      dataIndex: "Số lượng nhóm",
      key: "Số lượng nhóm",
      align: "center",
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
              endIcon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Space>
        </Box>
      ),
    },
  ];

  const handleConfirm = async () => {
    updateState({ loadingSuccess: true });
    if (!jsonData[selectedSheet] || jsonData[selectedSheet].length === 0) {
      messageApi.warning("Chưa chọn file dữ liệu!.");
      updateState({ loadingSuccess: false });
    } else {
      setLoading(true);
      const dataSave = buildDataToSave();
      const res = await lecturerApi.createTopics(dataSave);
      if (res && res.status === 0) {
        updateState({ loadingSuccess: false });
        setLoading(false);
        setJsonData({});
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Xóa file đang chọn
        }
        messageApi.success(res.message);
      } else {
        updateState({ loadingSuccess: false });
        setLoading(false);
        messageApi.error(res.message);
      }
    }
  };

  const handleCancel = () => {
    updateState({ loadingError: true });
    setTimeout(() => {
      updateState({ loadingError: false });
      setJsonData({});
      messageApi.info("Đã hủy bỏ file dữ liệu!");
      // Reset input file
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Xóa file đang chọn
      }
    }, 1000);
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
                <Box>Sheet Name: </Box>
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

      {jsonData[selectedSheet] && jsonData[selectedSheet].length > 0 ? (
        <Table
          style={{ marginTop: "10px" }}
          dataSource={jsonData[selectedSheet] || []}
          columns={columns}
          rowKey={(record) => record["Tên đề tài"]}
          pagination={{ pageSize: 4 }}
          loading={loading}
        />
      ) : (
        <Table
          style={{
            padding: "10px",
            borderRadius: "8px",
            height: "400px",
          }}
          columns={columns}
          dataSource={[]}
          pagination={false}
          rowKey="dataIndex"
          locale={{
            emptyText: (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "auto",
                }}
              >
                <EmptyData text={"Bạn hãy chọn file!"} />
              </Box>
            ),
          }}
        />
      )}

      <Box sx={{ marginTop: "10px" }}>
        <Space>
          <CustomButton
            onClick={handleConfirm}
            text={"Tạo đề tài"}
            loading={state.loadingSuccess}
            type="success"
          />
          <CustomButton
            onClick={handleCancel}
            text={"Hủy bỏ"}
            loading={state.loadingError}
            type="error"
          />
        </Space>
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
