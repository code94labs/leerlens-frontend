import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { FieldType } from "../../utils/enum";

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
  questionText: string;
  fieldType: FieldType;
  positionOrderId: number;
  updateAnswer: (answer: number) => void;
  isDisabled?: boolean;
  evaluationQuestionnaire?: boolean;
};

const generateScaleArr = (min: number, max: number) => {
  const scale: number[] = [];

  for (let i = min; i <= max; i++) {
    scale.push(i);
  }

  return scale;
};

const CustomScale = (props: CustomScaleProps) => {
  const {
    questionText,
    fieldType,
    positionOrderId,
    updateAnswer,
    isDisabled,
    evaluationQuestionnaire,
  } = props;

  const [selectedValue, setSelectedValue] = useState(0);

  const scale = generateScaleArr(1, fieldType === FieldType.Scale1to6 ? 6 : 10);

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
        {!(fieldType == FieldType.Scale1to10) && (
          <Typography color="grey" sx={customStyles.scaleText}>
            {!evaluationQuestionnaire ? "Totally disagree" : "Not valuable"}
          </Typography>
        )}
        {!(fieldType == FieldType.Scale1to10) && (
          <Typography color="grey" sx={customStyles.scaleText}>
            {!evaluationQuestionnaire ? "Totally agree" : "Very valuable"}
          </Typography>
        )}
      </Stack>

      <Stack
        flexDirection="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        sx={{ width: fieldType === FieldType.Scale1to6 ? 650 : 650 }}
      >
        {!(fieldType == FieldType.Scale1to10) && (
          <Typography
            color="grey"
            sx={customStyles.scaleText}
            display={{
              xs: "none",
              md: "flex",
            }}
          >
            {!evaluationQuestionnaire ? "Totally disagree" : "Not valuable"}
          </Typography>
        )}

        {scale.map((scaleValue, index) => (
          <IconButton
            key={index}
            disabled={isDisabled}
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

        {!(fieldType == FieldType.Scale1to10) && (
          <Typography
            color="grey"
            sx={customStyles.scaleText}
            display={{
              xs: "none",
              md: "flex",
            }}
          >
            {!evaluationQuestionnaire ? "Totally agree" : "Very valuable"}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default CustomScale;
