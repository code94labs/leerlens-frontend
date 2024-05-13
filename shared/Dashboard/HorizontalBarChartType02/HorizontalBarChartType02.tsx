import { Stack, Typography } from "@mui/material";
import React from "react";

import { Bar } from "react-chartjs-2";
import { champBlackFontFamily } from "../../typography";
import { Livvic } from "next/font/google";

export const livvic = Livvic({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const customStyles = {
  title: {
    fontWeight: "bold",
    fontFamily: livvic.style.fontFamily,
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
  label: {
    fontSize: 50,
    fontWeight: 500,
    color: "#333333",
    my: 6,
  },
  stack: {
    alignItems: "center",
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
    // width: 800,
  },
};

interface HorizontalBarChartType02Props {
  title: string;
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const HorizontalBarChartType02 = ({
  title,
  labels,
  datasets,
}: HorizontalBarChartType02Props) => {
  const options = {
    indexAxis: "y" as "y" | "x" | undefined,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end" as "center" | "start" | "end",
        align: "end" as
          | "center"
          | "start"
          | "end"
          | "right"
          | "bottom"
          | "left"
          | "top",
        formatter: (value: any) => {
          return `+${value}`;
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
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: true,
        border: {
          width: 3,
          color: "black",
          z: 1,
        },
        ticks: {
          display: true,
          font: {
            size: 25,
            weight: 900,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 60,
        right: 60,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
    barPercentage: 1.0,
    categoryPercentage: 0.7,
  };

  const data = {
    labels,
    datasets,
  };

  return (
    <Stack sx={customStyles.stack}>
      <Typography sx={customStyles.title}>{title}</Typography>

      <Bar options={options} data={data} />
    </Stack>
  );
};

export default HorizontalBarChartType02;
