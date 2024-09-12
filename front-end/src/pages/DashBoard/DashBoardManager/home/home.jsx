import React, { useState } from "react";
import * as XLSX from "xlsx";
import _ from "lodash";
import { Button } from "@mui/material";
import userApi from "../../../../apis/userApi";
import { toast } from "react-toastify";
const ManagerHome = () => {
  const [jsonData, setJsonData] = useState([]);
  // console.log("Check: ", jsonData);
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
      setJsonData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const persistDataToSave = () => {
    const data = _.cloneDeep(jsonData);
    const dataPersist = [];
    Object.entries(data).map(([key, value], index) => {
      dataPersist.push({
        fullName: value.FullName,
        username: value.MaSinhVien,
        password: "123",
      });
    });
    console.log("Check datapersist:", dataPersist);
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
  return (
    <div className="container-fluid">
      <div>This is home manager</div>
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      </div>
      <Button
        sx={{ marginTop: "10px" }}
        variant="contained"
        onClick={handlerSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default ManagerHome;
