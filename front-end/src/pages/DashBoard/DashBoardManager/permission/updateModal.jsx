import React, { useEffect, useState } from "react";
import { Col, Form, Input, message, Modal, Row, Select, Button } from "antd";
import _ from "lodash";
import { toast } from "react-toastify";
import managerApi from "../../../../apis/managerApi";
const { Option } = Select;
const UpdateModal = ({ objectSelect, isOpen, onClose, getData }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (objectSelect) {
      form.setFieldsValue(objectSelect);
    }
  }, [objectSelect, form]);
  const onSubmit = async () => {
    setLoading(true);
    const _data = _.cloneDeep(form.getFieldValue());
    const res = await managerApi.updateById(_data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      getData();
      onClose();
      setLoading(false);
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
        title={`Cập nhật quyền hạn`}
        footer={[
          <Button key="back" type="primary" danger onClick={onClose}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onSubmit}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form} initialValues={objectSelect}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="apiPath"
                label="Đường dẫn (API)"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập đường dẫn",
                  },
                ]}
              >
                <Input placeholder="Đường dẫn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Mô tả đường dẫn"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mô tả",
                  },
                ]}
              >
                <Input placeholder="Đường dẫn (API)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="method" label="Phương thức">
                <Select placeholder="Hãy chọn phương thức">
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
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
