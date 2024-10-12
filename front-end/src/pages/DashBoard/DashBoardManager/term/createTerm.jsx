import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function CreateTerm() {
  const [term, setTerm] = useState({
    name: "",
    startDate: null,
    endDate: null,
    startChooseGroupDate: null,
    endChooseGroupDate: null,
    startChooseTopicDate: null,
    endChooseTopicDate: null,
    startDiscussionDate: null,
    endDiscussionDate: null,
    startReportDate: null,
    endReportDate: null,
    startPublicResultDate: null,
    endPublicResultDate: null,
  });

  const handleDateChange = (date, dateString, field) => {
    setTerm({ ...term, [field]: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerm({ ...term, [name]: value });
  };

  const handleSubmit = () => {
    console.log(term);
  };

  return (
    <Box sx={{ maxHeight: 560, overflow: "auto", padding: "13px" }}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Tạo Học Kỳ Mới
        </Typography>
        <Card elevation={3} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Input
              placeholder="Tên học kỳ"
              name="name"
              value={term.name}
              onChange={handleInputChange}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #d9d9d9",
              }}
            />
          </CardContent>
        </Card>

        {[
          {
            title: "Thời gian khóa luận",
            start: "startDate",
            end: "endDate",
          },
          {
            title: "Thời gian tham gia nhóm",
            start: "startChooseGroupDate",
            end: "endChooseGroupDate",
          },
          {
            title: "Thời gian chọn đề tài",
            start: "startChooseTopicDate",
            end: "endChooseTopicDate",
          },
          {
            title: "Thời gian làm đề tài",
            start: "startDiscussionDate",
            end: "endDiscussionDate",
          },
          {
            title: "Thời gian báo cáo khóa luận",
            start: "startReportDate",
            end: "endReportDate",
          },
          {
            title: "Thời gian công bố kết quả",
            start: "startPublicResultDate",
            end: "endPublicResultDate",
          },
        ].map((section, index) => (
          <Card key={index} elevation={3} style={{ marginBottom: "20px" }}>
            <CardHeader title={section.title} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Chọn ngày bắt đầu"
                    value={term[section.start]}
                    onChange={(date, dateString) =>
                      handleDateChange(date, dateString, section.start)
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Chọn ngày kết thúc"
                    value={term[section.end]}
                    onChange={(date, dateString) =>
                      handleDateChange(date, dateString, section.end)
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #d9d9d9",
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo học kỳ mới
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateTerm;
