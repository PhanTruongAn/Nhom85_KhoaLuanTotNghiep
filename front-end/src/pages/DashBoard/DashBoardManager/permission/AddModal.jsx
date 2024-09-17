import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message, Button } from "antd";
import _ from "lodash";

function AddModal({ onClose, isOpen }) {
  return (
    <>
      <Modal
        title="Thêm tài khoản giảng viên"
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="back" type="primary" danger onClick={onClose}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary">
            Xác nhận
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="apiPath"
                label="Đường dẫn"
                rules={[
                  {
                    required: true,
                    message: "Hãy điền đường dẫn!",
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
                    message: "Hãy điền mô tả!",
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
        </Form>
      </Modal>
    </>
  );
}

export default AddModal;
