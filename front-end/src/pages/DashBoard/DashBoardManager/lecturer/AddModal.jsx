import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message, Button } from "antd";
import _ from "lodash";
import userApi from "../../../../apis/userApi";
function AddModal({ onClose, isOpen }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = {
    fullName: "",
    username: "",
    // email: "",
    // phone: "",
  };

  const [data, setData] = useState(user);
  const handlerOnChange = (value, name) => {
    const _user = _.cloneDeep(data);
    _user[name] = value;
    setData(_user);
  };
  const handlerSubmit = async () => {
    setLoading(true);
    const result = await userApi.createSingleAccountLecturer(data);
    if (result && result.status === 0) {
      messageApi.success(result.message);
      setLoading(false);
      setData(user);
      form.resetFields();
      onClose();
    } else {
      messageApi.error(result.message);
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Thêm tài khoản giảng viên"
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="back" type="primary" danger onClick={onClose}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handlerSubmit}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập họ và tên giảng viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Họ và tên giảng viên"
                  onChange={(e) => handlerOnChange(e.target.value, "fullName")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Mã giảng viên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mã giảng viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Mã giảng viên"
                  onChange={(e) => handlerOnChange(e.target.value, "username")}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại của giảng viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại của giảng viên"
                  onChange={(e) => handlerOnChange(e.target.value, "phone")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email của giảng viên!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Địa chỉ email giảng viên"
                  onChange={(e) => handlerOnChange(e.target.value, "email")}
                />
              </Form.Item>
            </Col>
          </Row> */}
        </Form>
      </Modal>
    </>
  );
}

export default AddModal;
