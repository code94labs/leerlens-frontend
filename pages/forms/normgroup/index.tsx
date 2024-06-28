import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import NormGroupForm from "../../../components/NormGroupForm/NormGroupForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const NormGroup = () => {
  return (
    <Stack>
      <Header />

      <NormGroupForm />
    </Stack>
  );
};

export default NormGroup;
