import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Grid from "@mui/material/Unstable_Grid2";

import { champBlackFontFamily } from "../../shared/typography";
import SocialMediaComponent from "../../components/SuccessMessage/SocialMediaComponent";

const customStyles = {
  background: {
    backgroundColor: "#C4B0EB",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    border: "1px #E6E6E6 solid",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "50px",
    borderRadius: 3,
    width: "90%",
    maxWidth: "826px",
    backgroundColor: "#FFFFFF",
  },
  logoImage: {
    cursor: "pointer",
    width: "auto",
    height: "84px",
    marginBottom: "16px",
  },
  icon: { width: "150px", height: "auto", marginBottom: "16px" },
  thankYouMessage: {
    fontWeight: 900,
    color: "#1A1A1A",
    textTransform: "uppercase",
    mb: "16px",
  },
  body: {
    fontWeight: 400,
    color: "#4C4C4D",
    textAlign: "center",
    maxWidth: "438px",
    mb: "16px",
  },
  box: {
    display: "flex",
    gap: "14px",
  },
};

const SuccessMessage = () => {
  const router = useRouter();
  return (
    <Container sx={customStyles.background} maxWidth={false}>
      <Box sx={customStyles.card} alignItems="center">
        <Stack justifyContent="center" alignItems={"center"}>
          <Image
            src="/Logo.png"
            height={40}
            width={130}
            alt="logo"
            style={customStyles.logoImage}
          />
          <Image
            src={`/images/img5.png`}
            height={200}
            width={250}
            style={customStyles.icon}
            alt="img"
          />
          <Typography
            sx={customStyles.thankYouMessage}
            fontFamily={champBlackFontFamily}
          >
            Thank you for submitting your answers to the questions.
          </Typography>
          <Typography sx={customStyles.body}>
            We appreciate your valuable time.
            <br />
            Good luck with your learning, and greetings from all
            <br />
            Remind trainers!
          </Typography>
          <Box sx={customStyles.box}>
            <SocialMediaComponent
              label={"Follow us on Facebook"}
              image={"/images/facebook.png"}
            />

            <SocialMediaComponent
              label={"Follow us on Instagram"}
              image={"/images/instagram.png"}
            />

            <SocialMediaComponent
              label={"Follow us on Tik Tok"}
              image={"/images/tikTok.png"}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default SuccessMessage;
