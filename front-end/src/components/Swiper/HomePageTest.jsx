import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";

// Import hình ảnh và animation
import image1 from "../../images/homepage/image1.avif";
import image2 from "../../images/homepage/image2.avif";
import image3 from "../../images/homepage/image3.avif";
import imagedark1 from "../../images/homepage/imagedark1.avif";
import imagedark2 from "../../images/homepage/imagedark2.avif";
import imagedark3 from "../../images/homepage/imagedark3.avif";
import StartNow from "../../images/anhdong/startnow.lottie";
import Welcome from "../../images/anhdong/Welcome.lottie";
import Icon1 from "../../images/homepage/imageManage.avif";
import Icon2 from "../../images/homepage/imageCoop.avif";
import Icon3 from "../../images/homepage/ImageSearchInfor.avif";

// Custom hook for theme handling
const useThemeSync = () => {
  const [themes, setThemes] = useState(
    localStorage.getItem("themeDark") === "true"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedTheme = localStorage.getItem("themeDark") === "true";
      if (storedTheme !== themes) {
        setThemes(storedTheme);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [themes]);

  return themes;
};

const TiltCard = ({ icon, title, description }) => {
  const themes = useThemeSync();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        padding: "32px",
        margin: "16px",
        borderRadius: "15px",
        backgroundColor: themes ? "#333" : "#f4f4f8",
        boxShadow:
          "0px 10px 20px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "column", lg: "row" },
        textAlign: { xs: "center", md: "center", lg: "left" },
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Box
        sx={{
          flex: "0 0 auto",
          marginRight: { xs: "0", lg: "24px" },
          marginBottom: { xs: "16px", lg: "0" },
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{
            width: "100%",
            maxWidth: "320px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box sx={{ flex: "1 1 auto" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Box>
  );
};

TiltCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const VerticalTiltComponent = () => {
  const themes = useThemeSync();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const tiltCards = [
    {
      icon: Icon1,
      title: "Quản lý đăng ký khóa luận dễ dàng",
      description:
        "Đơn giản hóa quy trình đăng ký khóa luận cho sinh viên và giảng viên, giúp tiết kiệm thời gian và công sức.",
    },
    {
      icon: Icon3,
      title: "Dễ dàng tra cứu thông tin",
      description:
        "Tìm kiếm và xem thông tin về các đề tài khóa luận một cách nhanh chóng và thuận tiện.",
    },
    {
      icon: Icon2,
      title: "Hợp tác và kết nối",
      description:
        "Cộng tác trực tiếp với giảng viên và các bạn cùng lớp trong suốt quá trình thực hiện khóa luận.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        padding: isSmallScreen ? "16px" : isMediumScreen ? "24px" : "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: isSmallScreen ? "90%" : isMediumScreen ? "100%" : "1200px",
          margin: "0 auto",
        }}
      >
        {tiltCards.map((card, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              justifyContent:
                index % 2 === 0
                  ? "flex-start"
                  : isSmallScreen
                  ? "center"
                  : "flex-end",
              width: "100%",
              marginBottom: isMediumScreen ? "16px" : "24px",
            }}
          >
            <TiltCard
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

function HomePageTest() {
  const themes = useThemeSync();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const images = useMemo(() => [image1, image2, image3], []);
  const imagesDark = useMemo(() => [imagedark1, imagedark2, imagedark3], []);
  const themeImages = themes ? imagesDark : images;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % themeImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [themeImages]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${themeImages[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "96px",
      }}
    >
      <Box sx={{ height: "100%" }}>
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
            ></span>
          )}
        >
          <Box
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: isMediumScreen ? "80vh" : "85vh",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 18,
                left: 16,
                zIndex: 10,
              }}
            >
              <Marquee direction="right">
                <Typography
                  // variant="h4"
                  sx={{
                    fontSize: {
                      xs: "25px", // Mobile
                      sm: "30px",
                      md: "35px",
                      lg: "40px",
                    },
                  }}
                >
                  Chào mừng đến với Hệ thống Đăng ký Luận văn!
                </Typography>
              </Marquee>
            </Box>

            {/* Main Content Section */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection:
                  isSmallScreen || isMediumScreen ? "column" : "row",
                alignItems: "center",
                color: "#fff",
                maxWidth: isSmallScreen || isMediumScreen ? "100%" : "80%",
                gap: "24px",
                height: "auto",
                width: "100%",
              }}
            >
              {/* Animation Section */}
              <Box sx={{ maxWidth: "500px", width: "100%" }}>
                <DotLottieReact
                  style={{
                    width: "100%",
                    maxWidth: "650px",
                    margin: "0 auto",
                    paddingTop: "20px",
                  }}
                  src={Welcome}
                  loop
                  autoplay
                />
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: themes ? "#fff" : "#000",
                    margin: isSmallScreen || isMediumScreen ? "10px" : "0px",
                  }}
                >
                  Dễ dàng đăng ký đề tài luận văn, theo dõi tiến trình của bạn,
                  và nhận mọi thông tin cần thiết.
                </Typography>
                <DotLottieReact
                  src={StartNow}
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "-60px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.location.replace("/login")}
                />
              </Box>

              {/* Thumbnails Section */}
              <Box
                sx={{
                  display: isSmallScreen || isMediumScreen ? "none" : "flex",
                  flexDirection: "row",
                  gap: "24px",
                }}
              >
                {themeImages.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginTop: isSmallScreen ? "0px" : "-100px",
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: isMediumScreen ? "150px" : "200px",
                      width: isMediumScreen ? "150px" : "200px",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 10px 20px rgba(0, 0, 0, 0.3), 0px 6px 18px rgba(0, 0, 0, 0.15)",
                      cursor: "pointer",
                      border:
                        currentIndex === index ? "3px solid #fff" : "none",
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

            {/* Information sections */}
            {!isSmallScreen && !isMediumScreen && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "50%",
                  display: "flex", // Only display on larger screens
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                  gap: "24px",
                  padding: "16px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  zIndex: 10,
                  borderRadius: "20px",
                }}
              >
                {/* About System */}
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

                {/* Objective */}
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
                    Đảm bảo tất cả sinh viên đều có thể truy cập và đăng ký đề
                    tài luận văn một cách dễ dàng.
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Carousel>
      </Box>
      <VerticalTiltComponent />
    </Box>
  );
}

export default HomePageTest;
