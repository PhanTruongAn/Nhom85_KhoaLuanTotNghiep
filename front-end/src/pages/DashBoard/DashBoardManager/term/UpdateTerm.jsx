import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Card,
  Space,
  message,
  Select,
} from "antd";
import { Button, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import CustomButton from "../../../../components/Button/CustomButton";
import managerApi from "../../../../apis/managerApi";
import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle } from "react";

const { Option } = Select;

const UpdateTerm = ({ term, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedSection, setSelectedSection] = useState(null); // State to track selected time section

  const dateFields = [
    {
      title: "Thời gian khóa luận",
      fields: [
        { name: "startDate", label: "Start Date" },
        { name: "endDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian tham gia nhóm",
      fields: [
        { name: "startChooseGroupDate", label: "Start Date" },
        { name: "endChooseGroupDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian công bố đề tài",
      fields: [
        { name: "startPublicTopicDate", label: "Start Date" },
        { name: "endPublicTopicDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian chọn đề tài",
      fields: [
        { name: "startChooseTopicDate", label: "Start Date" },
        { name: "endChooseTopicDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian làm đề tài",
      fields: [
        { name: "startDiscussionDate", label: "Start Date" },
        { name: "endDiscussionDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian báo cáo khóa luận",
      fields: [
        { name: "startReportDate", label: "Start Date" },
        { name: "endReportDate", label: "End Date" },
      ],
    },
    {
      title: "Thời gian công bố kết quả",
      fields: [
        { name: "startPublicResultDate", label: "Start Date" },
        { name: "endPublicResultDate", label: "End Date" },
      ],
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    const formattedValues = {};
    Object.keys(values).forEach((key) => {
      if (values[key] && dayjs.isDayjs(values[key])) {
        formattedValues[key] = values[key].format("YYYY-MM-DD HH:mm:ss");
      } else {
        formattedValues[key] = values[key];
      }
    });
    let res = await managerApi.updateTerm(formattedValues);
    if (res && res.status === 0) {
      setLoading(false);
      onOk();
      onCancel();
      messageApi.success(res.message);
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };
  const handleCancel = () => {
    form.resetFields(); // This will reset the form fields to initial values
    onCancel(); // Call the provided onCancel function to close the modal
  };
  return (
    <Box
      style={{
        overflow: "auto",
        width: "100%",
        height: "100%",
        padding: "10px",
      }}
    >
      {contextHolder}
      <Form
        form={form}
        initialValues={Object.keys(term).reduce((acc, key) => {
          if (key.includes("Date")) {
            acc[key] = term[key] ? dayjs(term[key]) : null;
          } else {
            acc[key] = term[key];
          }
          return acc;
        }, {})}
        onFinish={handleSubmit}
      >
        <Form.Item name="id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Tên không được bỏ trống!" }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>

        {/* Select to choose which time section to display */}
        <Form.Item label="Chọn thời gian">
          <Select
            style={{ width: "50%" }}
            placeholder="Chọn thời gian để chỉnh sửa"
            onChange={(value) => setSelectedSection(value)}
          >
            {dateFields.map((section) => (
              <Option key={section.title} value={section.title}>
                {section.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Display selected date fields based on the chosen section */}
        {selectedSection &&
          dateFields
            .filter((section) => section.title === selectedSection)
            .map((section) => (
              <Card
                key={section.title}
                title={section.title}
                bordered={true}
                style={{ marginBottom: "10px", height: "120px" }}
                hoverable={true}
              >
                <Row gutter={16}>
                  {section.fields.map((field) => (
                    <Col span={12} key={field.name}>
                      <Form.Item label={field.label} name={field.name}>
                        <DatePicker
                          showTime
                          format="YYYY-MM-DD HH:mm"
                          style={{ width: "100%" }}
                          getPopupContainer={(trigger) => document.body} // Attach to body to ensure visibility
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Card>
            ))}

        <Space style={{ float: "right", marginTop: "10px" }}>
          <Button
            size="small"
            onClick={handleCancel} // Call the new handleCancel function
            variant="contained"
            color="error"
            endIcon={<ClearIcon />}
          >
            Hủy bỏ
          </Button>
          <CustomButton
            onClick={() => form.submit()}
            sx={[
              (theme) => ({
                ...theme.applyStyles("light", {
                  background: "#ff993a",
                }),
              }),
            ]}
            text="Xác nhận"
            type="success"
            loading={loading}
          />
        </Space>
      </Form>
    </Box>
  );
};

UpdateTerm.propTypes = {
  term: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UpdateTerm;
