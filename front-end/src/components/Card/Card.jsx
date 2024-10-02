import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
export const Card = styled(MuiCard)(({ theme }) => ({
  ...theme.applyStyles("dark", {
    // backgroundColor: "#153645",
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));
