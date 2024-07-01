import React from "react";
import { useRouter } from "next/navigation";

import { Stack } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import DashboardPrePostContent from "../../../../components/DashboardPrePostContent/DashboardPrePostContent";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
  };
};

const DashboardPrePostInterventionsPage = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title={t('dashboard.pre-post-intervention.title')} shouldDisplayBreadcrumb />

        <DashboardPrePostContent />
      </Stack>
    </Stack>
  );
};

export default DashboardPrePostInterventionsPage;
