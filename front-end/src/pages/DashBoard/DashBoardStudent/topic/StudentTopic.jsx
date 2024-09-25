import React, { useState } from "react";
import { Collapse, Typography, Button } from "antd";
import {
  InfoCircleOutlined,
  DownOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const ProjectDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <Title level={4}>THÔNG TIN GIẢNG VIÊN HƯỚNG DẪN</Title>
        <Text strong>Họ và tên giảng viên: </Text>
        <Text>Đặng Thị Thu Hà</Text>
        <br />
        <Text strong>Email liên hệ: </Text>
        <Text>dtthuha79@gmail.com</Text>
        <br />
        <Text strong>Số điện thoại: </Text>
        <Text>0903016048</Text>
      </div>

      {/* Project Title Section */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <Text strong style={{ fontSize: "18px" }}>
          TÊN ĐỀ TÀI:
        </Text>
        <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
          Xây dựng website đăng ký đề tài và giám sát thực hiện khóa luận tốt
          nghiệp cho sinh viên Khoa CNTT-IUH
        </Text>

        <DownOutlined
          onClick={toggleDetails}
          style={{
            fontSize: "24px",
            justifyItems: "center",
            marginTop: "5px",
            float: "right",
            cursor: "pointer",
          }}
        />
      </div>

      {showDetails && (
        <Collapse
          expandIcon={({ isActive }) => (
            <InfoCircleOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Panel header="Dự kiến sản phẩm nghiên cứu của Đề tài" key="1">
            <Text>
              - Website cho phép SV đăng ký đề tài KLTN (chọn đề tài, GVHD,...)
              <br />- GV giám sát việc đăng ký của SV với mời GV, thiết lập các
              khoảng thời gian theo tiến độ thực hiện đề tài.
            </Text>
          </Panel>

          <Panel header="Mục tiêu cần đạt được" key="2">
            <Text>
              - Phân tích tiến độ đăng ký đề tài và báo cáo thực hiện với GVHD.
              <br />- Website ứng dụng đồng bộ dữ liệu của SV và GVHD cùng thực
              hiện trên một nền tảng.
            </Text>
          </Panel>

          <Panel header="Yêu cầu đầu ra" key="3">
            <Text>
              - SV có kiến thức về lập trình hệ thống.
              <br />- SV có kiến thức về lập trình Web.
              <br />- SV chịu khó học hỏi và tìm hiểu tài liệu liên quan.
            </Text>
          </Panel>

          <Panel header="Chuẩn đầu ra" key="4">
            <Text>
              A. Sinh viên tham gia đề tài:
              <ol>
                <li>
                  Nhận diện được cấu trúc, hình thức và các bước lập trình C#.
                </li>
                <li>
                  Kiến thức về quy trình phát triển phần mềm: Requirement
                  Design, Coding, Unit Testing, Maintaining.
                </li>
                <li>
                  Đọc hiểu tài liệu hướng dẫn và các tài liệu liên quan đến dự
                  án.
                </li>
              </ol>
            </Text>
          </Panel>

          <Panel header="Thông tin chi tiết của đề tài" key="5">
            <Text>
              - Thông tin chi tiết về đề tài sẽ được trình bày ở đây. Bạn có thể
              thêm nội dung liên quan đến các yêu cầu, tiến độ, và các vấn đề
              khác mà sinh viên cần lưu ý.
            </Text>
          </Panel>
        </Collapse>
      )}

      <Button icon={<ReadOutlined />} style={{ marginTop: "20px" }}>
        HỦY ĐĂNG KÝ ĐỀ TÀI
      </Button>
    </div>
  );
};

export default ProjectDetails;
