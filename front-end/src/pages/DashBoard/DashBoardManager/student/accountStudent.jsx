import { useRef, useState } from "react";
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
import DownloadFileIcon from "@mui/icons-material/FileDownloadOutlined";
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

    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!validFileTypes.includes(file.type)) {
      messageApi.error("Vui lòng chọn một file Excel hợp lệ (.xlsx, .xls).");
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

        // Lấy sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Chuyển sheet sang dạng mảng 2D
        let json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log("Dữ liệu đọc được:", json);

        if (json.length > 0) {
          const headers = json[0].map((header) => (header || "").trim()); // Lấy tiêu đề từ hàng đầu tiên
          const dataRows = json.slice(1); // Dữ liệu trừ tiêu đề

          // Kiểm tra các tiêu đề bắt buộc có phải ở hàng đầu tiên không
          const requiredHeaders = ["Mã sinh viên", "Họ và tên", "Email"];
          const missingHeaders = requiredHeaders.filter(
            (header) => !headers.includes(header)
          );

          if (missingHeaders.length > 0) {
            messageApi.error(
              `Thiếu tiêu đề bắt buộc: ${missingHeaders.join(
                ", "
              )} hoặc tiêu đề không nằm ở hàng đầu tiên.`
            );
            return;
          }

          // Hàm kiểm tra hàng có phải là trống hay không
          const isRowEmpty = (row) =>
            row.every((cell) => !cell || cell.toString().trim() === "");

          // Lọc dữ liệu chỉ giữ lại các hàng không trống
          const validRows = dataRows.filter((row) => !isRowEmpty(row));

          if (validRows.length === 0) {
            messageApi.error("Không có dữ liệu hợp lệ trong file.");
            return;
          }

          // Kiểm tra nếu tiêu đề không phải là hàng đầu tiên
          const isFirstRowHeadersValid = requiredHeaders.every((header) =>
            headers.includes(header)
          );

          if (!isFirstRowHeadersValid) {
            messageApi.error("Các tiêu đề phải nằm ở hàng đầu tiên.");
            return;
          }

          // Xử lý dữ liệu
          const formattedData = validRows.map((row) => ({
            MaSinhVien: row[headers.indexOf("Mã sinh viên")] || "",
            FullName: row[headers.indexOf("Họ và tên")] || "",
            Email: row[headers.indexOf("Email")] || "",
          }));

          setJsonData(formattedData);
          messageApi.success("Dữ liệu file đã được tải thành công!");
        } else {
          messageApi.error("Sheet không có dữ liệu.");
        }
      } catch (error) {
        console.error("Error reading file:", error);
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
        username: value.MaSinhVien,
        password: "123",
      });
    });
    return dataPersist;
  };

  const handlerSubmit = async () => {
    updateState({ loadingSuccess: true });

    // Lưu trữ các lỗi theo từng cột
    const errors = {
      FullName: [],
      MaSinhVien: [],
      Email: [],
    };

    const data = jsonData.map((item, index) => {
      // Kiểm tra các cột cần thiết và lưu lỗi vào mảng tương ứng
      if (!item.FullName) {
        errors.FullName.push(`Dòng ${index + 1}`);
      }
      if (!item.MaSinhVien) {
        errors.MaSinhVien.push(`Dòng ${index + 1}`);
      }
      if (!item.Email) {
        errors.Email.push(`Dòng ${index + 1}`);
      }

      // Dữ liệu sẽ được gửi đi (bao gồm cả các trường hợp bị thiếu dữ liệu)
      return {
        termId: currentTerm.id,
        fullName: item.FullName || "",
        username: item.MaSinhVien || "",
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

    try {
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
      title: "Mã sinh viên",
      dataIndex: "MaSinhVien",
      key: "studentId",
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      key: "fullName",
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
                size="small"
                startIcon={<UploadFileIcon />}
                component="span"
                variant="contained"
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
              component="a"
              href="https://docs.google.com/spreadsheets/d/1HAOqOiXkGQxLSM81L_RK1pzOYNarHKcq/export?format=xlsx" // Chuyển link để tải trực tiếp
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
