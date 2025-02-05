import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
export const Card = styled(MuiCard)(({ theme }) => ({
  // backgroundColor: "#ebf6ff",
  // boxShadow: `0px 4px 8px 0px #ebf6ff`,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  ...theme.applyStyles("dark", {
    // backgroundColor: "#252525",
    backgroundColor: "#121212",
  }),
}));
