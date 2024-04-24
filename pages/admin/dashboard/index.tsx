import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  selectForm,
  setFormModified,
} from "../../../redux/slices/formSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const formDetails = useSelector(selectForm);

  const onHandleUpdate = () => {
    dispatch(setFormModified());
  };

  const onHandleResetForm = () => {
    dispatch(resetForm());
  };

  const testComponent = (
    <>
      <Stack flexDirection="row" justifyContent="space-evenly" mt={5}>
        <Button onClick={onHandleUpdate} variant="contained">
          Trigger the Form update state redux
        </Button>

        <Button onClick={onHandleResetForm} variant="contained">
          Reset the form details update state
        </Button>
      </Stack>

      <Typography variant="h4" textAlign="center" mt={5}>
        {formDetails.isModified ? "Form is modified" : "form is not modified"}
      </Typography>
    </>
  );

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard" shouldDisplayBreadcrumb />

        {testComponent}
        {/* Content */}
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
