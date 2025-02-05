import Card from "./theme/Card";
import SignInContainer from "./theme/Container";
import logo from "../../images/logo-iuh.png";
import {
  IconButton,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Input,
  Typography,
  TextField,
  Link,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import authApi from "../../apis/authApi";
import "./Style.scss";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const validateInputs = () => {
    const email = document.getElementById("username");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value) {
      setUserNameError(true);
      setUserNameErrorMessage("Không được để trống tên tài khoản !");
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu không được để trống !");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handlerLogin = async () => {
    const isValid = validateInputs();
    if (isValid) {
      const data = {
        username: userName,
        password: password,
      };
      const result = await authApi.login(data);
      if (result.status === 0) {
        localStorage.setItem("accessToken", result.data.accessToken);
        toast.success(result.message);
        navigate("/dashboard/home");
      } else {
        toast.error(result.message);
      }
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlerLogin();
    }
  };
  return (
    <SignInContainer
      direction="column"
      justifyContent="space-between"
      sx={{
        "@media (max-height: 600px)": {
          marginTop: "97.6px",
        },
        "@media (max-width: 600px)": {
          marginTop: "97.6px",
        },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          marginBottom: {
            xs: "170px",
            sm: "110px",
          },
          overflow: "auto",
        }}
      >
        <Box>
          <img style={{ width: "100px", height: "auto" }} src={logo} />
        </Box>
        <Typography component="h1" variant="h4">
          Đăng nhập
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
          onKeyDown={handleKeyDown}
        >
          <FormControl sx={{ m: 1 }} variant="standard">
            <TextField
              error={userNameError}
              helperText={userNameErrorMessage}
              id="username"
              sx={{ width: "100%" }}
              type="text"
              autoComplete="username"
              autoFocus
              required
              label="Tài khoản đăng nhập"
              variant="standard"
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>

          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel required htmlFor="password" error={passwordError}>
              Mật khẩu
            </InputLabel>
            <Input
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              autoComplete="current-password"
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {passwordError && (
              <FormHelperText error>{passwordErrorMessage}</FormHelperText>
            )}
            <Box
              sx={{
                position: "relative",
                marginTop: "15px",
                marginLeft: "70%",
              }}
            >
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: "baseline" }}
                onClick={() => {
                  navigate("/forget-password");
                }}
              >
                Quên mật khẩu
              </Link>
            </Box>
          </FormControl>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button fullWidth variant="contained" onClick={handlerLogin}>
            Đăng nhập
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
