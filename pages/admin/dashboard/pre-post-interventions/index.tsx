import React from "react";
import { useRouter } from "next/navigation";

import { Stack } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import DashboardPrePostInterventionsContent from "../../../../components/DashboardPrePostInterventionsContent/DashboardPrePostInterventionsContent";

const DashboardPrePostInterventionsPage = () => {
  const router = useRouter();

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard - Pre-Post Interventions" shouldDisplayBreadcrumb />

        <DashboardPrePostInterventionsContent />
      </Stack>
    </Stack>
  );
};

export default DashboardPrePostInterventionsPage;
