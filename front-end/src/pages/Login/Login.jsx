import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "./theme/Card";
import SignInContainer from "./theme/Container";
import logo from "../../images/logo-iuh.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton, FormHelperText } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button as Button2 } from "antd";
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải nhiều hơn 6 kí tự !");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handlerLogin = () => {
    const isValid = validateInputs();
    if (isValid) {
      navigate("/dashboard");
      toast.success("Login Success!", { autoClose: 1000 });
    }
  };
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
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
        >
          <FormControl sx={{ m: 1 }} variant="standard">
            <TextField
              error={userNameError}
              helperText={userNameErrorMessage}
              id="username"
              sx={{ width: "100%" }}
              type="text"
              autoFocus
              required
              label="Tài khoản đăng nhập"
              variant="standard"
            />
          </FormControl>

          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel required htmlFor="password" error={passwordError}>
              Mật khẩu
            </InputLabel>
            <Input
              error={passwordError}
              id="password"
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
              >
                Quên mật khẩu
              </Link>
            </Box>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button fullWidth variant="contained" onClick={handlerLogin}>
            Đăng nhập
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
}
