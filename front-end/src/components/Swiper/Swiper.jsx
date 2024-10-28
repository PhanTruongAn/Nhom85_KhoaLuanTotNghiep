import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import image1 from "../../images/anhdong/Welcome.lottie";
import StartNow from "../../images/anhdong/startnow.lottie";

const HomePage = () => {
  const [themes, setThemes] = useState(
    localStorage.getItem("themeDark") === "true"
  );

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("themeDark");
      const themeValue = storedTheme === "true";
      if (themeValue !== themes) {
        setThemes(themeValue);
      }
    };

    // Kiểm tra giá trị themeDark trong localStorage mỗi 100ms
    const intervalId = setInterval(checkTheme, 100);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, [themes]); // Chạy khi themes thay đổi

  return (
    <Box
      sx={{
        mt: 4,
        minHeight: "100vh",
        py: 8,

        backgroundSize: "cover",
      }}
    >
      <Container sx={{ marginTop: "100px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            padding: "20px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "10px", md: "0px 20px" },
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Chào mừng bạn đến với Hệ thống Đăng ký Luận văn
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 4 }}>
              Hãy dễ dàng đăng ký đề tài luận văn, theo dõi tiến trình của bạn,
              và nhận mọi thông tin cần thiết.
            </Typography>

            <DotLottieReact
              src={StartNow}
              loop
              autoplay
              style={{
                width: "100%",
                height: "100%",
                marginTop: "-80px",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.replace("/login");
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1.2,
              textAlign: "center",
              display: { xs: "block", md: "block" },
            }}
          >
            <DotLottieReact
              style={{
                width: "100%",
                maxWidth: "650px",
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
