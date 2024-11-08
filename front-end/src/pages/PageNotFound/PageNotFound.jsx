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
        // height: "100%",
      }}
    >
      <DotLottieReact
        style={{ width: "90%", height: "auto" }}
        src={animation}
        loop
        autoplay
      />
    </Box>
  );
}

export default PageNotFound;
