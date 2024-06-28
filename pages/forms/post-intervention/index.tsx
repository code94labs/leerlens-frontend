import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import PostInterventionForm from "../../../components/PostInterventionForm/PostInterventionForm";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const PostIntervention = () => {
  return (
    <Stack>
      <Header />

      <PostInterventionForm />
    </Stack>
  );
};

export default PostIntervention;
