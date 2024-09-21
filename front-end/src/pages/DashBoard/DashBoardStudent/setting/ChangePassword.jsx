import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { Box } from "@mui/material";
import "./ChangePassword.scss";

function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Xử lý đổi mật khẩu ở đây
    console.log("Received values:", values);
    notification.success({
      message: "Đổi mật khẩu thành công!",
    });
    setLoading(false);
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
            color: "#333",
          }}
        >
          Đổi Mật Khẩu
        </h2>
        <Form name="change_password" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password placeholder="Mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: "100%",
                backgroundColor: "#4CAF50",
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
