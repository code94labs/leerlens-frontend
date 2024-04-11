import { Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";
import EvaluationContent from "../../../../components/EvaluationContent/EvaluationContent";

const EvaluationPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Evaluation" />

        <EvaluationContent />
      </Stack>
    </Stack>
  );
};

export default EvaluationPage;
