import { Stack } from "@mui/material";
import React from "react";
import Header from "../shared/Header/Header";
import HomePageContent from "../components/HomePage/HomePageContent";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const LandingPage = () => {
  return (
    <Stack>
      <Header />

      <HomePageContent />
    </Stack>
  );
};

export default LandingPage;
