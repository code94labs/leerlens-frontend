import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

import { Bar } from "react-chartjs-2";
import { champBlackFontFamily } from "../../typography";
import { Livvic } from "next/font/google";
import { generateEmptyLabels } from "../../../utils/helper";

export const livvic = Livvic({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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

type Dataset = {
  data: number[];
  backgroundColor: string[];
};

interface VerticalBarChartType01Props {
  title?: string;
  labels?: string[];
  datasets: Dataset[];
  removeBarGaps?: boolean;
  height?: number;
}

const VerticalBarChartType01 = (props: VerticalBarChartType01Props) => {
  const { title, labels, datasets, removeBarGaps, height } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title?.toLocaleUpperCase(),
        font: {
          size: 15,
          weight: 700,
          family: livvic.style.fontFamily,
        },
        color: "#1A1A1A",
        padding: {
          bottom: 50,
        },
      },
      datalabels: {
        backgroundColor: "black",
        anchor: "end" as "center" | "start" | "end",
        offset: -30,
        align: "start" as
          | "center"
          | "start"
          | "end"
          | "right"
          | "bottom"
          | "left"
          | "top",
        borderRadius: 7,
        color: "white",
        padding: {
          top: 6,
          bottom: 6,
          left: 16,
          right: 16,
        },
        font: {
          size: 12,
          weight: 700,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        color: "#333333",
        border: {
          width: 2,
          color: "black",
          z: 1,
        },
        ticks: {
          font: {
            size: 13,
            weight: 800,
          },
        },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
    layout: {
      padding: {
        left: 120,
        right: 120,
        top: 0,
        bottom: 0,
      },
    },
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
    barPercentage: removeBarGaps ? 0.95 : 1.0,
    categoryPercentage: removeBarGaps ? 0.95 : 1.0,
  };

  const data = {
    labels: labels ?? generateEmptyLabels(datasets[0].data.length),
    datasets,
  };

  return (
    <Stack sx={customStyles.stack}>
      {/* <Typography sx={customStyles.title}>ABSOLUTE DIFFERENCE</Typography> */}

      <Bar options={options} data={data} height={height ?? 200} />
    </Stack>
  );
};

export default VerticalBarChartType01;
