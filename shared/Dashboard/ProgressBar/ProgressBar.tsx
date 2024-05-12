import React from "react";
import { FieldType } from "../../../utils/enum";
import { Box, Stack, Typography } from "@mui/material";
import { livvic } from "../../../public/theme/theme";
import { champBlackFontFamily } from "../../typography";

type Props = {
  title: string;
  color: string;
  type: FieldType;
  value: number;
};

const customStyles = {
  stack: {
    border: "2px #E6E6E6 solid",
    width: 450,
    borderRadius: 2,
    p: 3,
  },
  progressBar: {
    width: "100%",
    height: 50,
    borderRadius: 2,
    mt: 1,
    position: "relative",
  },
  progressIndicator: {
    height: "100%",
    borderRadius: 2,
    position: "absolute",
    left: 0,
    top: 0,
  },
  title: {
    fontWeight: "bold",
    fontFamily: livvic.style.fontFamily,
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
  toolTip: {
    border: "1px black solid",
    backgroundColor: "black",
    width: "fit-content",
    borderRadius: 2,
    m: "auto",
  },
  toolTipText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
  indicatorLabel: {
    fontFamily: champBlackFontFamily,
    fontSize: 24,
    m: 1,
  },
};

const maxValueForQuestionnScale = 6;
const maxValueForEvaluationScale = 10;

const progressWidth = (scaleValue: number, scaleMaxRange: number) =>
  (scaleValue / scaleMaxRange) * 100 + "%";

const applyColorOpacity = (hexCode: string) => `${hexCode}80`;

const toolTipText = (scaleValue: number) => {
  return Number.isInteger(scaleValue) ? scaleValue + ".0" : scaleValue;
};

const ProgressBar = (props: Props) => {
  const { title, color, type, value } = props;

  const getMaxScaleValue = () =>
    FieldType.Scale1to6 === type
      ? maxValueForQuestionnScale
      : maxValueForEvaluationScale;

  const progressIndicator = (
    <Box
      sx={{
        ...customStyles.progressBar,
        backgroundColor: applyColorOpacity(color),
      }}
    >
      <Box
        sx={{
          ...customStyles.progressIndicator,
          width: progressWidth(value, getMaxScaleValue()),
          backgroundColor: color,
        }}
      />
    </Box>
  );

  const toolTip = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={0.5}
      sx={customStyles.toolTip}
    >
      <Typography sx={customStyles.toolTipText}>
        {toolTipText(value)}
      </Typography>
    </Box>
  );

  const startScaleValue = (
    <Typography sx={customStyles.indicatorLabel}>0</Typography>
  );

  const endScaleValue =
    type === FieldType.Scale1to6 ? (
      <Typography sx={customStyles.indicatorLabel}>6</Typography>
    ) : (
      <Typography sx={customStyles.indicatorLabel}>10</Typography>
    );

  return (
    <Stack sx={customStyles.stack} m={3} mb={8}>
      <Typography mb={3} sx={customStyles.title}>
        {title}
      </Typography>

      {toolTip}

      <Stack flexDirection="row" alignItems="center">
        {startScaleValue}

        {progressIndicator}

        {endScaleValue}
      </Stack>
    </Stack>
  );
};

export default ProgressBar;
