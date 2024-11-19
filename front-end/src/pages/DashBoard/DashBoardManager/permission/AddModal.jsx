import { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message, Button } from "antd";
import PropTypes from "prop-types";
import _ from "lodash";
import managerApi from "../../../../apis/managerApi";

function AddModal({ onClose, isOpen, refetch }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const permission = {
    apiPath: "",
    description: "",
    method: "",
  };
  const [state, setState] = useState({
    data: permission,
    buttonLoading: false,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const handlerOnChange = (value, name) => {
    const _user = _.cloneDeep(state.data);
    _user[name] = value;
    updateState({ data: _user });
  };

  const handleCancel = () => {
    updateState({ data: permission });
    form.resetFields();
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const isValid = await form.validateFields(); // Validate form before submission
      if (isValid) {
        updateState({ buttonLoading: true });
        const res = await managerApi.create(state.data);
        if (res && res.status === 0) {
          messageApi.success(res.message);
          updateState({ buttonLoading: false });
          refetch();
          handleCancel();
        } else {
          messageApi.error(res.message);
          updateState({ buttonLoading: false });
        }
      }
    } catch (error) {
      messageApi.error(
        "Có lỗi trong quá trình xác nhận. Vui lòng kiểm tra lại thông tin!"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Thêm mới quyền hạn"
        open={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" danger onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={state.buttonLoading}
            onClick={handleSubmit}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="apiPath"
                label="Đường dẫn"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đường dẫn!",
                  },
                ]}
              >
                <Input
                  placeholder="Đường dẫn"
                  onChange={(e) => handlerOnChange(e.target.value, "apiPath")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền mô tả!",
                  },
                ]}
              >
                <Input
                  placeholder="Mô tả"
                  onChange={(e) =>
                    handlerOnChange(e.target.value, "description")
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="method"
                label="Phương thức"
                rules={[{ required: true, message: "Hãy chọn phương thức!" }]}
                required
              >
                <Select
                  placeholder="Hãy chọn phương thức"
                  onChange={(value) => handlerOnChange(value, "method")}
                  options={[
                    { value: "GET", label: "GET" },
                    { value: "POST", label: "POST" },
                    { value: "PUT", label: "PUT" },
                    { value: "DELETE", label: "DELETE" },
                  ]}
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
  refetch: PropTypes.func.isRequired,
};

export default AddModal;
