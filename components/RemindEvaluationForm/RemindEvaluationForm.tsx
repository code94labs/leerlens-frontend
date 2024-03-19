import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const customStyles = {
  stack: {
    width: "90%",
    maxWidth: 1200,
    margin: "0 auto",
    mb: 20,
  },
};

const RemindEvaluationForm = () => {
  return (
    <Stack sx={customStyles.stack}>
      <Box py={4}>
        <Typography variant="h5" fontWeight={1000} mb={1} textTransform="uppercase">
          Remind Evaluation
        </Typography>

        <Typography variant="body1" mb={1}>
          Here are some general questions about you?
        </Typography>
      </Box>
    </Stack>
  );
};

export default RemindEvaluationForm;
