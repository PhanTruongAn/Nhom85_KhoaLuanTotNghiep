import { useState } from "react";
import { CardContent, CardHeader, Grid, Box, Typography } from "@mui/material";
import { DatePicker, Input, message } from "antd";
import { Card } from "../../../../components/Card/Card";
import managerApi from "../../../../apis/managerApi";
import CustomButton from "../../../../components/Button/CustomButton";

function CreateTerm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
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
    endReportDate: null,
    startPublicResultDate: null,
    endPublicResultDate: null,
    startPublicTopicDate: null,
    endPublicTopicDate: null,
    startReportDate: null,
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!term.name.trim()) {
      newErrors.name = "Tên học kỳ là bắt buộc.";
    }
    const dateFields = [
      "startDate",
      "endDate",
      "startChooseGroupDate",
      "endChooseGroupDate",
      "startChooseTopicDate",
      "endChooseTopicDate",
      "startDiscussionDate",
      "endDiscussionDate",
      "startReportDate",
      "endReportDate",
      "startPublicResultDate",
      "endPublicResultDate",
      "startPublicTopicDate",
      "endPublicTopicDate",
    ];

    dateFields.forEach((field) => {
      if (!term[field]) {
        newErrors[field] = "Trường này là bắt buộc.";
      }
    });

    if (term.startDate && term.endDate && term.startDate > term.endDate) {
      newErrors.startDate = "Ngày bắt đầu không được lớn hơn ngày kết thúc.";
      newErrors.endDate = "Ngày kết thúc không được nhỏ hơn ngày bắt đầu.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date, dateString, field) => {
    setTerm({ ...term, [field]: date });
    setErrors({ ...errors, [field]: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerm({ ...term, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      messageApi.error("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    setLoading(true);
    const res = await managerApi.createTerm(term);
    if (res && res.status === 0) {
      setLoading(false);
      messageApi.success(res.message);
    } else {
      setLoading(false);
      messageApi.error(res.message);
    }
  };

  return (
    <Box sx={{ maxHeight: 560, overflow: "auto", padding: "13px" }}>
      {contextHolder}
      <Box p={3}>
        <Card elevation={3} sx={{ marginBottom: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ margin: "10px 0 20px 10px" }}
          >
            Tạo Học Kỳ Mới
          </Typography>
          <CardContent>
            <Input
              placeholder="Nhập tên học kì có định dạng sau: HK1 2024-2025"
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
            {errors.name && (
              <Typography color="error" variant="body2">
                {errors.name}
              </Typography>
            )}
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
            title: "Thời gian công bố đề tài",
            start: "startPublicTopicDate",
            end: "endPublicTopicDate",
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
                  {errors[section.start] && (
                    <Typography color="error" variant="body2">
                      {errors[section.start]}
                    </Typography>
                  )}
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
                  {errors[section.end] && (
                    <Typography color="error" variant="body2">
                      {errors[section.end]}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={3}>
          <CustomButton
            text="Tạo học kì mới"
            onClick={handleSubmit}
            type="success"
            loading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CreateTerm;
