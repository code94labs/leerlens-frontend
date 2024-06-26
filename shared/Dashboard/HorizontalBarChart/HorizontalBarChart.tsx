import { Stack, Typography } from "@mui/material";
import React from "react";

import { Bar } from "react-chartjs-2";
import { champBlackFontFamily } from "../../typography";
import { generateEmptyLabels } from "../../../utils/helper";

const customStyles = {
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: "#1A1A1A",
    m: 4,
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
    height: "100%",
    justifyContent: "space-between",
  },
  innerStack: {
    height: "100%",
    justifyContent: "center",
  },
};

type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string[];
};

interface HorizontalBarChartProps {
  title?: string;
  labels?: string[];
  datasets: Dataset[];
}

const HorizontalBarChart = ({
  title,
  labels,
  datasets,
}: HorizontalBarChartProps) => {
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
    barPercentage: 0.8,
    categoryPercentage: 1.0,
  };

  const data = {
    labels: labels ?? generateEmptyLabels(datasets[0].data.length),
    datasets,
  };

  return (
    <Stack sx={customStyles.stack}>
      <Typography sx={customStyles.title}>{title}</Typography>

      <Stack sx={customStyles.innerStack}>
        <Bar options={options} data={data} />
      </Stack>
    </Stack>
  );
};

export default HorizontalBarChart;
