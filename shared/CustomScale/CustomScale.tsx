import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const customStyles = {
  stack: {
    my: {
      xs: 0,
      md: 4,
    },
  },
  subTitle: {
    mb: {
      xs: 3,
      md: 2,
    },
    fontSize: {
      xs: 13,
      md: 16,
    },
  },
  scaleText: {
    fontSize: {
      xs: 13,
      md: 16,
    },
  },
};

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
    <Stack sx={customStyles.stack}>
      <Typography variant="subtitle2" sx={customStyles.subTitle}>
        1. Intelligence is something you are born with and cannot change.
      </Typography>

      <Stack
        sx={{
          display: {
            xs: "flex",
            md: "none",
          },
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography color="grey" sx={customStyles.scaleText}>
          Totally disagree
        </Typography>
        <Typography color="grey" sx={customStyles.scaleText}>
          Totally disagree
        </Typography>
      </Stack>

      <Stack
        flexDirection="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <Typography
          color="grey"
          sx={customStyles.scaleText}
          display={{
            xs: "none",
            md: "flex",
          }}
        >
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

        <Typography
          color="grey"
          sx={customStyles.scaleText}
          display={{
            xs: "none",
            md: "flex",
          }}
        >
          Totally disagree
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CustomScale;
