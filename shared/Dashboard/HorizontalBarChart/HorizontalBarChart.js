import { Stack, Typography } from "@mui/material";
import React from "react";

import { Bar } from "react-chartjs-2";
import { champBlackFontFamily } from "../../typography";

const customStyles = {
  title: {
    fontWeight: 400,
    fontFamily: champBlackFontFamily,
    fontSize: 24,
  },
  label: {
    fontSize: 50,
    fontWeight: 500,
    color: "#333333",
    my: 6,
  },
  stack: {
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
  },
};

const HorizontalBarChart = () => {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 10,
      },
    },
    responsive: true,
    scales: {
      x: {
        display: false, 
        ticks: {
          display: false, 
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false, 
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true, // This line makes the legend shapes circles
        },
      },
      tooltip: {
        // ... (your tooltip customization)
      },
    },
  };

  const labels = ["January", "February", "March"];

  const dataset1Data = [200, 400, 600, 800, 1000, 1200, 1400];
  const dataset2Data = [-200, -400, -600, -800, -1000, -1200, -1400];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataset1Data,
        borderColor: "#EB7200",
        backgroundColor: "#EB7200",
      },
      {
        label: "Dataset 2",
        data: dataset1Data,
        borderColor: "#A879FF",
        backgroundColor: "#A879FF",
      },
      {
        label: "Dataset 3",
        data: dataset2Data,
        borderColor: "#00A88D",
        backgroundColor: "#00A88D",
      },
      {
        label: "Dataset 4",
        data: dataset2Data,
        borderColor: "#F5477C",
        backgroundColor: "#F5477C",
      },
    ],
  };

  return (
    <Stack sx={customStyles.stack}>
      <Typography sx={customStyles.title}>ABSOLUTE DIFFERENCE</Typography>
      <Bar options={options} data={data} />;
    </Stack>
  );
};

export default HorizontalBarChart;
