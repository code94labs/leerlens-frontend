import { Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import NormGroupContent from "../../../../components/NormGroupContent/NormGroupContent";

const NormGroupPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%menu "}>
        <AdminHeader title="Normgroup" shouldDisplayBreadcrumb/>

        <NormGroupContent />
      </Stack>
    </Stack>
  );
};

export default NormGroupPage;
