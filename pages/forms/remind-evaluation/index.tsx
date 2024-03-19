import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import RemindEvaluationForm from "../../../components/RemindEvaluationForm/RemindEvaluationForm";

const RemindEvaluation = () => {
  return (
    <Stack>
      <Header />

      <RemindEvaluationForm />
    </Stack>
  );
};

export default RemindEvaluation;
