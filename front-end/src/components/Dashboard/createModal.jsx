import { useState } from "react";
import { Col, Form, Input, Modal, Row, Select, message, Button } from "antd";
import _ from "lodash";
import studentApi from "../../apis/studentApi";
import lecturerApi from "../../apis/lecturerApi";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const { Option } = Select;

function CreateModal({
  onSubmit,
  onCancel,
  isOpen,
  getData,
  isStudent,
  listRole,
}) {
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const obj = isStudent ? "sinh viên" : "giảng viên";
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = {
    fullName: "",
    username: "",
    roleId: "",
  };

  const [data, setData] = useState(user);

  const handlerOnChange = (value, name) => {
    const _user = _.cloneDeep(data);
    _user[name] = name === "roleId" ? parseInt(value) : value;
    setData(_user);
  };

  const handlerSubmit = async () => {
    setLoading(true);
    let dataToSave = {
      ...data,
      termId: currentTerm.id,
    };
    const result = isStudent
      ? await studentApi.createSingleAccountStudent(dataToSave)
      : await lecturerApi.createSingleAccountLecturer(dataToSave);

    if (result && result.status === 0) {
      messageApi.success(result.message);
      setLoading(false);
      setData(user);
      if (getData) getData();
      form.resetFields();
      onSubmit();
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
    setData(user);
    onCancel();
  };

  return (
    <Box>
      {contextHolder}
      <Modal
        title="Thêm tài khoản sinh viên"
        open={isOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" danger onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handlerSubmit}
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
                    message: `Hãy nhập họ và tên ${obj}!`,
                  },
                ]}
              >
                <Input
                  placeholder={`Họ và tên ${obj}`}
                  onChange={(e) => handlerOnChange(e.target.value, "fullName")}
                />
              </Form.Item>
            </Col>
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
                <Input
                  placeholder={`Mã ${obj}`}
                  onChange={(e) => handlerOnChange(e.target.value, "username")}
                />
              </Form.Item>
            </Col>
          </Row>
          {!isStudent && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="role" label="Vai trò" required>
                  <Select
                    placeholder="Hãy chọn vai trò"
                    onChange={(value) => handlerOnChange(value, "roleId")}
                  >
                    {listRole &&
                      listRole.map((item, index) => (
                        <Option key={index} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    </Box>
  );
}

CreateModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  getData: PropTypes.func,
  isStudent: PropTypes.bool,
  listRole: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CreateModal;
