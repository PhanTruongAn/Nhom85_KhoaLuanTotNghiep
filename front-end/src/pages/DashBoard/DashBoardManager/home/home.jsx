import React from "react";
import { Avatar, Input, Select } from "antd";
import { Box, Typography, Button } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
const { Option } = Select;
const Card = styled(MuiCard)(({ theme }) => ({
  ...theme.applyStyles("dark", {
    backgroundColor: "#153645",
  }),
}));
function ManagerHome() {
  const user = useSelector((state) => state.userInit.user);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          marginTop: "10px",
          width: 600,
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor: "rgb(8, 56, 127)",
              verticalAlign: "middle",
              left: "10px",
            }}
            size={80}
          ></Avatar>
          <Box sx={{ flex: 1, textAlign: "left", marginLeft: "20px" }}>
            <Box sx={{ marginTop: "5px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Thông tin cá nhân
              </Typography>
            </Box>
            <hr />
            <Box>
              <p>
                <b>Họ và tên: </b> {user.fullName ? user.fullName : "undefined"}
              </p>
              <p>
                <b>Mã số giảng viên: </b>
                {user.username ? user.username : "undefined"}
              </p>
              <p>
                <b>Giới tính: </b>
                {user.gender ? user.gender : "undefined"}
              </p>
            </Box>
          </Box>
        </Box>
      </Card>
      <Card
        sx={{
          margin: "0 0 5px",
          width: "97%",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <form style={{ padding: 10 }}>
          <h5>Cập nhật thông tin</h5>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Mã Sinh viên *
              </label>
              <Input
                defaultValue={user.username ? user.username : "undefined"}
              />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Họ và tên *
              </label>
              <Input
                defaultValue={user.fullName ? user.fullName : "undefined"}
              />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Số điện thoại *
              </label>
              <Input defaultValue={user.phone ? user.phone : "undefined"} />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email *
              </label>
              <Input defaultValue={user.email ? user.email : "undefined"} />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select
                defaultValue={user.gender ? user.gender : "undefined"}
                style={{ width: "100%" }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Box>
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chức vụ
              </label>
              <Select
                defaultValue={user.degree ? user.degree : "undefined"}
                style={{ width: "100%" }}
              >
                <Option value="THẠC SĨ">THẠC SĨ</Option>
                <Option value="TIẾN SĨ">TIẾN SĨ</Option>
              </Select>
            </Box>
          </Box>

          <Button variant="contained" size="small">
            Cập nhật
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default ManagerHome;
