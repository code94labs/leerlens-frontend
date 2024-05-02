import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const customStyles = {
  spinner: {
    color: "#A879FF",
  },
};

const ProgressSpinner = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <CircularProgress sx={customStyles.spinner} />
    </Stack>
  );
};

export default ProgressSpinner;
