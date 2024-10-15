import React, { useState, useEffect } from "react";
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
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(user.username || "undefined");
    setFullName(user.fullName || "undefined");
    setEmail(user.email || "undefined");
    setPhone(user.phone || "undefined");
    setGender(user.gender || "undefined");
    setDegree(user.degree || "undefined");
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const id = user.id;
    const res = await lecturerApi.updateById({
      id,
      username,
      fullName,
      email,
      phone,
      gender,
      degree,
    });
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
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
                Mã Sinh viên *
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Box>
            <Box
              className="col-6"
              sx={{ marginBottom: "16px", paddingLeft: "10px" }}
            >
              <label style={{ textAlign: "left", display: "block" }}>
                Email *
              </label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
          </Box>
          <Box className="row" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ marginBottom: "16px", flex: 1 }}>
              <label style={{ textAlign: "left", display: "block" }}>
                Giới tính
              </label>
              <Select
                value={gender}
                onChange={(value) => setGender(value)}
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
                value={degree}
                onChange={(value) => setDegree(value)}
                style={{ width: "100%" }}
              >
                <Option value="THẠC SĨ">THẠC SĨ</Option>
                <Option value="TIẾN SĨ">TIẾN SĨ</Option>
              </Select>
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
