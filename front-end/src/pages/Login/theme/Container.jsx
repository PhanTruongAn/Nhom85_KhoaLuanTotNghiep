import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
const SignInContainer = styled(Stack)(({ theme }) => ({
  alignSelf: "center",
  justifyContent: "center",
  height: "100vh",
  "@media (max-height: 600px)": {
    padding: "20px",
  },
  "@media (max-width: 600px)": {
    padding: "20px",
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));
export default SignInContainer;
