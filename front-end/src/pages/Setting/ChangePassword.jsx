import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Box } from "@mui/material";
import "./ChangePassword.scss";
import { useSelector } from "react-redux";
import lecturerApi from "../../apis/lecturerApi";
import studentApi from "../../apis/studentApi";
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
      <Box
        sx={{
          width: "40%",
          padding: "20px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          //   backgroundColor: "#f9f9f9",
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
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                // backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Đổi Mật Khẩu
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </div>
  );
}

export default ChangePassword;
