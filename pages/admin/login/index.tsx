import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { champBlackFontFamily } from "../../../shared/typography";
import AlertNotification from "../../../components/LoginPage/AlertNotification/AlertNotification";
import { useRouter } from "next/router";
import { postLogin } from "../../../services/authentication.service";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../../redux/slices/userSlice";

const customStyles = {
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await postLogin({ email, password });

      dispatch(
        setUser({
          email: response.email,
          token: response.token,
          profileImage: response.profileImage,
          firstname: response.firstname,
          lastname: response.lastname,
          role: response.role,
        })
      );

      setNotificationMsg("Successfully logged in...");
      setDisplaySnackbarMsg(true);

      router.push("/admin/dashboard");
    } catch (error) {
      console.log((error as Error).message);

      setIsError(true);

      setNotificationMsg("Something went wrong when resetting password");
      setDisplaySnackbarMsg(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgetPassword = () => {
    router.push("/admin/forget-password");
  };

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user]);

  return (
    <Box sx={customStyles.background}>
      <Box sx={customStyles.card}>
        <Stack justifyContent="center" alignItems={"center"}>
          <Image src="/Logo.png" height={60} width={200} alt="logo" />

          <Typography
            mt={3}
            fontSize={20}
            fontFamily={champBlackFontFamily}
            textTransform="uppercase"
          >
            Log In
          </Typography>
          <Typography mb={3}>Welcome let’s get started.</Typography>

          <Stack flexDirection="column" alignItems="">
            <TextField
              variant="outlined"
              label="Enter email address"
              required
              type="email"
              placeholder="abc@gmail.com"
              disabled={isLoading}
              value={email}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail(e.target.value)}
              sx={customStyles.textField}
            />

            <TextField
              variant="outlined"
              label="Enter password"
              required
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
              value={password}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
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
                disabled={isLoading}
              />
              <Typography variant="body2" color="grey">
                Remember Me
              </Typography>
            </Stack>

            {isError && (
              <AlertNotification
                message="Invalid username or Passoword"
                linkText="Forget Password"
                onClick={handleForgetPassword}
              />
            )}

            <Stack flexDirection="row" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                sx={customStyles.primaryBtn}
                fullWidth
                onClick={handleSignIn}
                disableElevation
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Snackbar
        open={displaySnackbarMsg}
        autoHideDuration={6000}
        onClose={() => setDisplaySnackbarMsg(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setDisplaySnackbarMsg(false)}
          severity={isError ? "error" : "success"}
          variant="outlined"
          sx={customStyles.snackbarAlert}
        >
          {notificationMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
