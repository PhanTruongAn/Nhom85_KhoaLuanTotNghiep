import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Box, Button } from "@mui/material";
import "./ChangePassword.scss";
import { useSelector } from "react-redux";
import lecturerApi from "../../apis/lecturerApi";
import studentApi from "../../apis/studentApi";
import { Card } from "../../components/Card/Card";
function ChangePassword() {
  const data = useSelector((state) => state.userInit.user);

  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const onFinish = async () => {
    setLoading(true);
    const payload = {
      username: data.username,
      roleName: data.role.name,
      currentPassword: form.getFieldValue("currentPassword"),
      newPassword: form.getFieldValue("newPassword"),
    };
    const res =
      data.role.name === "STUDENT"
        ? await studentApi.changePassword(payload)
        : await lecturerApi.changePassword(payload);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      setLoading(false);
    } else {
      messageApi.error(res.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",

        width: "100%",
      }}
    >
      {contextHolder}
      <Card
        sx={{
          width: "40%",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Đổi Mật Khẩu
        </h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password
              placeholder="Mật khẩu hiện tại"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              placeholder="Mật khẩu mới"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              variant="contained"
              loading={loading}
              sx={{
                width: "100%",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Đổi Mật Khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ChangePassword;
