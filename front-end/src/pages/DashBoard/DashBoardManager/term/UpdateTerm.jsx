import React from "react";
import { Form, Input, DatePicker, Row, Col, Card } from "antd";
import { Button, Box } from "@mui/material";
import dayjs from "dayjs";

const UpdateTerm = ({ term, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      startDate: values.startDate
        ? values.startDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endDate: values.endDate
        ? values.endDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endChooseGroupDate: values.endChooseGroupDate
        ? values.endChooseGroupDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endChooseTopicDate: values.endChooseTopicDate
        ? values.endChooseTopicDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endDiscussionDate: values.endDiscussionDate
        ? values.endDiscussionDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endPublicResultDate: values.endPublicResultDate
        ? values.endPublicResultDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endPublicTopicDate: values.endPublicTopicDate
        ? values.endPublicTopicDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      endReportDate: values.endReportDate
        ? values.endReportDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      startChooseGroupDate: values.startChooseGroupDate
        ? values.startChooseGroupDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      startChooseTopicDate: values.startChooseTopicDate
        ? values.startChooseTopicDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      startDiscussionDate: values.startDiscussionDate
        ? values.startDiscussionDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      startPublicResultDate: values.startPublicResultDate
        ? values.startPublicResultDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      startPublicTopicDate: values.startPublicTopicDate
        ? values.startPublicTopicDate.format("YYYY-MM-DD HH:mm:ss")
        : null,
      createdAt: values.createdAt
        ? values.createdAt.format("YYYY-MM-DD HH:mm:ss")
        : null,
      updatedAt: values.updatedAt
        ? values.updatedAt.format("YYYY-MM-DD HH:mm:ss")
        : null,
    };
    onOk(updatedValues);
  };

  return (
    <Box
      style={{ height: 480, overflow: "auto", width: "100%", padding: "10px" }}
    >
      <Form
        form={form}
        initialValues={{
          ...term,
          startDate: term.startDate ? dayjs(term.startDate) : null,
          endDate: term.endDate ? dayjs(term.endDate) : null,
          endChooseGroupDate: term.endChooseGroupDate
            ? dayjs(term.endChooseGroupDate)
            : null,
          endChooseTopicDate: term.endChooseTopicDate
            ? dayjs(term.endChooseTopicDate)
            : null,
          endDiscussionDate: term.endDiscussionDate
            ? dayjs(term.endDiscussionDate)
            : null,
          endPublicResultDate: term.endPublicResultDate
            ? dayjs(term.endPublicResultDate)
            : null,
          endPublicTopicDate: term.endPublicTopicDate
            ? dayjs(term.endPublicTopicDate)
            : null,
          endReportDate: term.endReportDate ? dayjs(term.endReportDate) : null,
          startChooseGroupDate: term.startChooseGroupDate
            ? dayjs(term.startChooseGroupDate)
            : null,
          startChooseTopicDate: term.startChooseTopicDate
            ? dayjs(term.startChooseTopicDate)
            : null,
          startDiscussionDate: term.startDiscussionDate
            ? dayjs(term.startDiscussionDate)
            : null,
          startPublicResultDate: term.startPublicResultDate
            ? dayjs(term.startPublicResultDate)
            : null,
          startPublicTopicDate: term.startPublicTopicDate
            ? dayjs(term.startPublicTopicDate)
            : null,
          createdAt: term.createdAt ? dayjs(term.createdAt) : null,
          updatedAt: term.updatedAt ? dayjs(term.updatedAt) : null,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Tên không được bỏ trống!" }]}
        >
          <Input style={{ width: "50%" }} />
        </Form.Item>

        {/* Card for Start and End Dates */}
        <Card
          title="Thời gian khóa luận"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Card for Choose Group Dates */}
        <Card
          title="Thời gian tham gia nhóm"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startChooseGroupDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endChooseGroupDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Card for Choose Topic Dates */}
        <Card
          title="Thời gian chọn đề tài"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startChooseTopicDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endChooseTopicDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Card for Discussion Dates */}
        <Card
          title="Thời gian làm đề tài"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startDiscussionDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endDiscussionDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Card for Report Dates */}
        <Card
          title="Thời gian báo cáo khóa luận"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startReportDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endReportDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Card for Public Result Dates */}
        <Card
          title="Thời gian công bố kết quả"
          bordered={true}
          style={{ marginBottom: "10px", height: "120px" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Start Date" name="startPublicResultDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date" name="endPublicResultDate">
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            marginLeft: "10px",
            textTransform: "none",
          }}
        >
          Lưu
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{
            marginLeft: "10px",
            textTransform: "none",
          }}
          onClick={onCancel}
        >
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateTerm;
