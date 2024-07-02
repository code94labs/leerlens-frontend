import { Stack, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";
import UserForm from "../../../components/SettingsForm/UserForm";
import { useRouter } from "next/router";


const AddNewUser = () => {
    const router = useRouter();
    const { mode, userId } = router.query;

    const modeString = typeof mode === 'string' ? mode : Array.isArray(mode) ? mode[0] : '';
    const userIdString = typeof userId === 'string' ? userId : Array.isArray(userId) ? userId[0] : '';

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title={modeString === 'edit' ? 'Edit User' : 'Add New User'}/>
        <UserForm mode={modeString} userId={userIdString} />
      </Stack>
    </Stack>
  );
};

export default AddNewUser;
