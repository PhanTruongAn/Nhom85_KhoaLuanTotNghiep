import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box } from "@mui/material";
import animation from "./animation/page-not-found.lottie";
function PageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DotLottieReact
        style={{ marginTop: "20px", width: "90%", height: "100%" }}
        src={animation}
        loop
        autoplay
      />
    </Box>
  );
}

export default PageNotFound;
