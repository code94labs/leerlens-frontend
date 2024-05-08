import { Stack, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";
import DynamicDropdown from "../../../shared/DynamicDropdown";

const ComponentsPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Component Test" />

        {/* <DynamicDropdown /> */}
      </Stack>
    </Stack>
  );
};

export default ComponentsPage;
