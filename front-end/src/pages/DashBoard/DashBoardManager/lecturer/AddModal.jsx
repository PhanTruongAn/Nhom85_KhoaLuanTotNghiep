import { useState } from "react";
import { Col, Form, Input, Modal, Row, message, Button } from "antd";
import PropTypes from "prop-types";
import _ from "lodash";
import lecturerApi from "../../../../apis/lecturerApi";

function AddModal({ onClose, isOpen, getData }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = {
    fullName: "",
    username: "",
  };

  const [data, setData] = useState(user);
  const handlerOnChange = (value, name) => {
    const _user = _.cloneDeep(data);
    _user[name] = value;
    setData(_user);
  };
  const handlerSubmit = async () => {
    setLoading(true);
    const result = await lecturerApi.createSingleAccountLecturer(data);
    if (result && result.status === 0) {
      messageApi.success(result.message);
      setLoading(false);
      setData(user);
      getData();
      form.resetFields();
      onClose();
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
        title="Thêm tài khoản giảng viên"
        open={isOpen}
        onCancel={() => handleCancel()}
        footer={[
          <Button
            key="back"
            type="primary"
            danger
            onClick={() => handleCancel()}
          >
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handlerSubmit()}
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
        </Form>
      </Modal>
    </>
  );
}
AddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

export default AddModal;
