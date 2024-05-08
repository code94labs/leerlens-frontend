import { Stack } from "@mui/material";
import React from "react";
import AdminHeader from "../../../../../shared/Header/AdminHeader";
import Sidebar from "../../../../../shared/Sidebar/Sidebar";
import EditNormgroupForm from "../../../../../components/EditNormgroupForm/EditNormgroupForm";

const EditNormgroup = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Edit Questions" shouldDisplayBreadcrumb/>

        <EditNormgroupForm />
      </Stack>
    </Stack>
  );
};

export default EditNormgroup;