import { Stack } from "@mui/material";
import { Line } from "react-chartjs-2";
import React from "react";

type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

type Props = {
  minWidth: number;
  labels: string[];
  datasets: Dataset[];
};

const customStyles = {
  stack: {
    alignItems: "center",
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
  },
};

const LineChart = (props: Props) => {
  const { minWidth, labels, datasets } = props;

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <Stack sx={customStyles.stack}>
      <Line data={data} options={options} style={{ minWidth }} />
    </Stack>
  );
};

export default LineChart;
