import { Stack } from "@mui/material";
import React from "react";
import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";

const PostInterventionPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Post-Intervention" />
      </Stack>
    </Stack>
  );
};

export default PostInterventionPage;
