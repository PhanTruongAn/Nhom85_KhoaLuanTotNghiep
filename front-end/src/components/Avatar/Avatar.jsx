import PropTypes from "prop-types";
import femaleAvatar from "../../images/anhdong/avatar-femal.lottie";
import maleAvatar from "../../images/anhdong/avatar-male.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box } from "@mui/material";

function Avatar({ gender = "N/A" }) {
  const isMale = gender === "Nam";
  const avatarSrc = isMale ? maleAvatar : femaleAvatar;
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
        src={avatarSrc}
        loop
        autoplay
      />
    </Box>
  );
}

Avatar.propTypes = {
  gender: PropTypes.string,
};

export default Avatar;
