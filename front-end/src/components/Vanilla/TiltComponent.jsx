import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import "./style.scss";
import Box from "@mui/material/Box";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import themeLight from "../../styles/Themes/themeLight";
const TiltComponent = (props) => {
  const leftTiltRef = useRef(null);
  const rightTiltRef = useRef(null);
  const bottomTiltRef = useRef(null);
  useEffect(() => {
    const leftTiltNode = leftTiltRef.current;
    const rightTiltNode = rightTiltRef.current;
    const bottomTiltNode = bottomTiltRef.current;
    VanillaTilt.init(leftTiltNode, {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.5,
    });

    VanillaTilt.init(rightTiltNode, {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.5,
    });
    VanillaTilt.init(bottomTiltNode, {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.5,
    });

    return () => {
      leftTiltNode.vanillaTilt.destroy();
      rightTiltNode.vanillaTilt.destroy();
      bottomTiltNode.vanillaTilt.destroy();
    };
  }, []);

  return (
    <div className="tilt-wrapper">
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
        <div className="left-content">
          <div className="title">
            <b>Giới thiệu về hệ thống</b>
          </div>
          <div className="content">
            Hệ thống quản lý khóa luận giúp sinh viên và giảng viên theo dõi và
            quản lý dễ dàng.
          </div>
        </div>
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
        <div className="left-content">
          <div className="content">
            <div className="title">
              <b>Mục tiêu</b>
            </div>
            <ul>
              <li>Giao diện thân thiện, dễ sử dụng</li>
              <li>Bảo mật an toàn dữ liệu</li>
              <li>Nâng cao chất lượng khóa luận</li>
            </ul>
          </div>
        </div>
        <img src={props.srcRight} alt="Right Tilt" className="image-right" />
      </Box>

      <Box
        ref={bottomTiltRef}
        className="tilt-container right-tilt"
        sx={[
          (theme) => ({
            color: "#fff",
            // backgroundColor: "#757de8",
            backgroundColor: theme.palette.primary.light,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.primary.light,
            }),
          }),
        ]}
      >
        <div className="bottom-content">
          <div className="title">
            <b>Đội ngũ phát triển</b>
          </div>
          <div className="content">
            <b> Giáo viên hướng dẫn:</b> <br />
            Cô Đặng Thị Thu Hà <br />
            <b> Người phát triển phần mềm:</b> <br />
            Phan Trường An <br />
            Điểu Phan Quang Dũng
          </div>
        </div>
        <img src={props.srcBottom} alt="Right Tilt" className="image-bottom" />
      </Box>
    </div>
  );
};

export default TiltComponent;
