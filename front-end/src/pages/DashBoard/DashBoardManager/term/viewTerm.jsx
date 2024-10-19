import React from "react";
import { Form, Input, Row, Col, Card } from "antd";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";

const ViewTerm = ({ term, onCancel }) => {
  const [form] = Form.useForm();

  const renderReadOnlyField = (label, value) => (
    <Form.Item label={label}>
      <Input value={value} readOnly style={{ width: "100%" }} />
    </Form.Item>
  );

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

  return (
    <Box
      style={{ height: 450, overflow: "auto", width: "100%", padding: "10px" }}
    >
      <Form form={form}>
        {/* Mapping để render các card */}
        {dateFields.map((section) => (
          <Card
            key={section.title}
            title={section.title}
            bordered={true}
            style={{ marginBottom: "10px", height: "auto" }}
          >
            <Row gutter={16}>
              {section.fields.map((field) => (
                <Col span={12} key={field.name}>
                  {renderReadOnlyField(
                    field.label,
                    term[field.name]
                      ? dayjs(term[field.name]).format("DD/MM/YYYY HH:mm")
                      : "N/A"
                  )}
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </Form>

      <Button
        variant="contained"
        size="small"
        sx={{
          marginTop: "15px",
          textTransform: "none",
        }}
        onClick={onCancel}
      >
        Đóng
      </Button>
    </Box>
  );
};

export default ViewTerm;
