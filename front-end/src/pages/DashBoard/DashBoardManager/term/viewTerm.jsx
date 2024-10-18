import React from "react";
import { Form, Input, Row, Col, Card } from "antd";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";

const ViewTerm = ({ term, onCancel }) => {
  const [form] = Form.useForm();

  const renderReadOnlyField = (value) => (
    <Form.Item>
      <Input value={value} readOnly style={{ width: "50%" }} />
    </Form.Item>
  );

  return (
    <Box
      style={{ height: 450, overflow: "auto", width: "100%", padding: "10px" }}
    >
      <Form form={form}>
        {renderReadOnlyField(term.name)}

        {/* Card for Start and End Dates */}
        <Card
          title="Thời gian khóa luận"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startDate
                  ? dayjs(term.startDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endDate
                  ? dayjs(term.endDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>

        {/* Card for Choose Group Dates */}
        <Card
          title="Thời gian tham gia nhóm"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startChooseGroupDate
                  ? dayjs(term.startChooseGroupDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endChooseGroupDate
                  ? dayjs(term.endChooseGroupDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>

        {/* Card for Choose Topic Dates */}
        <Card
          title="Thời gian chọn đề tài"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startChooseTopicDate
                  ? dayjs(term.startChooseTopicDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endChooseTopicDate
                  ? dayjs(term.endChooseTopicDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>

        {/* Card for Discussion Dates */}
        <Card
          title="Thời gian làm đề tài"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startDiscussionDate
                  ? dayjs(term.startDiscussionDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endDiscussionDate
                  ? dayjs(term.endDiscussionDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>

        {/* Card for Report Dates */}
        <Card
          title="Thời gian báo cáo khóa luận"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startReportDate
                  ? dayjs(term.startReportDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endReportDate
                  ? dayjs(term.endReportDate).format("YYYY-MM-DD HH:mm:ss")
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>

        {/* Card for Public Result Dates */}
        <Card
          title="Thời gian công bố kết quả"
          bordered={true}
          style={{ marginBottom: "10px", height: "auto" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              {renderReadOnlyField(
                "Start Date",
                term.startPublicResultDate
                  ? dayjs(term.startPublicResultDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"
              )}
            </Col>
            <Col span={12}>
              {renderReadOnlyField(
                "End Date",
                term.endPublicResultDate
                  ? dayjs(term.endPublicResultDate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "N/A"
              )}
            </Col>
          </Row>
        </Card>
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
