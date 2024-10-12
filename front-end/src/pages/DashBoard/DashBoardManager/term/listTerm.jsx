import React, { useState } from "react";
import { Table, Input, Modal, Form, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import UpdateTerm from "./UpdateTerm";
import ViewTerm from "./viewTerm";

const { Title } = Typography;
const { Search } = Input;

const initialData = [
  { id: 1, name: "HK1_2024-2025" },
  { id: 2, name: "HK2_2024-2025" },
  // Add more terms as needed
];

const ListTerm = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTerm, setCurrentTerm] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleEdit = (term) => {
    setCurrentTerm(term);
    setIsEditModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((term) => term.id !== id));
  };

  const handleView = (term) => {
    setCurrentTerm(term);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    setCurrentTerm(null);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setCurrentTerm(null);
  };

  const handleEditModalOk = (values) => {
    setData(
      data.map((term) =>
        term.id === currentTerm.id ? { ...term, ...values } : term
      )
    );
    setIsEditModalVisible(false);
    setCurrentTerm(null);
  };

  const filteredData = data.filter((term) =>
    term.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => handleView(record)}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
            endIcon={<InfoCircleOutlined />}
          >
            View Details
          </Button>
          <Button
            onClick={() => handleEdit(record)}
            variant="contained"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
              background: "#1DA57A",
            }}
            endIcon={<EditOutlined />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
            }}
            endIcon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={6} style={{ textAlign: "center" }}>
        List of Terms
      </Title>
      <Search
        placeholder="Search by name"
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{ marginBottom: 20, width: 500, height: 40 }}
      />
      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      <Modal
        title={`Chỉnh sửa ${currentTerm?.name}`}
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
        width="75%"
      >
        {currentTerm && (
          <UpdateTerm
            term={currentTerm}
            onOk={handleEditModalOk}
            onCancel={handleEditModalCancel}
          />
        )}
      </Modal>
      <Modal
        title={`Xem thông tin ${currentTerm?.name}`}
        visible={isViewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
        width="75%"
      >
        {currentTerm && (
          <ViewTerm term={currentTerm} onCancel={handleViewModalCancel} />
        )}
      </Modal>
    </div>
  );
};

export default ListTerm;
