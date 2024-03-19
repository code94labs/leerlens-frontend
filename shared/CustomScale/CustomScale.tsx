import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const scale = [1, 2, 3, 4, 5, 6];

type Props = {
  questionId?: number;
  questionText?: string;
};

const CustomScale = (props: Props) => {
  const { questionId, questionText } = props;

  const [selectedValue, setSelectedValue] = useState(0);

  const handleButtonClick = (value: number) => {
    setSelectedValue(value);

    handleClick(value);
  };

  const handleClick = (value: number | null) => {
    console.log(`Selected rating: ${value}`);
  };

  return (
    <Stack my={4}>
      <Typography mb={2} variant="subtitle2">
        1. Intelligence is something you are born with and cannot change.
      </Typography>

      <Stack flexDirection="row" alignItems="center">
        <Typography mr={2} color="grey">
          Totally disagree
        </Typography>

        {scale.map((value) => (
          <IconButton
            key={value}
            onClick={() => handleButtonClick(value)}
            sx={{
              m: 0.5,
              width: 35,
              height: 35,
              border: "1px rgb(155, 155, 155, 0.5) solid",
              backgroundColor: selectedValue === value ? "#A879FF" : "#FFFFFF",
              color: selectedValue === value ? "white" : "grey",
              ":hover": {
                backgroundColor:
                  selectedValue === value ? "#A879FF" : "#FFFFFF",
              },
            }}
          >
            <Typography variant="subtitle2">{value}</Typography>
          </IconButton>
        ))}

        <Typography ml={2} color="grey">
          Totally disagree
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CustomScale;
