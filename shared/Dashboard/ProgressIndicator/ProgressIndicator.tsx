import React from "react";
import { Stack, Typography } from "@mui/material";
import { FieldType } from "../../../utils/enum";
import { livvic } from "../../../public/theme/theme";
import { champBlackFontFamily } from "../../typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

type Props = {
  title: string;
  color: string;
  type: FieldType;
  value: number;
};

const customStyles = {
  stack: {
    border: "2px #E6E6E6 solid",
    width: "100%",
    height: "100%",
    borderRadius: 2,
    // p: 3,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: "#1A1A1A",
    m: 4,
  },
  gaugeValueText: {
    fontFamily: champBlackFontFamily,
    fontSize: 40,
    fontWeight: 700,
    transform: "translate(0px, -20px)",
  },
  indicatorLabel: {
    fontSize: 24,
    fontWeight: 500,
    color: "#333333",
    m: 1,
  },
};

const gaugeSettings = {
  height: 200,
  startAngle: -90,
  endAngle: 90,
  cornerRadius: "10%",
};

const maxValueForQuestionnScale = 6;
const maxValueForEvaluationScale = 10;

const ProgressIndicator = (props: Props) => {
  const { title, color, type, value } = props;

  const gaugeData = {
    value,
    valueMin: 1,
    valueMax:
      type === FieldType.Scale1to6
        ? maxValueForQuestionnScale
        : maxValueForEvaluationScale,
  };

  const gaugeIndicator = (
    <Gauge
      {...gaugeSettings}
      {...gaugeData}
      sx={{
        [`& .${gaugeClasses.valueText}`]: customStyles.gaugeValueText,
        [`& .${gaugeClasses.valueArc}`]: {
          fill: color,
        },
      }}
    />
  );

  const startScaleValue = (
    <Typography sx={customStyles.indicatorLabel}>1</Typography>
  );

  const endScaleValue =
    type === FieldType.Scale1to6 ? (
      <Typography sx={customStyles.indicatorLabel}>6</Typography>
    ) : (
      <Typography sx={customStyles.indicatorLabel}>10</Typography>
    );

  return (
    <Stack sx={customStyles.stack}>
      <Typography mb={3} sx={customStyles.title}>
        {title}
      </Typography>

      <Stack flexDirection="row" alignItems="end">
        {startScaleValue}

        {gaugeIndicator}

        {endScaleValue}
      </Stack>
    </Stack>
  );
};

export default ProgressIndicator;
