import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import { Button, Box } from "@mui/material";
import lecturerApi from "../../../../apis/lecturerApi";
import { Space, Table, message } from "antd";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "../../../../components/Dashboard/createModal";
import EmptyData from "../../../../components/emptydata/EmptyData";
import CustomButton from "../../../../components/Button/CustomButton";
import DownloadFileIcon from "@mui/icons-material/FileDownloadOutlined";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
const AccountLecturer = () => {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [state, setState] = useState({
    loadingSuccess: false,
    loadingError: false,
    loadingData: false,
  });
  const [listRole, setListRole] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [jsonData, setJsonData] = useState([]);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null); // Tạo ref cho input file
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      messageApi.error("Vui lòng chọn một file Excel.");
      return;
    }

    // Check file type
    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validFileTypes.includes(file.type)) {
      messageApi.error("Vui lòng chọn một file Excel hợp lệ (.xlsx, .xls).");
      // Reset the input file
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Lấy tên của sheet đầu tiên
        const sheetName = workbook.SheetNames[0]; // Chọn sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];

        // Chuyển sheet thành JSON
        const json = XLSX.utils.sheet_to_json(sheet);
        if (json.length > 0) {
          // Tạo một dữ liệu mới từ sheet đã tải
          setJsonData(json);
          messageApi.success("Dữ liệu file đã được tải thành công!");
        } else {
          messageApi.error("Sheet không có dữ liệu hợp lệ.");
        }
      } catch (error) {
        console.error("Error reading file:", error); // In lỗi chi tiết
        messageApi.error("Lỗi khi đọc file. Vui lòng kiểm tra lại định dạng.");
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const persistDataToSave = () => {
    const data = _.cloneDeep(jsonData);
    const dataPersist = [];
    Object.entries(data).map(([value]) => {
      dataPersist.push({
        termId: currentTerm.id,
        fullName: value.FullName,
        username: value.MaGiangVien,
        password: "123",
      });
    });
    return dataPersist;
  };
  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    const res = await lecturerApi.getRoles();
    if (res && res.status === 0) {
      setListRole(res.data);
    }
  };
  const handlerSubmit = async () => {
    updateState({ loadingSuccess: true });

    // Lưu trữ lỗi theo từng cột
    const errors = {
      FullName: [],
      MaGiangVien: [],
      Email: [],
    };

    const data = jsonData.map((item, index) => {
      // Kiểm tra các trường và lưu lỗi vào mảng tương ứng
      if (!item.FullName) {
        errors.FullName.push(`Dòng ${index + 1}`);
      }
      if (!item.MaGiangVien) {
        errors.MaGiangVien.push(`Dòng ${index + 1}`);
      }
      if (!item.Email) {
        errors.Email.push(`Dòng ${index + 1}`);
      }

      // Nếu có dữ liệu hợp lệ, tạo đối tượng dữ liệu cần gửi
      return {
        termId: currentTerm.id,
        fullName: item.FullName || "",
        username: item.MaGiangVien || "",
        password: "123", // Mật khẩu mặc định
        email: item.Email || "",
      };
    });

    // Kiểm tra nếu có lỗi ở bất kỳ cột nào
    const errorMessages = [];
    Object.entries(errors).forEach(([field, lines]) => {
      if (lines.length > 0) {
        errorMessages.push(`${field}: Trống ${lines.join(" | ")}`);
      }
    });

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (errorMessages.length > 0) {
      updateState({ loadingSuccess: false });
      messageApi.error(
        <div>
          <strong>Lỗi dữ liệu:</strong>
          <ul>
            {errorMessages.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      );
      return;
    }

    // Nếu không có lỗi, gửi dữ liệu đi
    try {
      const result = await lecturerApi.createAccountsLecturer(data);
      if (result.status === 0) {
        updateState({ loadingSuccess: false });
        messageApi.success(result.message);
        document.getElementById("file-input").value = "";
        setJsonData([]);
      } else {
        updateState({ loadingSuccess: false });
        messageApi.error(result.message);
      }
    } catch (error) {
      updateState({ loadingSuccess: false });
      console.error("Error submitting data:", error);
      messageApi.error("Lỗi khi gửi dữ liệu. Vui lòng thử lại.");
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
      title: "Lecturer ID",
      dataIndex: "MaGiangVien",
      key: "LecturerId",
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
            Tải file danh sách giảng viên
          </Box>
          <Box>
            <label>
              <Button
                startIcon={<UploadFileIcon />}
                component="span"
                variant="contained"
                size="small"
                sx={{ marginRight: "10px" }}
              >
                Tải file
                <input
                  id="file-input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  style={{ display: "none" }} // Ẩn input
                  ref={fileInputRef} // Gán ref cho input file
                />
              </Button>
            </label>
            <Button
              size="small"
              startIcon={<DownloadFileIcon />}
              href="https://docs.google.com/spreadsheets/d/1-qYkfFpfkSUZ7Nww60FOKbmy42tDzFte/export?format=xlsx" // Chuyển link để tải trực tiếp
              component="a"
              variant="outlined"
              target="_blank"
              rel="noopener noreferrer"
              color="success"
            >
              Tải File EXCEL MẪU
            </Button>
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
            size="small"
            variant="contained"
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
          >
            Thêm tài khoản giảng viên
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
        DANH SÁCH GIẢNG VIÊN
      </Box>

      {jsonData.length > 0 ? (
        <Table
          style={{ marginTop: "10px" }}
          dataSource={jsonData}
          columns={columns}
          rowKey="MaGiangVien"
          pagination={{ pageSize: 5 }}
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
      <CreateModal
        isOpen={open}
        onSubmit={handleCloseModal}
        onCancel={handleCloseModal}
        isStudent={false}
        listRole={listRole}
      />
    </Box>
  );
};

export default AccountLecturer;
