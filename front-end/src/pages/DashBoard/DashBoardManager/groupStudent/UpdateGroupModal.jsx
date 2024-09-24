import React, { useEffect } from "react";
import { Col, Form, Input, message, Modal, Row } from "antd";
import _ from "lodash";

const UpdateGroupModal = ({ groupSelect, isOpen, closeModal, onCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    if (groupSelect) {
      form.setFieldsValue(groupSelect);
    }
  }, [groupSelect, form]);

  const onSubmit = () => {
    const _data = _.cloneDeep(form.getFieldValue());
    // Giả lập việc lưu dữ liệu
    setTimeout(() => {
      messageApi.success("Cập nhật thông tin nhóm thành công!");
      closeModal(); // Đảm bảo modal được đóng sau khi cập nhật
    }, 1000); // Thêm timeout để giả lập
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        title="Cập nhật thông tin nhóm"
        onCancel={onCancel} // Đảm bảo onCancel được gọi khi nhấn nút Close
        onOk={onSubmit}
      >
        <Form layout="vertical" form={form} initialValues={groupSelect}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="groupName"
                label="Tên nhóm"
                rules={[{ required: true, message: "Hãy nhập tên nhóm!" }]}
              >
                <Input placeholder="Tên nhóm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topicId"
                label="Mã chủ đề"
                rules={[{ required: true, message: "Hãy nhập mã chủ đề!" }]}
              >
                <Input placeholder="Mã chủ đề" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGroupModal;
