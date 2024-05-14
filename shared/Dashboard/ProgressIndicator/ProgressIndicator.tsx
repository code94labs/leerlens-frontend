import React from "react";
import { Stack, Typography } from "@mui/material";
import { FieldType } from "../../../utils/enum";
import { livvic } from "../../../public/theme/theme";
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
    width: 450,
    borderRadius: 2,
    p: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
  gaugeValueText: {
    fontSize: 40,
    fontWeight: 700,
    transform: "translate(0px, -20px)",
    fontFamily: livvic.style.fontFamily,
  },
  indicatorLabel: {
    fontSize: 24,
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
