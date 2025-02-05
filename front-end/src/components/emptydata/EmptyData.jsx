import emptyDataImage from "../../images/anhdong/robot.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
function EmptyData({ text }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <DotLottieReact
        style={{ width: "100%", height: "100%" }}
        src={emptyDataImage}
        loop
        autoplay
      />
      <Typography variant="h6" sx={{ marginTop: "16px" }}>
        {text ? text : "Đang tải dữ liệu..."}
      </Typography>
    </Box>
  );
}
EmptyData.propTypes = {
  text: PropTypes.string,
};
export default EmptyData;
