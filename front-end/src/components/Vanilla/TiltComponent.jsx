import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import Icon1 from "../../images/homepage/imageManage.avif";
import Icon2 from "../../images/homepage/imageCoop.avif";
import Icon3 from "../../images/homepage/imageSearchInfor.avif";
import imageBgYB from "../../images/homepage/imageBgYB.avif";
import imageBgDG from "../../images/homepage/imageBgGD.avif";

import "./style.scss";

const TiltCard = ({ icon, title, description }) => {
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

  const tiltRef = useRef(null);

  return (
    <Box
      ref={tiltRef}
      sx={{
        width: "100%",
        maxWidth: "600px",
        padding: "32px",
        margin: "16px",
        borderRadius: "15px",
        backgroundColor: themes ? "#333" : "#f4f4f8",
        color: themes ? "#fff" : "#000",
        boxShadow:
          "0px 10px 20px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Box sx={{ flex: "0 0 auto", marginRight: "24px" }}>
        <img
          src={icon}
          alt={title}
          style={{ width: "320px", height: "320px", objectFit: "contain" }}
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

// Define PropTypes for TiltCard
TiltCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const VerticalTiltComponent = () => {
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

  return (
    <Box
      sx={{
        background: themes ? `url(${imageBgDG})` : `url(${imageBgYB})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            marginBottom: "-150px",
          }}
        >
          <Box sx={{ flex: "0 0 auto", maxWidth: "48%" }}>
            <TiltCard
              icon={Icon1}
              title="Quản lý đăng ký khóa luận dễ dàng"
              description="Đơn giản hóa quy trình đăng ký khóa luận cho sinh viên và giảng viên, giúp tiết kiệm thời gian và công sức."
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "24px",
          }}
        >
          <Box sx={{ flex: "0 0 auto", maxWidth: "48%" }}>
            <TiltCard
              icon={Icon3}
              title="Dễ dàng tra cứu thông tin"
              description="Tìm kiếm và xem thông tin về các đề tài khóa luận một cách nhanh chóng và thuận tiện."
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: "-200px",
          }}
        >
          <Box sx={{ flex: "0 0 auto", maxWidth: "48%" }}>
            <TiltCard
              icon={Icon2}
              title="Hợp tác và kết nối"
              description="Cộng tác trực tiếp với giảng viên và các bạn cùng lớp trong suốt quá trình thực hiện khóa luận."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VerticalTiltComponent;
