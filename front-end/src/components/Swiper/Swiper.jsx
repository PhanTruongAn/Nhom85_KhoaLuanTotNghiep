import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import image1 from "../../images/anhdong/Welcome.lottie"; // Đường dẫn ảnh động của bạn
import background from "../../images/background.jpg";

const HomePage = () => {
  return (
    <Box
      sx={{
        mt: 4,
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        py: 8,
        backgroundImage: `url(${background})`,
      }}
    >
      <Container sx={{ marginTop: "100px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" }, // Dọc trên mobile, ngang trên desktop
            gap: 4,
            padding: "20px",
          }}
        >
          {/* Phần trái: Tiêu đề chính và lời chào */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "10px", md: "0px 20px" }, // Thêm padding
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: "#2c3e50", fontWeight: "bold", mb: 2 }}
            >
              Chào mừng bạn đến với Hệ thống Đăng ký Luận văn
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7f8c8d", fontSize: "1.2rem", mb: 4 }}
            >
              Hãy dễ dàng đăng ký đề tài luận văn, theo dõi tiến trình của bạn,
              và nhận mọi thông tin cần thiết.
            </Typography>

            {/* Nút CTA */}
            <Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ fontSize: "1rem", px: 4 }}
              >
                Bắt đầu ngay
              </Button>
            </Box>
          </Box>

          {/* Phần phải: Hoạt ảnh chào mừng */}
          <Box
            className="swiper-container"
            sx={{
              flex: 1.2, // Tăng flex để phần hoạt ảnh chiếm nhiều không gian hơn
              textAlign: "center",
              display: { xs: "none", md: "block" },
            }}
          >
            <DotLottieReact
              style={{
                width: "100%",
                maxWidth: "650px", // Tăng kích thước maxWidth để hoạt ảnh lớn hơn
                margin: "0 auto",
              }}
              src={image1}
              loop
              autoplay
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
