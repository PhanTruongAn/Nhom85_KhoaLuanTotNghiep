import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import "./style.scss";
import Box from "@mui/material/Box";
import backgroundtitle from "../../images/backgroundtitle.jpg";
const TiltComponent = (props) => {
  const leftTiltRef = useRef(null);
  const rightTiltRef = useRef(null);
  const bottomTiltRef = useRef(null);

  useEffect(() => {
    const leftTiltNode = leftTiltRef.current;
    const rightTiltNode = rightTiltRef.current;
    const bottomTiltNode = bottomTiltRef.current;

    if (leftTiltNode) {
      VanillaTilt.init(leftTiltNode, {
        max: 5,
        speed: 300,
        glare: true,
        "max-glare": 0.5,
      });
    }

    if (rightTiltNode) {
      VanillaTilt.init(rightTiltNode, {
        max: 5,
        speed: 300,
        glare: true,
        "max-glare": 0.5,
      });
    }

    if (bottomTiltNode) {
      VanillaTilt.init(bottomTiltNode, {
        max: 5,
        speed: 300,
        glare: true,
        "max-glare": 0.5,
      });
    }

    return () => {
      if (leftTiltNode?.vanillaTilt) leftTiltNode.vanillaTilt.destroy();
      if (rightTiltNode?.vanillaTilt) rightTiltNode.vanillaTilt.destroy();
      if (bottomTiltNode?.vanillaTilt) bottomTiltNode.vanillaTilt.destroy();
    };
  }, []);

  return (
    <Box
      className="tilt-wrapper"
      sx={{ backgroundImage: `url(${backgroundtitle})`, padding: "20px" }}
    >
      {/* Left Tilt */}
      <Box
        ref={leftTiltRef}
        className="tilt-container left-tilt"
        sx={[
          (theme) => ({
            color: "#fff",
            backgroundColor: theme.palette.secondary.main,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.secondary.main,
            }),
          }),
        ]}
      >
        <Box className="left-content">
          <Box className="title">
            <b>Giới thiệu về hệ thống</b>
          </Box>
          <Box className="content">
            Hệ thống quản lý khóa luận giúp sinh viên và giảng viên theo dõi và
            quản lý dễ dàng.
          </Box>
        </Box>
        <img src={props.srcLeft} alt="Left Tilt" className="image-left" />
      </Box>

      {/* Right Tilt */}
      <Box
        ref={rightTiltRef}
        className="tilt-container right-tilt"
        sx={[
          (theme) => ({
            color: "#fff",
            backgroundColor: theme.palette.primary.dark,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.primary.dark,
            }),
          }),
        ]}
      >
        <Box className="left-content">
          <Box className="content">
            <Box className="title">
              <b>Mục tiêu</b>
            </Box>
            <ul>
              <li>Giao diện thân thiện, dễ sử dụng</li>
              <li>Bảo mật an toàn dữ liệu</li>
              <li>Nâng cao chất lượng khóa luận</li>
            </ul>
          </Box>
        </Box>
        <img src={props.srcRight} alt="Right Tilt" className="image-right" />
      </Box>

      {/* Bottom Tilt */}
      <Box
        ref={bottomTiltRef}
        className="tilt-container bottom-tilt"
        sx={[
          (theme) => ({
            color: "#fff",
            backgroundColor: theme.palette.primary.light,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.primary.light,
            }),
          }),
        ]}
      >
        <Box className="bottom-content">
          <Box className="title">
            <b>Đội ngũ phát triển</b>
          </Box>
          <Box className="content">
            <b>Giáo viên hướng dẫn:</b> <br />
            Cô Đặng Thị Thu Hà <br />
            <b>Người phát triển phần mềm:</b> <br />
            Phan Trường An <br />
            Điểu Phan Quang Dũng
          </Box>
        </Box>
        <img src={props.srcBottom} alt="Bottom Tilt" className="image-bottom" />
      </Box>
    </Box>
  );
};

export default TiltComponent;
