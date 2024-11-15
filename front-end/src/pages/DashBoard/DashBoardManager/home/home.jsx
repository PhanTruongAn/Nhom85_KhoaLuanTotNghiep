import { useState, useEffect } from "react";
import { Input, Select, message, Col } from "antd";
import { Box, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import { useSelector, useDispatch } from "react-redux";
import lecturerApi from "../../../../apis/lecturerApi";
import CustomButton from "../../../../components/Button/CustomButton";
import { setUser } from "../../../../redux/userSlice";
import Avatar from "../../../../components/Avatar/Avatar";

const { Option } = Select;

function ManagerHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: user.id,
    username: user.username || "undefined",
    fullName: user.fullName || "undefined",
    phone: user?.phone || "undefined",
    email: user?.email || "undefined",
    gender: user.gender || "undefined",
    degree: user?.degree || "undefined",
  });

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

    if (!formData.degree || formData.degree === "undefined")
      newErrors.degree = "Chức vụ không được để trống hoặc undefined.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng sửa
  };
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng sửa
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const id = user.id;
    const res = await lecturerApi.updateById(formData);
    setLoading(false);
    if (res && res.status === 0) {
      const dataRedux = {
        ...res.data,
        role: user.role,
      };
      dispatch(setUser(dataRedux));
      messageApi.success(res.message);
    } else {
      messageApi.error(res.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {contextHolder}
      <Card
        sx={{
          marginTop: "10px",
          width: 600,
          marginBottom: "20px",
          borderRadius: "8px",
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
                    fontWeight: "700",
                    ...theme.applyStyles("light", {
                      color: "#006ed3",
                    }),
                  }),
                ]}
              >
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
        }}
      >
        <form style={{ padding: 10 }}>
          <Typography
            variant="h5"
            sx={[
              (theme) => ({
                textAlign: "center",
                margin: "10px",
                fontWeight: "700",
                ...theme.applyStyles("light", {
                  color: "#006ed3",
                }),
              }),
            ]}
          >
            Cập nhật thông tin
          </Typography>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingRight: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Mã giảng viên <span style={{ color: "red" }}>*</span>
              </label>

              <Input
                value={formData.username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly
              />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
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
              className="col-6"
              sx={{ marginBottom: "16px", paddingRight: "10px" }}
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
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
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
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select
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
            <Box sx={{ marginBottom: "16px", flex: 1, paddingLeft: "10px" }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Chức vụ
              </label>
              <Select
                value={formData.degree}
                onChange={(value) => handleSelectChange("degree", value)}
                style={{ width: "100%" }}
              >
                <Option value="THẠC SĨ">THẠC SĨ</Option>
                <Option value="TIẾN SĨ">TIẾN SĨ</Option>
              </Select>
              {errors.degree && (
                <span style={{ color: "red" }}>{errors.degree}</span>
              )}
            </Box>
          </Box>
          <CustomButton
            onClick={handleSubmit}
            text="Cập nhật"
            type="refresh"
            loading={loading}
          />
        </form>
      </Card>
    </Box>
  );
}

export default ManagerHome;
