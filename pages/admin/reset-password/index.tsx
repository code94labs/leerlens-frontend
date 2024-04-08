import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { useRouter } from "next/router";
import { postResetPassword } from "../../../services/authentication.service";

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

const ResetPasswordPage = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const [token, setToken] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const extractTokenFromQuery = () => {
    const { token } = router.query;

    if (Array.isArray(token)) {
      return token[0];
    } else {
      return token;
    }
  };

  useEffect(() => {
    const updateToken = () => {
      const extractedToken = extractTokenFromQuery();

      if (extractedToken) {
        setToken(extractedToken);
      }
    };

    updateToken();
  }, [router.query.token]);

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setIsError(true);

        setNotificationMsg("The passwords don't match!");
        setDisplaySnackbarMsg(true);

        return;
      }
      setIsLoading(true);
      await postResetPassword({ token, newPassword });

      setIsError(false);

      setNotificationMsg("Successfully completed password reset");
      setDisplaySnackbarMsg(true);
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
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleForgetPassword = () => {
    router.push("/admin/forget-password");
  };

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
            Reset Password
          </Typography>
          <Typography mb={3}>Please enter your new password.</Typography>

          <Stack flexDirection="column" alignItems="">
            <TextField
              variant="outlined"
              label="New password"
              required
              type={showNewPassword ? "text" : "password"}
              sx={customStyles.textField}
              value={newPassword}
              disabled={!token || isLoading}
              onChange={(event) => setNewPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              variant="outlined"
              label="Confirm password"
              required
              type={showConfirmPassword ? "text" : "password"}
              sx={customStyles.textField}
              value={confirmPassword}
              disabled={!token || isLoading}
              onChange={(event) => setConfirmPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack flexDirection="row" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                sx={customStyles.primaryBtn}
                fullWidth
                onClick={handleResetPassword}
                disableElevation
                disabled={!token || isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
