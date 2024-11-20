import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={[
        (theme) => ({
          ...theme.applyStyles("dark", {
            backgroundColor: "#09223b",
          }),
          padding: "20px 0",
          textAlign: "center",
        }),
      ]}
    >
      <Box
        className="container-main"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Grid container spacing={3} sx={{ textAlign: "left" }}>
          {/* Company Name Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Giới thiệu
            </Typography>
            <Typography>
              Chào mừng các bạn đến với Hệ thống đăng kí khóa luận của khoa công
              nghệ thông tin trường Đại học Công nghiệp TP.HCM.
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Liên hệ
            </Typography>
            <Typography>
              <i className="fas fa-home"></i> Khoa Công nghệ Thông tin - Lầu 1 -
              Nhà H
            </Typography>
            <Typography>
              <i className="fas fa-envelope"></i> Email: daotao.fit@iuh.edu.vn
            </Typography>
            <Typography>
              <i className="fas fa-phone"></i> Điện thoại: 028.389.40390 - 167
            </Typography>
          </Grid>

          {/* Follow FIT IUH Section */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Liên kết
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "start" }}
              gap={2}
            >
              <Button
                href="https://www.facebook.com/khoacntt.iuh"
                target="_blank"
                variant="contained"
                startIcon={<FacebookIcon />}
                sx={{ backgroundColor: "#3b5998", color: "white" }}
              >
                Facebook
              </Button>
              <Button
                href="https://fit.iuh.edu.vn/"
                target="_blank"
                variant="contained"
                startIcon={<GoogleIcon />}
                sx={{ backgroundColor: "#dd4b39", color: "white" }}
              >
                Google
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "10px 0",
            marginTop: "20px",
          }}
        >
          <Typography variant="body2">
            © 2017 Khoa Công nghệ thông tin - Đại học Công nghiệp Thành phố Hồ
            Chí Minh
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
