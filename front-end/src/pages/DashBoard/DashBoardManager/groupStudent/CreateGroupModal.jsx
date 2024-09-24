import React from "react";
import { Modal, Form, Input, message } from "antd";

const CreateGroupModal = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();

  const onSubmit = () => {
    const data = form.getFieldValue();
    // Giả lập lưu dữ liệu
    setTimeout(() => {
      message.success("Thêm nhóm thành công!");
      form.resetFields();
      onClose();
    }, 1000);
  };

  return (
    <Modal
      open={isOpen}
      title="Thêm nhóm mới"
      onCancel={onClose}
      onOk={onSubmit}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="groupName"
          label="Tên nhóm"
          rules={[{ required: true, message: "Hãy nhập tên nhóm!" }]}
        >
          <Input placeholder="Tên nhóm" />
        </Form.Item>
        <Form.Item
          name="topicId"
          label="Mã chủ đề"
          rules={[{ required: true, message: "Hãy nhập mã chủ đề!" }]}
        >
          <Input placeholder="Mã chủ đề" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGroupModal;
