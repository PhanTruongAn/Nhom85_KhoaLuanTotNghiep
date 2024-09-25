import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { Table, message } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CreateGroupModal from "./CreateGroupModal"; // Nhập modal bạn đã tạo

const CreateGroupStudent = () => {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Trạng thái mở modal

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setJsonData(json);
      }, 1000);
    };
    reader.readAsArrayBuffer(file);
  };

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Mã đề tài",
      dataIndex: "topicId",
      key: "topicId",
    },
  ];

  const handleConfirm = () => {
    message.success("Dữ liệu đã được xác nhận!");
  };

  const handleCancel = () => {
    setJsonData([]);
    message.info("Đã hủy bỏ!");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
          >
            Thêm nhóm mới
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px 0px 5px 0px",
          fontSize: "18px",
          textAlign: "center",
          fontWeight: "600px",
        }}
      >
        DANH SÁCH NHÓM
      </Box>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={jsonData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
      <Button
        sx={{
          marginTop: "10px",
          textTransform: "none",
        }}
        variant="contained"
        onClick={handleConfirm}
        size="small"
        startIcon={<CheckIcon />}
      >
        Xác nhận
      </Button>
      <Button
        sx={{
          marginTop: "10px",
          marginLeft: "10px",
          textTransform: "none",
        }}
        variant="contained"
        color="error"
        size="small"
        onClick={handleCancel}
        startIcon={<ClearIcon />}
      >
        Hủy bỏ
      </Button>
      <CreateGroupModal isOpen={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default CreateGroupStudent;