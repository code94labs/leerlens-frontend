import { Stack } from "@mui/material";
import React from "react";
import AdminHeader from "../../../../../shared/Header/AdminHeader";
import Sidebar from "../../../../../shared/Sidebar/Sidebar";
import EditPreInterventionForm from "../../../../../components/EditPreInterventionForm/EditPreInterventionForm";

const EditPreIntervention = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Edit Questions" shouldDisplayBreadcrumb/>

        <EditPreInterventionForm />
      </Stack>
    </Stack>
  );
};

export default EditPreIntervention;
