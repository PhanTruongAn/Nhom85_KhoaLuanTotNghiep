import React, { useEffect, useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import _ from "lodash";
import studentApi from "../../../../apis/studentApi";
import { toast } from "react-toastify";
const { Option } = Select;
const UpdateModal = (props) => {
  const defaultValues = {
    username: "",
    fullName: "",
    email: "",
    phone: "",
  };
  const [form] = Form.useForm(); // Tạo form instance
  useEffect(() => {
    if (props.userSelect) {
      form.setFieldsValue(props.userSelect);
    }
  }, [props.userSelect, form]);
  const onSubmit = async () => {
    const _student = _.cloneDeep(form.getFieldValue());
    const res = await studentApi.updateById(_student);
    if (res && res.status === 0) {
      message.success(res.message);
      props.getData();
      props.onSubmit();
    } else if (res.status === -1) {
      message.error(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <Modal
        open={props.open}
        title="Cập nhật thông tin sinh viên"
        onCancel={props.onCancel}
        onOk={onSubmit}
      >
        <Form layout="vertical" form={form} initialValues={props.userSelect}>
          <Row gutter={16}>
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
                <Input placeholder="Mã sinh viên" />
              </Form.Item>
            </Col>
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
                <Input placeholder="Họ và tên sinh viên" />
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
