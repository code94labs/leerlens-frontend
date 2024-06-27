import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import PreInterventionForm from "../../../components/PreInterventionForm/PreInterventionForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const PreIntervention = () => {
  return (
    <Stack>
      <Header />

      <PreInterventionForm />
    </Stack>
  );
};

export default PreIntervention;
