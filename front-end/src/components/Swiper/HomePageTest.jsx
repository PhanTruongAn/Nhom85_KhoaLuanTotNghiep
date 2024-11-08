import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../../images/homepage/image1.jpg";
import image2 from "../../images/homepage/image2.jpg";
import image3 from "../../images/homepage/image3.jpg";
import imagedark1 from "../../images/homepage/imagedark1.jpg";
import imagedark2 from "../../images/homepage/imagedark2.jpg";
import imagedark3 from "../../images/homepage/imagedark3.jpg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import StartNow from "../../images/anhdong/startnow.lottie";
import Marquee from "react-fast-marquee";
import Welcome from "../../images/anhdong/Welcome.lottie";

function HomePageTest() {
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

    const intervalId = setInterval(checkTheme, 100);

    return () => clearInterval(intervalId);
  }, [themes]);

  // Define both light and dark image arrays
  const images = [image1, image2, image3];
  const imagesdark = [imagedark1, imagedark2, imagedark3];
  const themeImages = themes ? imagesdark : images;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Update `currentIndex` to cycle through `themeImages`
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % themeImages.length);
    }, 2000); // 2 seconds interval

    return () => clearInterval(interval);
  }, [themes, themeImages.length]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: isSmallScreen ? "97.6px" : "96px",
      }}
    >
      {/* Main Carousel Section */}
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop
        autoPlay={false}
        showStatus={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <span
            style={{
              display: "inline-block",
              margin: "0 8px",
              cursor: "pointer",
              color: isSelected ? "#fff" : "#888",
            }}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          >
            ●
          </span>
        )}
      >
        <Box
          sx={{
            backgroundImage: `url(${themeImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            position: "relative",
          }}
        >
          {/* Marquee Text */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 10,
            }}
          >
            <Marquee direction="right">
              <Typography variant="h4">
                Chào mừng đến với Hệ thống Đăng ký Luận văn!
              </Typography>
            </Marquee>
          </Box>

          {/* Main Content and Thumbnails Section */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Offset by half its width
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              color: "#fff",
              maxWidth: isSmallScreen ? "100%" : "80%",
              gap: "24px",
              width: "100%", // Full width on small screens
            }}
          >
            {/* Text and Animation Section */}
            <Box sx={{ maxWidth: "500px", width: "100%" }}>
              <DotLottieReact
                style={{ width: "100%", maxWidth: "650px", margin: "0 auto" }}
                src={Welcome}
                loop
                autoplay
              />
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: themes ? "#fff" : "#000",
                }}
              >
                Dễ dàng đăng ký đề tài luận văn, theo dõi tiến trình của bạn, và
                nhận mọi thông tin cần thiết.
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
                onClick={() => window.location.replace("/login")}
              />
            </Box>

            {/* Conditionally Render Thumbnails */}
            <Box
              sx={{
                display: isSmallScreen ? "none" : "flex",
                flexDirection: "row",
                gap: "24px",
              }}
            >
              {themeImages.map((img, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "200px",
                    width: "200px",
                    borderRadius: "12px",
                    boxShadow:
                      "0px 10px 20px rgba(0, 0, 0, 0.3), 0px 6px 18px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                    border: currentIndex === index ? "3px solid #fff" : "none",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    perspective: "1000px",
                    transform: "rotateY(-10deg) translateZ(10px)",
                    "&:hover": {
                      transform: "scale(1.1) rotateY(0deg) translateZ(20px)",
                      boxShadow:
                        "0px 12px 25px rgba(0, 0, 0, 0.4), 0px 8px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </Box>
          </Box>
          {/* Information Section - now conditionally placed */}
          {!isSmallScreen && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-end",
                gap: "24px",
                padding: "16px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                zIndex: 10,
              }}
            >
              {/* Giới thiệu về hệ thống */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #5A9BD5, #1E3A8A)",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow:
                    "0px 8px 15px rgba(0, 0, 0, 0.3), 0px 4px 10px rgba(0, 0, 0, 0.2)",
                  color: "#fff",
                  width: "300px",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      "0px 10px 18px rgba(0, 0, 0, 0.4), 0px 6px 15px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                <Box
                  className="title"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginBottom: "8px",
                  }}
                >
                  Giới thiệu về hệ thống
                </Box>
                <Divider sx={{ backgroundColor: "black", margin: "8px 0" }} />
                <Box
                  className="content"
                  sx={{ fontSize: "1rem", lineHeight: "1.5" }}
                >
                  Hệ thống quản lý khóa luận giúp sinh viên và giảng viên theo
                  dõi và quản lý dễ dàng.
                </Box>
              </Box>

              {/* Mục tiêu */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #66BB6A, #2E7D32)",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow:
                    "0px 8px 15px rgba(0, 0, 0, 0.3), 0px 4px 10px rgba(0, 0, 0, 0.2)",
                  color: "#fff",
                  width: "300px",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      "0px 10px 18px rgba(0, 0, 0, 0.4), 0px 6px 15px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                <Box
                  className="title"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginBottom: "8px",
                  }}
                >
                  Mục tiêu
                </Box>
                <Divider sx={{ backgroundColor: "black", margin: "8px 0" }} />
                <Box
                  className="content"
                  sx={{ fontSize: "1rem", lineHeight: "1.5" }}
                >
                  Đảm bảo tất cả sinh viên đều có thể truy cập và đăng ký đề tài
                  luận văn một cách dễ dàng.
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Carousel>
    </Box>
  );
}

export default HomePageTest;
