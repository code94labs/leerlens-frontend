import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  question: string;
  answer: string;
};

const customStyles = {
  stack: {
    border: "1px #E6E6E6 solid",
    py: 2.5,
    borderLeft: 'none',
    borderRight: 'none'
  },
};

const DyanmicListContent = (props: Props) => {
  const { question, answer } = props;

  return (
    <Stack flexDirection="row" px={2} my={1} sx={customStyles.stack}>
      <Typography width={"50%"} color="#4C4C4D" pr={5}>
        {question}
      </Typography>

      <Typography width={"50%"} color="#4C4C4D">
        {answer}
      </Typography>
    </Stack>
  );
};

export default DyanmicListContent;
