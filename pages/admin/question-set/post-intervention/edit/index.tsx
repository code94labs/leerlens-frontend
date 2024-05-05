import { Stack } from "@mui/material";
import React from "react";
import AdminHeader from "../../../../../shared/Header/AdminHeader";
import Sidebar from "../../../../../shared/Sidebar/Sidebar";
import EditPostInterventionForm from "../../../../../components/EditPostInterventionForm/EditPostInterventionForm";

const EditPostIntervention = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Edit Questions" shouldDisplayBreadcrumb/>

        <EditPostInterventionForm />
      </Stack>
    </Stack>
  );
};

export default EditPostIntervention;