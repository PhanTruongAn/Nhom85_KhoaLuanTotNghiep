import { Typography } from "@mui/material";
export const formatContent = (content) => {
  return content.split("\n").map((line, index) => (
    <Typography key={index} paragraph>
      {line}
    </Typography>
  ));
};
