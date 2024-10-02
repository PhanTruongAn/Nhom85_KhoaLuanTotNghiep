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
        name: "Implement the project according to the designed solution.",
        maxPoints: 20,
      },
      { id: 2, name: "Evaluate the implemented results.", maxPoints: 10 },
      {
        id: 3,
        name: "Determine the techniques and technologies to address the identified requirements.",
        maxPoints: 10,
      },
      {
        id: 4,
        name: "Design an engineering-based solution to meet the requirements of the project.",
        maxPoints: 20,
      },
      {
        id: 5,
        name: "Write the project documentation according to predefined regulations.",
        maxPoints: 10,
      },
      {
        id: 6,
        name: "Analyze and model the requirements of the project.",
        maxPoints: 20,
      },
      {
        id: 7,
        name: "Identify the requirements of the project.",
        maxPoints: 10,
      },
    ],
  },
  {
    title: "Tiêu chí Đánh giá Phân biện",
    criteria: [
      { id: 1, name: "Evaluate the implemented results.", maxPoints: 10 },
      {
        id: 2,
        name: "Identify the requirements of the project.",
        maxPoints: 10,
      },
      {
        id: 3,
        name: "Determine the techniques and technologies to address the identified requirements.",
        maxPoints: 10,
      },
      {
        id: 4,
        name: "Defend the results of the project before critics.",
        maxPoints: 20,
      },
      {
        id: 5,
        name: "Write the project documentation according to predefined regulations.",
        maxPoints: 10,
      },
      {
        id: 6,
        name: "Design an engineering-based solution to meet the requirements of the project.",
        maxPoints: 10,
      },
      {
        id: 7,
        name: "Implement the project according to the designed solution.",
        maxPoints: 20,
      },
      {
        id: 8,
        name: "Analyze and model the requirements of the project.",
        maxPoints: 10,
      },
    ],
  },
  {
    title: "Tiêu chí Đánh giá Báo cáo",
    criteria: [
      {
        id: 1,
        name: "Implement the project according to the designed solution.",
        maxPoints: 20,
      },
      {
        id: 2,
        name: "Identify the requirements of the project.",
        maxPoints: 20,
      },
      { id: 3, name: "Evaluate the implemented results.", maxPoints: 10 },
      {
        id: 4,
        name: "Design an engineering-based solution to meet the requirements of the project.",
        maxPoints: 20,
      },
      {
        id: 5,
        name: "Write the project documentation according to predefined regulations.",
        maxPoints: 10,
      },
      {
        id: 6,
        name: "Determine the techniques and technologies to address the identified requirements.",
        maxPoints: 10,
      },
      {
        id: 7,
        name: "Analyze and model the requirements of the project.",
        maxPoints: 10,
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
    <div style={{ padding: "20px", overflow: "hidden" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <AuditOutlined style={{ fontSize: "26px" }} />
          <Typography variant="h5" fontWeight="bold" sx={{ margin: "0 10px" }}>
            Tiêu chí Đánh giá
          </Typography>
        </Box>
        <Select
          defaultValue={0}
          style={{ width: "300px", marginBottom: "10px" }}
          h
          onChange={handleChange}
        >
          {criteriaData.map((section, index) => (
            <Option key={index} value={index}>
              {section.title}
            </Option>
          ))}
        </Select>
      </Box>
      <Card
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
      </Card>
    </div>
  );
};

export default Criteria;
