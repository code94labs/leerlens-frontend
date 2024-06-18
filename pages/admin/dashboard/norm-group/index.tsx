import React from "react";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import DashboardNormGroupContent from "../../../../components/DashboardNormGroupContent/DashboardNormGroupContent";

const DashboardNormGroupPage = () => {
  const router = useRouter();

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard - Norm Group" shouldDisplayBreadcrumb />

        <DashboardNormGroupContent />
      </Stack>
    </Stack>
  );
};

export default DashboardNormGroupPage;
