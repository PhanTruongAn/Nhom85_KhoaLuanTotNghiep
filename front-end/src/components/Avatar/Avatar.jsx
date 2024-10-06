import React from "react";
import femaleAvatar from "../../images/anhdong/avatar-femal.lottie";
import maleAvatar from "../../images/anhdong/avatar-male.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box, Typography } from "@mui/material";

function Avatar({ gender }) {
  const isFemale = gender === "Nữ";
  const isMale = gender === "Nam";
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100%" }}
    >
      <DotLottieReact
        style={{ width: "100%", height: "auto" }}
        src={isMale ? maleAvatar : femaleAvatar}
        loop
        autoplay
      />
    </Box>
  );
}

export default Avatar;
