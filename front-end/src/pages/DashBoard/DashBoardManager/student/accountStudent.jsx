import React, { useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import { Button, Box } from "@mui/material";
import studentApi from "../../../../apis/studentApi";
import { Space, Table, message } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import AddModal from "./AddModal";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
const AccountStudent = () => {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [state, setState] = useState({
    loadingSuccess: false,
    loadingError: false,
    loadingData: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [jsonData, setJsonData] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [open, setOpen] = useState(false);
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
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
      updateState({ loadingData: true });
      setTimeout(() => {
        updateState({ loadingData: false });
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
        termId: currentTerm.id,
        fullName: value.FullName,
        username: value.MaSinhVien,
        password: "123",
      });
    });
    return dataPersist;
  };

  const handlerSubmit = async () => {
    updateState({ loadingSuccess: true });
    const data = persistDataToSave();
    const result = await studentApi.createAccountsStudent(data);
    if (result.status === 0) {
      updateState({ loadingSuccess: false });
      messageApi.success(result.message);
      document.getElementById("file-input").value = "";
      setJsonData([]);
    } else {
      updateState({ loadingSuccess: false });
      messageApi.error(result.message);
    }
  };

  const handleCancel = () => {
    if (isEmpty(jsonData)) {
      messageApi.warning("Không có file để hủy bỏ!");
      return;
    }
    updateState({ loadingError: true });
    document.getElementById("file-input").value = "";
    setTimeout(() => {
      setJsonData([]);
      updateState({ loadingError: false });
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

      {jsonData.length > 0 ? (
        <Table
          style={{ marginTop: "10px" }}
          dataSource={jsonData}
          columns={columns}
          rowKey="MaSinhVien"
          pagination={{ pageSize: 5 }}
          loading={state.loadingData}
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
          loading={state.loadingData}
          locale={{
            emptyText: (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <EmptyData text={"Bạn hãy chọn file!"} />
              </Box>
            ),
          }}
        />
      )}
      <Space>
        <CustomButton
          onClick={handlerSubmit}
          text={"Xác nhận"}
          type="success"
          loading={state.loadingSuccess}
        />
        <CustomButton
          onClick={handleCancel}
          text={"Hủy bỏ"}
          type="error"
          loading={state.loadingError}
        />
      </Space>
      <AddModal isOpen={open} onClose={handleCloseModal} />
    </Box>
  );
};

export default AccountStudent;
