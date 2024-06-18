import React from "react";
import { useRouter } from "next/navigation";

import { Stack } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import DashboardEvaluationContent from "../../../../components/DashboardEvaluationContent/DashboardEvaluationContent";

const DashboardEvaluationPage = () => {
  const router = useRouter();

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard - Evaluation" shouldDisplayBreadcrumb />

        <DashboardEvaluationContent />
      </Stack>
    </Stack>
  );
};

export default DashboardEvaluationPage;
