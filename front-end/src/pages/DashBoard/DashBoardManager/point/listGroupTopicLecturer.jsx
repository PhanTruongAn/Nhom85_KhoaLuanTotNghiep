import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  Dialog,
} from "@mui/material";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PointTopicStudent from "./pointTopicStudent";

const initialData = [
  {
    key: "1",
    groupName: "Nhóm A",
    topicName: "Đề tài A",
  },
  {
    key: "2",
    groupName: "Nhóm B",
    topicName: "Đề tài B",
  },
  {
    key: "3",
    groupName: "Nhóm C",
    topicName: "Đề tài C",
  },
];

function ListGroupTopicLecturer() {
  const [searchType, setSearchType] = useState("groupName");
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [selectedGroup, setSelectedGroup] = useState(null); // State to hold the selected group
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const filtered = initialData.filter((item) =>
      item[searchType].toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      width: "100px",
    },
    {
      title: "Tên đề tài",
      dataIndex: "topicName",
      key: "topicName",
    },
    {
      title: "Actions",
      key: "actions",
      width: "200px",
      render: (_, record) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleGrade(record)} // Call handleGrade on button click
        >
          Chấm điểm
        </Button>
      ),
    },
  ];

  const handleGrade = (record) => {
    setSelectedGroup(record); // Set the selected group when grading
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGroup(null); // Reset selection
  };

  return (
    <Box padding={3} sx={{ width: "100%", borderRadius: 2 }}>
      <Typography variant="h5" color="#1976d2" marginBottom={2}>
        Danh sách nhóm và đề tài
      </Typography>

      <Box display="flex" alignItems="center" gap={2} marginBottom={3}>
        <Select
          value={searchType}
          onChange={handleSearchTypeChange}
          variant="outlined"
          size="small"
        >
          <MenuItem value="groupName">Tên nhóm</MenuItem>
          <MenuItem value="topicName">Tên đề tài</MenuItem>
        </Select>
        <Input
          placeholder="Tìm kiếm..."
          value={searchValue}
          onChange={handleSearchChange}
          onPressEnter={handleSearch}
          suffix={
            <SearchOutlined
              style={{ cursor: "pointer" }}
              onClick={handleSearch}
            />
          }
          style={{ width: "500px", height: "30px" }}
        />
      </Box>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        style={{
          borderRadius: "8px",
          boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
        }}
      />

      {/* Dialog for PointTopicStudent */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <PointTopicStudent
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          onClose={handleCloseDialog} // Add onClose prop
        />
      </Dialog>
    </Box>
  );
}

export default ListGroupTopicLecturer;
