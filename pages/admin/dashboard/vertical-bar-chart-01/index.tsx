import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";

const DashboardPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard" shouldDisplayBreadcrumb />

        {/* {testComponent} */}
        {/* Content */}
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
