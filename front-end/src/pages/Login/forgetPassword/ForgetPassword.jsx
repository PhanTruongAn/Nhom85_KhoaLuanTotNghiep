import React, { useState } from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Steps, Input, Button } from "antd";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [mssv, setMSSV] = useState("");
  const [email, setEmail] = useState("");

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: "900px",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link
          component="button"
          variant="body2"
          sx={{ marginBottom: "30px", fontSize: "17px" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Quay lại đăng nhập
        </Link>
        <Steps current={current} style={{ marginBottom: "20px" }}>
          <Steps.Step title="Nhập mã số sinh viên" icon={<UserOutlined />} />
          <Steps.Step title="Nhập email" icon={<SolutionOutlined />} />
          <Steps.Step title="Hoàn tất" icon={<SmileOutlined />} />
        </Steps>

        {current === 0 && (
          <InputMSSV value={mssv} onChange={setMSSV} next={next} />
        )}
        {current === 1 && (
          <InputEmail
            value={email}
            onChange={setEmail}
            next={next}
            prev={prev}
          />
        )}
        {current === 2 && (
          <div>
            <p>Mật khẩu đã gửi về email của bạn.</p>
            <p>Vui lòng kiểm tra email của bạn.</p>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Gửi lại mật khẩu
            </Button>
            <Button onClick={(e) => navigate("/login")} type="primary">
              Xác nhận
            </Button>
          </div>
        )}
        {current === 3 && <div>Hoàn tất!</div>}
      </div>
    </div>
  );
}

function InputMSSV({ value, onChange, next }) {
  return (
    <div>
      <Input
        placeholder="Nhập mã số sinh viên"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: 10, height: "40px", fontSize: "14px" }}
      />
      <Button
        onClick={next}
        type="primary"
        block
        style={{ height: "40px", fontSize: "14px" }}
      >
        Tiếp tục
      </Button>
    </div>
  );
}

function InputEmail({ value, onChange, next, prev }) {
  return (
    <div>
      <Input
        placeholder="Nhập email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: 10, height: "40px", fontSize: "14px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={prev}
          style={{
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
          type="primary"
          style={{ height: "40px", fontSize: "14px", flex: "1" }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  );
}

export default ForgetPassword;
