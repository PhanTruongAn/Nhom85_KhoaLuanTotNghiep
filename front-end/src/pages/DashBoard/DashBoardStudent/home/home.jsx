import React from "react";
import { Avatar, Input, Select, Button } from "antd";
import { Box, Typography } from "@mui/material";
import { BookTwoTone } from "@ant-design/icons";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
const { Option } = Select;
const Card = styled(MuiCard)(({ theme }) => ({
  ...theme.applyStyles("dark", {
    backgroundColor: "#153645",
  }),
}));
function StudentHome() {
  const user = useSelector((state) => state.userInit.user);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        alignItems: "center",
      }}
    >
      <Box
        className="row col-12"
        sx={{ margin: "10px 10px 10px", alignSelf: "center" }}
      >
        <Box className="col-6">
          <Card
            sx={{
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
                    <b>Họ và tên:</b> {user.fullName}
                  </p>
                  <p>
                    <b>Mã số sinh viên:</b> {user.username}
                  </p>
                  <p>
                    <b>Giới tính:</b> {user.gender}
                  </p>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box className="col-6">
          <Card
            sx={{
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
              <BookTwoTone
                style={{
                  fontSize: "80px", // Match the avatar size
                  color: "rgb(8, 56, 127)", // Match the avatar color
                }}
              />
              <Box sx={{ flex: 1, textAlign: "left", marginLeft: "20px" }}>
                <Box sx={{ marginTop: "5px" }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Thông tin nhóm đề tài
                  </Typography>
                </Box>

                <hr />
                <Box>
                  <p>
                    <b>Tên nhóm:</b>
                  </p>
                  <p>
                    <b>Trạng thái đề tài:</b>
                  </p>
                  <p>
                    <a>
                      <i>Xem chi tiế</i>t
                    </a>
                  </p>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
      <Card
        sx={{
          width: "97%",
          marginTop: "10px",
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
              <Input value={user.username} disabled />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Họ và tên *
              </label>
              <Input value={user.fullName} />
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
              <Input value={user.phone ? user.phone : "null"} />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email *
              </label>
              <Input value={user.email ? user.email : "null"} />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select value={user.gender} style={{ width: "100%" }}>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Box>
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chuyên ngành
              </label>
              <Input placeholder="Kỹ thuật phần mềm" />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Lớp danh nghĩa
              </label>
              <Input defaultValue="DHKTPM16B" />
            </Box>
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chương trình đào tạo
              </label>
              <Select defaultValue="Đại Học" style={{ width: "100%" }}>
                <Option value="Đại Học">Đại Học</Option>
                <Option value="Cao Đẳng">Cao Đẳng</Option>
              </Select>
            </Box>
          </Box>

          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default StudentHome;
