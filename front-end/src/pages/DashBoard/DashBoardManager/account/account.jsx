import React, { useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import userApi from "../../../../apis/userApi";
import { toast } from "react-toastify";
import { Table } from "antd";
import OneAccount from "./OneAccount";

const Account = () => {
  const [jsonData, setJsonData] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileInput(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setJsonData(json);
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
    const data = persistDataToSave();
    const result = await userApi.createAccountsStudent(data);
    if (result.status === 0) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleCancel = () => {
    setJsonData([]);
    setFileInput(null);
    document.getElementById("file-input").value = "";
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

  const handleOpenModelOneAccount = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box className="container-fluid">
      <Box className="row col-12">
        <Box className="col-6">
          <Box>Thêm tài khoản sinh viên bằng file excel</Box>
          <Box>
            <input
              id="file-input"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </Box>
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={handlerSubmit}
          >
            Submit
          </Button>
          <Button
            sx={{ marginTop: "10px", marginLeft: "10px" }}
            variant="contained"
            onClick={handleCancel}
            color="error"
          >
            Cancel
          </Button>
        </Box>
        <Box className="col-6">
          <Box>Thêm tài khoản sinh viên</Box>
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={handleOpenModelOneAccount}
          >
            Add Student Account
          </Button>
        </Box>
      </Box>
      <Table
        style={{ marginTop: "10px" }}
        dataSource={jsonData}
        columns={columns}
        rowKey="MaSinhVien"
        pagination={{ pageSize: 5 }}
      />

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Add Student Account</DialogTitle>
        <DialogContent>
          <OneAccount onClose={handleCloseModal} /> {/* Pass onClose prop */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Account;
