import { useState } from "react";
import { Input, Select, message, Col } from "antd";
import { Box, Typography } from "@mui/material";
import { BookTwoTone } from "@ant-design/icons";
import { Card } from "../../../../components/Card/Card";
import CustomButton from "../../../../components/Button/CustomButton";
import Avatar from "../../../../components/Avatar/Avatar";
import CustomHooks from "../../../../utils/hooks";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setMajors } from "../../../../redux/userSlice";
import studentApi from "../../../../apis/studentApi";
import { Link } from "react-router-dom";

const { Option } = Select;

function StudentHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const group = useSelector((state) => state.userInit.group);
  const majors = useSelector((state) => state.userInit.majors);
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username || "undefined",
    fullName: user.fullName || "undefined",
    phone: user?.phone || "undefined",
    email: user?.email || "undefined",
    gender: user.gender || "undefined",
    majorId: user?.majorId || "undefined",
    className: user?.className || "undefined",
    typeTraining: user?.typeTraining || "undefined",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName || formData.fullName === "undefined")
      newErrors.fullName = "Họ và tên không được để trống hoặc undefined.";
    if (!formData.phone || formData.phone === "undefined") {
      newErrors.phone = "Số điện thoại không được để trống hoặc undefined.";
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số.";
    }
    if (!formData.email || formData.email === "undefined") {
      newErrors.email = "Email không được để trống hoặc undefined.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ. (Vd: username@domain.com)";
    }
    if (!formData.gender || formData.gender === "undefined")
      newErrors.gender = "Giới tính không được để trống hoặc undefined.";
    if (!formData.majorId || formData.majorId === "undefined")
      newErrors.majorId = "Chuyên ngành không được để trống hoặc undefined.";
    if (!formData.className || formData.className === "undefined")
      newErrors.className =
        "Lớp danh nghĩa không được để trống hoặc undefined.";
    if (!formData.typeTraining || formData.typeTraining === "undefined")
      newErrors.typeTraining =
        "Chương trình đào tạo không được để trống hoặc undefined.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getMajors = async () => {
    const res = await studentApi.getMajors();
    if (res && res.status === 0) {
      dispatch(setMajors(res.data));
    } else {
      messageApi.error(res.message);
    }
    return res;
  };

  CustomHooks.useQuery(["majors"], getMajors, {
    enabled: isEmpty(majors),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng sửa
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng sửa
  };
  const handleUpdate = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await studentApi.updateById(formData);
      if (response.status === 0) {
        dispatch(setUser({ ...user, ...formData }));
        messageApi.success("Cập nhật thông tin thành công!");
      } else {
        messageApi.error(`Cập nhật thất bại: ${response.message}`);
      }
    } catch (error) {
      messageApi.error(`Lỗi: ${error.message} `);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        alignItems: "center",
        overflow: "auto",
        flexWrap: "wrap",
        overflowX: "hidden",
        padding: "10px",
      }}
    >
      {contextHolder}
      <Box className="row col-12" sx={{ alignSelf: "center" }}>
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
                          ? `Nhóm ${group.groupName}`
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
                    <Link to="/dashboard/my-topic">
                      <i>Xem chi tiết</i>
                    </Link>
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
                Mã Sinh viên <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
              />
            </Box>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Họ và tên <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span style={{ color: "red" }}>{errors.fullName}</span>
              )}
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone}</span>
              )}
            </Box>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
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
                onChange={(value) => handleSelectChange("gender", value)}
                style={{ width: "100%" }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
              {errors.gender && (
                <span style={{ color: "red" }}>{errors.gender}</span>
              )}
            </Box>
            <Box
              className="col-12 col-md-6"
              sx={{ marginBottom: "10px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Chuyên ngành
              </label>
              <Select
                name="majorName"
                value={formData.majorId}
                onChange={(value) => handleSelectChange("majorId", value)}
                style={{ width: "100%" }}
              >
                {majors.map((major) => (
                  <Option key={major.id} value={major.id}>
                    {major.majorName}
                  </Option>
                ))}
              </Select>
              {errors.majorId && (
                <span style={{ color: "red" }}>{errors.majorId}</span>
              )}
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
              {errors.className && (
                <span style={{ color: "red" }}>{errors.className}</span>
              )}
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
                onChange={(value) => handleSelectChange("typeTraining", value)}
                style={{ width: "100%" }}
              >
                <Option value="Đại Học">Đại Học</Option>
                <Option value="Cao Đẳng">Cao Đẳng</Option>
              </Select>
              {errors.typeTraining && (
                <span style={{ color: "red" }}>{errors.typeTraining}</span>
              )}
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
