import React, { useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import { Button, Box } from "@mui/material";
import studentApi from "../../../../apis/studentApi";
import { toast } from "react-toastify";
import { Table, message } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddModal from "./AddModal";
const AccountStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [jsonData, setJsonData] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const persistDataToSave = () => {
    const data = _.cloneDeep(jsonData);
    const dataPersist = [];
    Object.entries(data).map(([key, value]) => {
      dataPersist.push({
        fullName: value.FullName,
        username: value.MaSinhVien,
        password: "123",
      });
    });
    return dataPersist;
  };

  const handlerSubmit = async () => {
    setLoading(true);
    const data = persistDataToSave();
    const result = await studentApi.createAccountsStudent(data);
    if (result.status === 0) {
      messageApi.success(result.message);
      handleCancel();
    } else {
      setLoading(false);
      messageApi.error(result.message);
    }
  };

  const handleCancel = () => {
    setLoading(true);
    document.getElementById("file-input").value = "";
    setTimeout(() => {
      setJsonData([]);
      setLoading(false);
    }, 1000);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "fullName",
    },
    {
      title: "Student ID",
      dataIndex: "MaSinhVien",
      key: "studentId",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email",
    },
  ];

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box className="container-fluid">
      {contextHolder}
      <Box className="row col-12">
        <Box className="col-6">
          <Box sx={{ padding: "10px 0px 10px 0px", fontSize: "18px" }}>
            Tải file danh sách sinh viên
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
            Thêm tài khoản sinh viên
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
        DANH SÁCH SINH VIÊN
      </Box>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={jsonData}
        columns={columns}
        rowKey="MaSinhVien"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
      <Button
        sx={{ alignSelf: "right", marginTop: "10px", textTransform: "none" }}
        variant="contained"
        onClick={handlerSubmit}
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
        onClick={handleCancel}
        color="error"
        size="small"
        startIcon={<ClearIcon />}
      >
        Hủy bỏ
      </Button>
      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
};

export default AccountStudent;
