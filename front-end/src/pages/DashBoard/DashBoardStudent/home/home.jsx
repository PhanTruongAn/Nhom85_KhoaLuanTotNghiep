import React, { useEffect, useState } from "react";
import { Input, Select, message, Col } from "antd";
import { Box, Typography } from "@mui/material";
import { BookTwoTone } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import CustomButton from "../../../../components/Button/CustomButton";
import Avatar from "../../../../components/Avatar/Avatar";
import CustomHooks from "../../../../utils/hooks";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setGroup, setUser } from "../../../../redux/userSlice";
import studentApi from "../../../../apis/studentApi";

const { Option } = Select;

function StudentHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const [messageApi, contextHolder] = message.useMessage();
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

  const getMyGroup = async () => {
    const res = await studentApi.getMyGroup(user.groupId);
    if (res && res.status === 0) {
      dispatch(setGroup(res.data));
    } else {
      messageApi.error(res.message);
    }
    return res.data;
  };
  const { isLoading, isError, data, error } = CustomHooks.useQuery(
    ["my-group"],
    getMyGroup
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await studentApi.updateById(formData);
      if (response.status === 0) {
        messageApi.success("Cập nhật thông tin thành công!");
      } else {
        messageApi.error(`Cập nhật thất bại: ${response.message}`);
      }
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi khi cập nhật thông tin.");
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
      {contextHolder}
      <Box
        className="row col-12"
        sx={{ margin: "10px 10px 10px", alignSelf: "center" }}
      >
        <Box className="col-12 col-md-6" sx={{ marginBottom: "10px" }}>
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
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={[
                      (theme) => ({
                        ...theme.applyStyles("light", {
                          color: "#006ed3",
                        }),
                      }),
                    ]}
                  >
                    <b> Thông tin cá nhân</b>
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
        <Box className="col-12 col-md-6" sx={{ marginBottom: "10px" }}>
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
                style={{ fontSize: "80px", color: "rgb(8, 56, 127)" }}
              />
              <Box sx={{ flex: 1, textAlign: "left", marginLeft: "20px" }}>
                <Box sx={{ marginTop: "5px" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={[
                      (theme) => ({
                        ...theme.applyStyles("light", {
                          color: "#006ed3",
                        }),
                      }),
                    ]}
                  >
                    <b>Thông tin nhóm</b>
                  </Typography>
                </Box>
                <hr />
                <Box>
                  <p>
                    <b>
                      Tên nhóm:
                      <i>
                        {" "}
                        {!isEmpty(group)
                          ? `Nhóm ${group.name}`
                          : "Chưa có nhóm"}
                      </i>
                    </b>
                  </p>
                  <p>
                    <b>
                      Trạng thái đề tài:
                      <i>
                        {" "}
                        {group.topicId ? "Đã có đề tài" : "Chưa có đề tài"}
                      </i>
                    </b>
                  </p>
                  <p>
                    <a href="my-topic">
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
          <Typography
            variant="h6"
            sx={[
              (theme) => ({
                ...theme.applyStyles("light", {
                  color: "#006ed3",
                }),
              }),
            ]}
          >
            <b> Cập nhật thông tin</b>
          </Typography>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingRight: "10px" }}
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
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
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
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingRight: "10px" }}
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
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
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
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingRight: "10px" }}
            >
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
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
            >
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
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Lớp danh nghĩa
              </label>
              <Input
                name="className"
                value={formData.className}
                onChange={handleChange}
              />
            </Box>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
            >
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
