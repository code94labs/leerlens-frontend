import { Stack } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard" shouldDisplayBreadcrumb />

        {/* Content */}
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
