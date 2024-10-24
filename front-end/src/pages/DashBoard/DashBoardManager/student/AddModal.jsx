import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message, Button } from "antd";
import _ from "lodash";
import studentApi from "../../../../apis/studentApi";
import { useSelector } from "react-redux";
function AddModal({ onClose, isOpen }) {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
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
    let dataToSave = {
      ...data,
      termId: currentTerm.id,
    };
    const result = await studentApi.createSingleAccountStudent(dataToSave);
    if (result && result.status === 0) {
      messageApi.success(result.message);
      setLoading(false);
      setData(user);
      onClose();
      form.resetFields();
    } else if (result.status === 1) {
      messageApi.warning(result.message);
      setLoading(false);
    } else {
      setLoading(false);
      messageApi.error(result.message);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Thêm tài khoản sinh viên"
        open={isOpen}
        onCancel={(e) => handleCancel()}
        footer={[
          <Button
            key="back"
            type="primary"
            danger
            onClick={(e) => handleCancel()}
          >
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
                    message: "Hãy nhập họ và tên sinh viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Họ và tên sinh viên"
                  onChange={(e) => handlerOnChange(e.target.value, "fullName")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Mã sinh viên"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mã sinh viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Mã sinh viên"
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
                    message: "Hãy nhập số điện thoại của sinh viên!",
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại của sinh viên"
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
                    message: "Hãy nhập email của sinh viên!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Địa chỉ email sinh viên"
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
