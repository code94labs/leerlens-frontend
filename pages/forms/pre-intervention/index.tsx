import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import PreInterventionForm from "../../../components/PreInterventionForm/PreInterventionForm";

const PreIntervention = () => {
  return (
    <Stack>
      <Header />

      <PreInterventionForm />
    </Stack>
  );
};

export default PreIntervention;
