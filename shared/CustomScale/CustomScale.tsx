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
  scaleActiveBtn: {
    m: 0.5,
    width: 35,
    height: 35,
    border: "1px rgb(155, 155, 155, 0.5) solid",
    backgroundColor: "#A879FF",
    color: "white",
    ":hover": {
      backgroundColor: "#A879FF",
    },
  },
  scaleInactiveBtn: {
    m: 0.5,
    width: 35,
    height: 35,
    border: "1px rgb(155, 155, 155, 0.5) solid",
    backgroundColor: "#FFFFFF",
    color: "grey",
    ":hover": {
      backgroundColor: "#FFFFFF",
    },
  },
};

type CustomScaleProps = {
  id: number;
  questionText: string;
  minValue: number;
  maxValue: number;
  positionOrderId: number;
  updateAnswer: (answer: number) => void;
};

const generateScaleArr = (min: number, max: number) => {
  const scale: number[] = [];

  for (let i = min; i <= max; i++) {
    scale.push(i);
  }

  return scale;
};

const CustomScale = (props: CustomScaleProps) => {
  const { questionText, minValue, maxValue, positionOrderId, updateAnswer } =
    props;

  const [selectedValue, setSelectedValue] = useState(0);

  const scale = generateScaleArr(minValue, maxValue);

  const handleButtonClick = (value: number) => {
    setSelectedValue(value);
    updateAnswer(value);
  };

  return (
    <Stack my={4}>
      <Typography mb={2} variant="subtitle2">
        {positionOrderId}. {questionText}
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

        {scale.map((scaleValue, index) => (
          <IconButton
            key={index}
            onClick={() => handleButtonClick(scaleValue)}
            sx={
              selectedValue === scaleValue
                ? customStyles.scaleActiveBtn
                : customStyles.scaleInactiveBtn
            }
          >
            <Typography variant="subtitle2">{scaleValue}</Typography>
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
