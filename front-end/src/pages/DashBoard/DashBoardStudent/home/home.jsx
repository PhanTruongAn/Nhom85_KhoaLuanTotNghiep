import React from "react";
import { Avatar, Input, Select, Button } from "antd";
import { Card, Box } from "@mui/material";

const { Option } = Select;

function StudentHome() {
  const user = {
    fullname: "Dieu Phan Quang Dung",
    mssv: "20093921",
    email: "quangdungzkh@gmail.com",
    phone: "0968771863",
    gender: "Nam",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0f2f5",

        borderRadius: "8px",
      }}
    >
      <Card
        style={{
          width: 600,
          marginBottom: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor: "rgb(8, 56, 127)",
              verticalAlign: "middle",
            }}
            size={80}
          >
            {user.fullname[0] + user.fullname[1]}
          </Avatar>
          <Box style={{ flex: 1, textAlign: "left", marginLeft: "20px" }}>
            <h5>Thông tin cá nhân</h5>
            <hr />
            <Box>
              <p>
                <b>Họ và tên:</b> {user.fullname}
              </p>
              <p>
                <b>Mã số giảng viên:</b> {user.mssv}
              </p>
              <p>
                <b>Giới tính:</b> {user.gender}
              </p>
            </Box>
          </Box>
        </Box>
      </Card>
      <Card
        style={{
          width: "100%",

          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h5>Cập nhật thông tin</h5>
        <form>
          <Box className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-6"
              style={{ marginBottom: "16px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Mã Sinh viên *
              </label>
              <Input defaultValue={user.mssv} />
            </Box>
            <Box
              className="col-6"
              style={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Họ và tên *
              </label>
              <Input defaultValue={user.fullname} />
            </Box>
          </Box>
          <Box className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-6"
              style={{ marginBottom: "16px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Số điện thoại *
              </label>
              <Input defaultValue={user.phone} />
            </Box>
            <Box
              className="col-6"
              style={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email *
              </label>
              <Input defaultValue={user.email} />
            </Box>
          </Box>
          <Box className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <Box style={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select defaultValue={user.gender} style={{ width: "100%" }}>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Box>
            <Box style={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chuyên ngành
              </label>
              <Input placeholder="Kỹ thuật phần mềm" />
            </Box>
          </Box>
          <Box className="row" style={{ display: "flex", flexWrap: "wrap" }}>
            <Box style={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Lớp danh nghĩa
              </label>
              <Input defaultValue="DHKTPM16B" />
            </Box>
            <Box style={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chương trình đào tạo
              </label>
              <Select defaultValue="Đại Học" style={{ width: "100%" }}>
                <Option value="Đại Học">Đại Học</Option>
                <Option value="Cao Đẳng">Cao Đẳng</Option>
              </Select>
            </Box>
          </Box>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Cập nhật
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default StudentHome;
