import React, { useState } from "react";
import { Collapse, Button } from "antd";
import {
  InfoCircleOutlined,
  DownOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
const { Panel } = Collapse;

const ProjectDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card
        sx={{
          marginBottom: "20px",
          padding: "10px",
        }}
        variant="elevation"
      >
        <Typography sx={{ fontWeight: 700 }}>
          THÔNG TIN GIẢNG VIÊN HƯỚNG DẪN
        </Typography>
        <Typography>Họ và tên giảng viên: Đặng Thị Thu Hà</Typography>

        <Typography>Email liên hệ: dtthuha79@gmail.com</Typography>

        <Typography>Số điện thoại: 0903016048</Typography>
      </Card>

      {/* Project Typography Section */}
      <Card
        style={{
          marginBottom: "20px",
          padding: "10px",
        }}
        variant="elevation"
      >
        <Typography sx={{ fontSize: "18px" }}>TÊN ĐỀ TÀI:</Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          Xây dựng website đăng ký đề tài và giám sát thực hiện khóa luận tốt
          nghiệp cho sinh viên Khoa CNTT-IUH
        </Typography>

        <DownOutlined
          onClick={toggleDetails}
          style={{
            fontSize: "24px",
            justifyItems: "center",
            float: "right",
            marginTop: "-35px",
            cursor: "pointer",
          }}
        />
      </Card>

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
          <Panel header="Dự kiến sản phẩm nghiên cứu của đề tài">
            <Typography>
              - Website cho phép SV đăng ký đề tài KLTN (chọn đề tài, GVHD,...)
              <br />- GV giám sát việc đăng ký của SV với mời GV, thiết lập các
              khoảng thời gian theo tiến độ thực hiện đề tài.
            </Typography>
          </Panel>

          <Panel header="Mục tiêu cần đạt được" key="2">
            <Typography>
              - Phân tích tiến độ đăng ký đề tài và báo cáo thực hiện với GVHD.
              <br />- Website ứng dụng đồng bộ dữ liệu của SV và GVHD cùng thực
              hiện trên một nền tảng.
            </Typography>
          </Panel>

          <Panel header="Yêu cầu đầu ra" key="3">
            <Typography>
              - SV có kiến thức về lập trình hệ thống.
              <br />- SV có kiến thức về lập trình Web.
              <br />- SV chịu khó học hỏi và tìm hiểu tài liệu liên quan.
            </Typography>
          </Panel>

          <Panel header="Chuẩn đầu ra" key="4">
            <Typography>
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
            </Typography>
          </Panel>

          <Panel header="Thông tin chi tiết của đề tài" key="5">
            <Typography>
              - Thông tin chi tiết về đề tài sẽ được trình bày ở đây. Bạn có thể
              thêm nội dung liên quan đến các yêu cầu, tiến độ, và các vấn đề
              khác mà sinh viên cần lưu ý.
            </Typography>
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
