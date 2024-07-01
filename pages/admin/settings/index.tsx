import { Stack, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";
import UserProfile from "../../../components/SettingsForm/UserProfile";

const SettingsPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Settings" shouldDisplayBreadcrumb/>
        <UserProfile/>
      </Stack>
    </Stack>
  );
};

export default SettingsPage;
