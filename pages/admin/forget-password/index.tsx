import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { champBlackFontFamily } from "../../../shared/typography";
import AlertNotification from "../../../components/LoginPage/AlertNotification/AlertNotification";
import { postForgotPassword } from "../../../services/authentication.service";
import { gmailAddress } from "../../../utils/constant";
import { UseTranslation, useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const ForgetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState<string>("");
  const {t} = useTranslation('common')
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPasswordButtonClick = async () => {
    try {
      setIsLoading(true);
      setError(false);

      await postForgotPassword({ email });

      setIsSubmitted(true);
    } catch (error) {
      console.log((error as Error).message);

      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenMailButtonClick = () => {
    window.open(gmailAddress, "_blank");
  };

  const resetPasswordContent = (
    <>
      <Typography
        mt={3}
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
      >
        {t('forget-password.Email')}
      </Typography>
      <Typography mb={3} textAlign="center">
         {t('forget-password.Admin-email')}
      </Typography>

      <Stack flexDirection="column" alignItems="">
        <TextField
          variant="outlined"
          label={t('forget-password.Enter-email')}
          required
          type="email"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('forget-password.Email-placeholder')}
          sx={customStyles.textField}
        />

        {error && (
          <AlertNotification message={t('forget-password.Invalid')} onClick={() => {}} />
        )}

        <Stack flexDirection="row" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            sx={customStyles.primaryBtn}
            fullWidth
            onClick={handleResetPasswordButtonClick}
            disableElevation
            disabled={isLoading}
          >
            {isLoading ? t('forget-password.Sending') : t('forget-password.Reset')}
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
