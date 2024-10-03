import React from "react";
import emptyDataImage from "../../images/anhdong/empty-data-animation.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box } from "@mui/material";
function EmptyData() {
  return (
    <Box>
      <DotLottieReact
        style={{ width: "100%", height: "100%" }}
        src={emptyDataImage}
        loop
        autoplay
      />
      <h6 style={{ color: "#555" }}>Không có dữ liệu để hiển thị</h6>
    </Box>
  );
}

export default EmptyData;
