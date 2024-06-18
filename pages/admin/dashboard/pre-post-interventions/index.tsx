import React from "react";
import { useRouter } from "next/navigation";

import { Stack } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import DashboardPrePostContent from "../../../../components/DashboardPrePostContent/DashboardPrePostContent";

const DashboardPrePostInterventionsPage = () => {
  const router = useRouter();

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard - Pre-Post Interventions" shouldDisplayBreadcrumb />

        <DashboardPrePostContent />
      </Stack>
    </Stack>
  );
};

export default DashboardPrePostInterventionsPage;
