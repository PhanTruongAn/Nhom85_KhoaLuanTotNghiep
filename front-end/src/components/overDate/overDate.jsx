import React from "react";
import emptyDataImage from "../../images/anhdong/overdue.gif";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box, Typography } from "@mui/material";

function overDate({ text, isFetching }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <Box
        component="img"
        src={emptyDataImage}
        alt="Loading animation"
        sx={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <Typography variant="h6" sx={{ marginTop: "16px" }}>
        {text ? text : "Đang tải dữ liệu..."}
      </Typography>
    </Box>
  );
}

export default overDate;
