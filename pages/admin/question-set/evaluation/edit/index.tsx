import { Stack } from "@mui/material";
import React from "react";
import AdminHeader from "../../../../../shared/Header/AdminHeader";
import Sidebar from "../../../../../shared/Sidebar/Sidebar";
import EditEvaluationForm from "../../../../../components/EditEvaluationForm/EditEvaluationForm";

const EditEvaluation = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Edit Questions" shouldDisplayBreadcrumb/>

        <EditEvaluationForm />
      </Stack>
    </Stack>
  );
};

export default EditEvaluation;