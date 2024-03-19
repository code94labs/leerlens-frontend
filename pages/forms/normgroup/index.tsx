import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import NormGroupForm from "../../../components/NormGroupForm/NormGroupForm";

const NormGroup = () => {
  return (
    <Stack>
      <Header />

      <NormGroupForm />
    </Stack>
  );
};

export default NormGroup;
