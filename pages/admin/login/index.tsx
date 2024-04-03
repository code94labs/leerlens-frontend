import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { champBlackFontFamily } from "../../../shared/typography";
import AlertNotification from "../../../components/LoginPage/AlertNotification/AlertNotification";

const customStyles = {
  background: {
    backgroundColor: "#C4B0EB",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtn: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 260,
    border: "2px #A879FF solid",
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontFamily: champBlackFontFamily,
  },
  textField: {
    width: 400,
    mb: 2,
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey !important",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "grey",
    },
  },
  card: {
    border: "1px #E6E6E6 solid",
    padding: {
      xs: 2,
      md: 6.25,
    },
    borderRadius: 3,
    width: {
      xs: "100%",
      md: "90%",
    },
    height: {
      xs: "100%",
      md: "max-content",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
  },
};

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {};

  const handleForgetPassword = () => {};

  return (
    <Box sx={customStyles.background}>
      <Box sx={customStyles.card}>
        <Stack justifyContent="center" alignItems={"center"}>
          <Image src="/Logo.png" height={60} width={200} alt="logo" />

          <Typography mt={3} fontSize={20} fontFamily={champBlackFontFamily}>
            LOG IN
          </Typography>
          <Typography mb={3}>Welcome let’s get started.</Typography>

          <Stack flexDirection="column" alignItems="">
            <TextField
              variant="outlined"
              label="Enter email address"
              required
              type="email"
              placeholder="abc@gmail.com"
              sx={customStyles.textField}
            />

            <TextField
              variant="outlined"
              label="Enter password"
              required
              type={showPassword ? "text" : "password"}
              sx={customStyles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack flexDirection="row" alignItems="center" ml={-1}>
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                color="primary"
                inputProps={{ "aria-label": "Remember Me checkbox" }}
              />
              <Typography variant="body2" color="grey">
                Remember Me
              </Typography>
            </Stack>

            <AlertNotification
              message="Invalid username or Passoword"
              linkText="Forget Password"
              onClick={handleForgetPassword}
            />

            <Stack flexDirection="row" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                sx={customStyles.primaryBtn}
                fullWidth
                onClick={handleSignIn}
                disableElevation
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
