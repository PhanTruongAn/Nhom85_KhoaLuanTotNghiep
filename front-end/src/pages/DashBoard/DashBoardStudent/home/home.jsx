import React, { useEffect, useState } from "react";
import { Input, Select, message, Col } from "antd";
import { Box, Typography } from "@mui/material";
import { BookTwoTone } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import { useSelector } from "react-redux";
import StudentApi from "../../../../apis/studentApi";
import CustomButton from "../../../../components/Button/CustomButton";
import Avatar from "../../../../components/Avatar/Avatar";
const { Option } = Select;

function StudentHome() {
  const user = useSelector((state) => state.userInit.user);
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username || "undefined",
    fullName: user.fullName || "undefined",
    phone: user.phone || "undefined",
    email: user.email || "undefined",
    gender: user.gender || "undefined",
    majorName: user.majorName || "undefined",
    className: user.className || "undefined",
    typeTraining: user.typeTraining || "undefined",
  });
  const [loading, setLoading] = useState(false);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi nhấn nút Cập nhật
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await StudentApi.updateById(formData);
      if (response.status === 0) {
        message.success("Cập nhật thông tin thành công!");
      } else {
        message.error(`Cập nhật thất bại: ${response.message}`);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

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
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Col span={12}>
                <Box sx={{ marginLeft: "-30px" }}>
                  <Avatar gender={user.gender} />
                </Box>
              </Col>

              <Box sx={{ flex: 1, textAlign: "left", marginLeft: "-50px" }}>
                <Box sx={{ marginTop: "5px" }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Thông tin cá nhân
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <p>
                    <b>Họ và tên: </b>
                    {user.fullName || "undefined"}
                  </p>
                  <p>
                    <b>Mã số sinh viên: </b>
                    {user.username || "undefined"}
                  </p>
                  <p>
                    <b>Giới tính: </b> {user.gender || "undefined"}
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
                  fontSize: "80px",
                  color: "rgb(8, 56, 127)",
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
                      <i>Xem chi tiết</i>
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
        <form style={{ padding: 10 }} onSubmit={(e) => e.preventDefault()}>
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
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
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
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email *
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select
                name="gender"
                value={formData.gender}
                onChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                style={{ width: "100%" }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Box>
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chuyên ngành
              </label>
              <Input
                name="majorName"
                value={formData.majorName}
                onChange={handleChange}
                placeholder="Kỹ thuật phần mềm"
              />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Lớp danh nghĩa
              </label>
              <Input
                name="className"
                value={formData.className}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chương trình đào tạo
              </label>
              <Select
                name="typeTraining"
                value={formData.typeTraining}
                onChange={(value) =>
                  setFormData({ ...formData, typeTraining: value })
                }
                style={{ width: "100%" }}
              >
                <Option value="Đại Học">Đại Học</Option>
                <Option value="Cao Đẳng">Cao Đẳng</Option>
              </Select>
            </Box>
          </Box>
          <CustomButton
            onClick={handleUpdate}
            loading={loading}
            text={"Cập nhật"}
            type="success"
          />
        </form>
      </Card>
    </Box>
  );
}

export default StudentHome;
