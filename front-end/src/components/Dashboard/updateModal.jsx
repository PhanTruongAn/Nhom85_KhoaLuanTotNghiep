import React, { useEffect, useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import _ from "lodash";
import studentApi from "../../apis/studentApi";
import { toast } from "react-toastify";
import lecturerApi from "../../apis/lecturerApi";
const { Option } = Select;
const UpdateModal = ({
  isStudent,
  userSelect,
  isOpen,
  closeModal,
  onCancel,
  getData,
}) => {
  const obj = isStudent ? "sinh viên" : "giảng viên";
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  useEffect(() => {
    if (userSelect) {
      form.setFieldsValue(userSelect);
    }
  }, [userSelect, form]);
  const onSubmit = async () => {
    const _data = _.cloneDeep(form.getFieldValue());
    const res = isStudent
      ? await studentApi.updateById(_data)
      : await lecturerApi.updateById(_data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      getData();
      closeModal();
    } else if (res.status === -1) {
      messageApi.error(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        title={`Cập nhật thông tin ${obj}`}
        onCancel={(e) => onCancel()}
        onOk={(e) => onSubmit()}
      >
        <Form layout="vertical" form={form} initialValues={userSelect}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label={`Mã ${obj}`}
                rules={[
                  {
                    required: true,
                    message: `Hãy nhập mã ${obj}!`,
                  },
                ]}
              >
                <Input placeholder={`Mã ${obj}`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: `Hãy nhập họ và tên ${obj}!`,
                  },
                ]}
              >
                <Input placeholder={`Họ và tên ${obj}`} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Email"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="Giới tính">
                <Select placeholder="Hãy chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateModal;