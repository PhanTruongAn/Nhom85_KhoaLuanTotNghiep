import React, { useState } from "react";
import { Select, Table, Card } from "antd";
import { Typography, Box } from "@mui/material";
import { AuditOutlined } from "@ant-design/icons";

const { Option } = Select;

const criteriaData = [
  {
    title: "Tiêu chí Đánh giá",
    criteria: [
      {
        id: 1,
        name: "Triển khai dự án theo giải pháp đã thiết kế.",
        maxPoints: 2,
      },
      {
        id: 2,
        name: "Đánh giá kết quả đã triển khai.",
        maxPoints: 1,
      },
      {
        id: 3,
        name: "Xác định các kỹ thuật và công nghệ để đáp ứng các yêu cầu đã xác định.",
        maxPoints: 1,
      },
      {
        id: 4,
        name: "Thiết kế giải pháp kỹ thuật để đáp ứng yêu cầu của dự án.",
        maxPoints: 2,
      },
      {
        id: 5,
        name: "Viết tài liệu dự án theo các quy định đã định trước.",
        maxPoints: 1,
      },
      {
        id: 6,
        name: "Phân tích và mô hình hóa các yêu cầu của dự án.",
        maxPoints: 2,
      },
      {
        id: 7,
        name: "Xác định các yêu cầu của dự án.",
        maxPoints: 1,
      },
    ],
  },
  {
    title: "Tiêu chí Đánh giá phản biện",
    criteria: [
      {
        id: 1,
        name: "Đánh giá kết quả đã triển khai.",
        maxPoints: 1,
      },
      {
        id: 2,
        name: "Xác định các yêu cầu của dự án.",
        maxPoints: 1,
      },
      {
        id: 3,
        name: "Xác định các kỹ thuật và công nghệ để đáp ứng các yêu cầu đã xác định.",
        maxPoints: 1,
      },
      {
        id: 4,
        name: "Bảo vệ kết quả của dự án trước phản biện.",
        maxPoints: 2,
      },
      {
        id: 5,
        name: "Viết tài liệu dự án theo các quy định đã định trước.",
        maxPoints: 1,
      },
      {
        id: 6,
        name: "Thiết kế giải pháp kỹ thuật để đáp ứng yêu cầu của dự án.",
        maxPoints: 1,
      },
      {
        id: 7,
        name: "Triển khai dự án theo giải pháp đã thiết kế.",
        maxPoints: 2,
      },
      {
        id: 8,
        name: "Phân tích và mô hình hóa các yêu cầu của dự án.",
        maxPoints: 1,
      },
    ],
  },
  {
    title: "Tiêu chí Đánh giá Báo cáo",
    criteria: [
      {
        id: 1,
        name: "Triển khai dự án theo giải pháp đã thiết kế.",
        maxPoints: 2,
      },
      {
        id: 2,
        name: "Xác định các yêu cầu của dự án.",
        maxPoints: 2,
      },
      {
        id: 3,
        name: "Đánh giá kết quả đã triển khai.",
        maxPoints: 1,
      },
      {
        id: 4,
        name: "Thiết kế giải pháp kỹ thuật để đáp ứng yêu cầu của dự án.",
        maxPoints: 2,
      },
      {
        id: 5,
        name: "Viết tài liệu dự án theo các quy định đã định trước.",
        maxPoints: 1,
      },
      {
        id: 6,
        name: "Xác định các kỹ thuật và công nghệ để đáp ứng các yêu cầu đã xác định.",
        maxPoints: 1,
      },
      {
        id: 7,
        name: "Phân tích và mô hình hóa các yêu cầu của dự án.",
        maxPoints: 1,
      },
    ],
  },
];

const Criteria = () => {
  const [selectedCriteria, setSelectedCriteria] = useState(0);

  const handleChange = (value) => {
    setSelectedCriteria(value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "120px",
    },
    {
      title: "Tên tiêu chí",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Điểm tối đa",
      dataIndex: "maxPoints",
      key: "maxPoints",
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "20px" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexWrap: "wrap" }}
      >
        <Box display="flex" alignItems="center">
          <AuditOutlined
            style={{ fontSize: "26px", marginBottom: "10px", color: "#006ed3" }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              margin: { xs: "0 5px 10px", sm: "0 10px 10px" },
              color: "#006ed3",
            }}
          >
            Tiêu chí Đánh giá
          </Typography>
        </Box>
        <Select
          defaultValue={0}
          style={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }} // Make Select full width with max
          onChange={handleChange}
        >
          {criteriaData.map((section, index) => (
            <Option key={index} value={index}>
              {section.title}
            </Option>
          ))}
        </Select>
      </Box>
      {/* <Card
        title={criteriaData[selectedCriteria].title}
        style={{ overflow: "hidden" }}
      >
        <Table
          dataSource={criteriaData[selectedCriteria].criteria}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ y: 340 }}
        />
      </Card> */}
      <Table
        dataSource={criteriaData[selectedCriteria].criteria}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ y: 580 }}
      />
    </Box>
  );
};

export default Criteria;
