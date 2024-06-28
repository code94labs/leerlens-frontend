import { Stack } from "@mui/material";
import React from "react";
import Header from "../shared/Header/Header";
import HomePageContent from "../components/HomePage/HomePageContent";
import FormCard from "../components/HomePage/FormCard";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'common'])),
    },
  };
};

const customStyles = {
  stack: {
    width: "90%",
    maxWidth: 1200,
    margin: "0 auto",
    my: 4,
    gap: {
      xs: 2,
      md: 4,
    },
  },
};

const LandingPage = () => {
  const { t } = useTranslation('common');
  return (
    <Stack>
      <Header />

      <Stack sx={customStyles.stack} flexDirection="row" justifyContent="center">
         <FormCard
          title={t('home.Norm group.title')}
          description={t('home.Norm group.description')}
          pagePath="/forms/normgroup"
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
