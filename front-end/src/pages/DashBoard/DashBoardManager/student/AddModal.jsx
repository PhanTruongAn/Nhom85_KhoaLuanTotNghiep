import { useState } from "react";
import { Col, Form, Input, Modal, Row, message, Button } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import studentApi from "../../../../apis/studentApi";

function AddModal({ onClose, isOpen }) {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    fullName: "",
    username: "",
  };

  const handlerSubmit = async (values) => {
    setLoading(true);
    const dataToSave = {
      ...values,
      termId: currentTerm.id,
    };
    try {
      const result = await studentApi.createSingleAccountStudent(dataToSave);
      if (result && result.status === 0) {
        messageApi.success(result.message);
        form.resetFields();
        onClose();
      } else if (result.status === 1) {
        messageApi.warning(result.message);
      } else {
        messageApi.error(result.message);
      }
    } catch (error) {
      messageApi.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setLoading(false);
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
        onCancel={handleCancel}
        footer={[
          <Button
            size="small"
            key="back"
            type="primary"
            danger
            onClick={handleCancel}
          >
            Hủy bỏ
          </Button>,
          <Button
            size="small"
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={handlerSubmit}
        >
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
                <Input placeholder="Họ và tên sinh viên" />
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
                <Input placeholder="Mã sinh viên" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AddModal;
