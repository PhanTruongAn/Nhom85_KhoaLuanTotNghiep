import React, { useState } from "react";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";
import { Table, Select, Input, Space, message } from "antd";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomHooks from "../../../../utils/hooks";
import CustomButton from "../../../../components/Button/CustomButton";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { Card } from "../../../../components/Card/Card";
const { Search } = Input;
const { Option } = Select;

function CreateLecturerGroup() {
  return (
    <Box p={1}>
      <Grid container spacing={2}>
        {/* Lecturer Guide Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên phản biện 1</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Chọn mã giảng viên"
                    filterOption={(input, option) =>
                      option.value.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    <Option></Option>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    // loading
                    style={{ width: "100%" }}
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        {/* Lecturer Report Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "10px" }}>
            <Typography variant="h6">Giảng viên phản biện 2</Typography>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder="Chọn mã giảng viên"
                    filterOption={(input, option) =>
                      option.value.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    <Option></Option>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Search
                    placeholder="Nhập mã giảng viên, sđt, email"
                    enterButton={<SearchIcon />}
                    // loading
                    style={{ width: "100%" }}
                  />
                </Grid>
                {/* Lecturer Information */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mã giảng viên"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tên giảng viên"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value=""
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Space>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<RefreshIcon />}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<PersonAddIcon />}
          >
            Tạo nhóm
          </Button>
        </Space>
      </Box>
    </Box>
  );
}

export default CreateLecturerGroup;
