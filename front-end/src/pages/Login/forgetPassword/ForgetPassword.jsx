import { useState } from "react";
import PropTypes from "prop-types";
import {
  Stepper,
  Step,
  StepLabel,
  Input,
  Button,
  Typography,
  Box,
  Card,
  Link,
} from "@mui/material";
import { Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import SignInContainer from "../theme/Container";
import authApi from "../../../apis/authApi";
function ForgetPassword() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [current, setCurrent] = useState(0);
  const [mssv, setMSSV] = useState("");
  const [email, setEmail] = useState("");
  const data = {
    username: mssv,
  };
  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleFindAccount = async () => {
    const res = await authApi.findAccount(data);
    if (res && res.status === 0) {
      setEmail(res.data.email);
      next();
    } else {
      setCurrent(current);
      messageApi.error(res.message);
    }
  };
  const handleSendEmail = async () => {
    const data = {
      email: email,
      username: mssv,
    };
    const res = await authApi.sendEmail(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      next();
    } else {
      setCurrent(current);
      messageApi.error(res.message);
    }
  };
  return (
    <SignInContainer
      direction="column"
      justifyContent="space-between"
      // sx={{
      //   "@media (max-height: 600px)": {
      //     marginTop: "200px",
      //   },
      //   "@media (max-width: 600px)": {
      //     marginTop: "200px",
      //   },
      // }}
    >
      {contextHolder}
      <Card
        variant="outlined"
        sx={{
          alignSelf: "center",
          width: { xs: "100%", sm: "600px" },
          padding: "15px",
          borderRadius: "8px",
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <Link
          component="button"
          variant="body2"
          sx={{ marginBottom: "30px", fontSize: "17px" }}
          onClick={() => navigate("/login")}
        >
          Quay lại đăng nhập
        </Link>

        <Stepper activeStep={current} sx={{ marginBottom: "20px" }}>
          <Step>
            <StepLabel>Username</StepLabel>
          </Step>
          <Step>
            <StepLabel>Email</StepLabel>
          </Step>
          <Step>
            <StepLabel>Hoàn tất</StepLabel>
          </Step>
        </Stepper>

        {current === 0 && (
          <InputMSSV value={mssv} onChange={setMSSV} next={handleFindAccount} />
        )}
        {current === 1 && (
          <InputEmail
            value={email}
            onChange={setEmail}
            next={handleSendEmail}
            prev={prev}
          />
        )}
        {current === 2 && (
          <Box textAlign="center">
            <Typography variant="body1">
              Mật khẩu đã gửi về địa chỉ email. Vui lòng kiểm tra email của bạn.
            </Typography>
            <Space>
              <Button
                onClick={prev}
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Gửi lại mật khẩu
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Xác nhận
              </Button>
            </Space>
          </Box>
        )}
      </Card>
    </SignInContainer>
  );
}

function InputMSSV({ value, onChange, next }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Input
        placeholder="Nhập mã sinh viên hoặc giảng viên"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          marginBottom: 2,
          height: "40px",
          fontSize: "14px",
          width: "100%",
        }}
      />
      <Button
        onClick={next}
        variant="contained"
        sx={{ height: "40px", fontSize: "14px", width: "100%" }}
      >
        Tiếp tục
      </Button>
    </Box>
  );
}
InputMSSV.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
function InputEmail({ value, onChange, next, prev }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Input
        placeholder="Nhập email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          marginBottom: 2,
          height: "40px",
          fontSize: "14px",
          width: "100%",
        }}
      />
      <Box display="flex" justifyContent="space-between" width="100%">
        <Button
          onClick={prev}
          variant="outlined"
          sx={{
            height: "40px",
            fontSize: "14px",
            flex: "1",
            marginRight: "10px",
          }}
        >
          Quay lại
        </Button>
        <Button
          onClick={next}
          variant="contained"
          sx={{ height: "40px", fontSize: "14px", flex: "1" }}
        >
          Tiếp tục
        </Button>
      </Box>
    </Box>
  );
}
InputEmail.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

export default ForgetPassword;
