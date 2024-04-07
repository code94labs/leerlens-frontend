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
import { postForgotPassword } from "../../../services/authentication.service";

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

const ForgetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleResetPasswordButtonClick = async () => {
    setError(false);
    try {
      const response = await postForgotPassword({ email });

      // Handle successful login response
      setIsSubmitted(true);
    } catch (error) {
      console.log((error as Error).message);
      setError(true);
    }
  };

  const handleOpenMailButtonClick = () => {
    setIsSubmitted((isSubmitted) => !isSubmitted);
  };

  const resetPasswordContent = (
    <>
      <Typography
        mt={3}
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
      >
        Enter your email address
      </Typography>
      <Typography mb={3} textAlign="center">
        Please enter your admin email address to receive a link to reset your
        password.
      </Typography>

      <Stack flexDirection="column" alignItems="">
        <TextField
          variant="outlined"
          label="Enter email address"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          sx={customStyles.textField}
        />

        {error && (
          <AlertNotification message="Invalid Email" onClick={() => {}} />
        )}

        <Stack flexDirection="row" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            sx={customStyles.primaryBtn}
            fullWidth
            onClick={handleResetPasswordButtonClick}
            disableElevation
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const successMessageContent = (
    <>
      <Typography
        mt={3}
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
      >
        Check your email
      </Typography>
      <Typography mb={3} mt={1} textAlign="center">
        We have sent password reset instructions to your email “{email}”
      </Typography>

      <Stack flexDirection="row" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          sx={customStyles.primaryBtn}
          fullWidth
          onClick={handleOpenMailButtonClick}
          disableElevation
        >
          Open Mail
        </Button>
      </Stack>
    </>
  );

  return (
    <Box sx={customStyles.background}>
      <Box sx={customStyles.card}>
        <Stack justifyContent="center" alignItems="center">
          <Image src="/Logo.png" height={60} width={200} alt="logo" />

          {isSubmitted ? successMessageContent : resetPasswordContent}
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgetPasswordPage;
