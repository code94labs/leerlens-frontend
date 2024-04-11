import { Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import PreInterventionContent from "../../../../components/PreInterventionContent/PretInterventionContent";

const PreInterventionPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Pre-Intervention" />

        <PreInterventionContent />
      </Stack>
    </Stack>
  );
};

export default PreInterventionPage;
