import { Stack, Typography } from "@mui/material";
import React from "react";

import { Bar } from "react-chartjs-2";
import { champBlackFontFamily } from "../../typography";

const customStyles = {
  title: {
    fontWeight: 400,
    fontFamily: champBlackFontFamily,
    fontSize: 24,
    mb: 3
  },
  label: {
    fontSize: 50,
    fontWeight: 500,
    color: "#333333",
    my: 6,
  },
  stack: {
    alignItems: 'center',
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
    width: 800
  },
};

const HorizontalBarChart = () => {
  const options = {
    indexAxis: "y" as "y" | "x" | undefined,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
      datalabels: {
        anchor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];

          return value < 0 ? "start" : "end";
        },

        align: (context: any) => {
          const value = context.dataset.data[context.dataIndex];

          return value < 0 ? "start" : "end";
        },

        formatter: (value: any) => {
          return value >= 0 ? `+${value}` : `${value}`;
        },

        color: "black",
        borderRadius: 3,
        padding: {
          top: 6,
          bottom: 6,
          left: 16,
          right: 16,
        },
        font: {
          size: 13,
          weight: 900,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: (context: any) =>
            context.tick.value === 0 ? "black" : "transparent",
          lineWidth: (context: any) => (context.tick.value === 0 ? 3 : 0),
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 120,
        right: 120,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
    barPercentage: 1.0,
    categoryPercentage: 1.0,
  };

  const labels = ["January", "February", "March"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 50],
        borderColor: "#EB7200",
        backgroundColor: "#EB7200",
      },
      {
        label: "Dataset 2",
        data: [-150, -30],
        borderColor: "#A879FF",
        backgroundColor: "#A879FF",
      },
      {
        label: "Dataset 3",
        data: [150, 45],
        borderColor: "#00A88D",
        backgroundColor: "#00A88D",
      },
      {
        label: "Dataset 4",
        data: [-170, -80],
        borderColor: "#F5477C",
        backgroundColor: "#F5477C",
      },
    ],
  };

  return (
    <Stack sx={customStyles.stack}>
      <Typography sx={customStyles.title}>ABSOLUTE DIFFERENCE</Typography>

      <Bar options={options} data={data} />
    </Stack>
  );
};

export default HorizontalBarChart;
