import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { champBlackFontFamily } from "../../shared/typography";
import SocialMediaComponent from "../../components/SuccessMessage/SocialMediaComponent";

import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};


const customStyles = {
  background: {
    backgroundColor: "#C4B0EB",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    border: "1px #E6E6E6 solid",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
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
    alignItems: {
      xs: "center",
      md: "center",
    },
    justifyContent: "center",
    maxWidth: 826,
    backgroundColor: "#FFFFFF",
  },
  logoImage: {
    cursor: "pointer",
    marginBottom: 16,
  },
  icon: { marginBottom: 16 },
  thankYouMessage: {
    fontWeight: 900,
    color: "#1A1A1A",
    textTransform: "uppercase",
    mb: {
      xs: 1,
      md: 2,
    },
    textAlign: "center",
    fontSize: {
      xs: 14,
      md: 16,
    },
  },
  bodyText: {
    fontWeight: 400,
    color: "#4C4C4D",
    textAlign: "center",
    maxWidth: 438,
    fontSize: {
      xs: 13,
      md: 16,
    },
  },
  box: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    width: "100%",
    gap: 1.75,
    mt: 2,
  },
};

const SuccessMessage = () => {
  const { t } = useTranslation('common');
  const size = useWindowSize();

  return (
    <Box sx={customStyles.background}>
      <Box sx={customStyles.card}>
        <Stack justifyContent="center" alignItems={"center"}>
          <Image
            src="/Logo-HQ.png"
            height={40}
            width={130}
            alt="logo"
            style={{
              ...customStyles.logoImage,
              width: "auto",
              height: size?.width && size?.width > 900 ? 84 : 38,
            }}
          />

          <Image
            src="/images/img5.png"
            height={200}
            width={250}
            alt="logo"
            style={{
              ...customStyles.icon,
              width: size?.width && size?.width > 900 ? 150 : 100,
              height: "auto",
            }}
          />

          <Typography
            sx={customStyles.thankYouMessage}
            fontFamily={champBlackFontFamily}
          >
            {t('Success Message.Topic')}
          </Typography>

          <Typography sx={customStyles.bodyText}>
          {t('Success Message.Description 1')}
          </Typography>
          <Typography sx={customStyles.bodyText}>
          {t('Success Message.Description 2')}
          </Typography>
          <Typography sx={customStyles.bodyText}>{t('Success Message.Description 3')}</Typography>

          <Box sx={customStyles.box}>
            <SocialMediaComponent
              label={t('Success Message.Facebook')}
              image={"/images/facebook.png"}
            />

            <SocialMediaComponent
              label={t('Success Message.Instagram')}
              image={"/images/instagram.png"}
            />

            <SocialMediaComponent
              label={t('Success Message.Tiktok')}
              image={"/images/tikTok.png"}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default SuccessMessage;
