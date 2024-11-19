import { useEffect, useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select, Button } from "antd";
import _ from "lodash";
import PropTypes from "prop-types";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userSelect) {
      form.setFieldsValue(userSelect);
    }
  }, [userSelect, form]);

  const onSubmit = async () => {
    setLoading(true);
    const _data = _.cloneDeep(form.getFieldValue());
    const res = isStudent
      ? await studentApi.updateById(_data)
      : await lecturerApi.updateById(_data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      getData();
      closeModal();
      setLoading(false);
    } else if (res.status === -1) {
      messageApi.error(res.message);
      setLoading(false);
    } else {
      toast.error(res.message);
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        title={`Cập nhật thông tin ${obj}`}
        onCancel={onCancel}
        footer={[
          <Button key="back" type="primary" danger onClick={onCancel}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={userSelect}
          onFinish={onSubmit}
        >
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
                  isStudent && {
                    pattern: /^\d{8}$/,
                    message: "Mã sinh viên phải là 8 chữ số!",
                  },
                  !isStudent && {
                    pattern: /^\d{8}$/,
                    message: "Mã giảng viên phải là 8 chữ số!",
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
                  {
                    type: "email",
                    message: "Email phải có dạng username@domain.com!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} placeholder="Email" />
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
                  {
                    pattern: /^0\d{9}$/,
                    message: "Số điện thoại phải bắt đầu từ 0 và có 10 chữ số!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn giới tính!",
                  },
                ]}
              >
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

UpdateModal.propTypes = {
  isStudent: PropTypes.bool.isRequired,
  userSelect: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default UpdateModal;
