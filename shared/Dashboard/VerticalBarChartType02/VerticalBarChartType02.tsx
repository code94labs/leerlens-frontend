import { Grid, Stack, Typography } from "@mui/material";
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
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
    maxHeight: 300,
  },
};

interface VerticalBarChartType02Props {
  title: string;
  labels: string[];
  dataLabelsVisible?: boolean; // give a better variable name
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const VerticalBarChartType02 = ({
  title,
  labels,
  dataLabelsVisible = false,
  datasets,
}: VerticalBarChartType02Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title.toLocaleUpperCase(),
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
        display: dataLabelsVisible,
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
          left: 10,
          right: 10,
        },
        font: {
          size: 10,
          weight: 700,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        color: "#000",
        border: {
          width: 2,
          color: "black",
          z: 1,
        },
        ticks: {
          font: {
            size: dataLabelsVisible ? 12 : 25,
            weight: dataLabelsVisible ? 400 : 900,
            family: champBlackFontFamily,
          },
        },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
    // layout: {
    //   padding: {
    //     left: 120,
    //     right: 120,
    //     top: 0,
    //     bottom: 0,
    //   },
    // },
    elements: {
      bar: {
        borderRadius: dataLabelsVisible ? 5 : 10,
      },
    },
    barPercentage: 1.0,
    categoryPercentage: dataLabelsVisible ? 0.8 : 0.9,
    maxBarThickness: dataLabelsVisible ? 40 : 100,
  };

  const data = {
    labels,
    datasets,
  };

  return (
    <Stack sx={customStyles.stack}>
      {/* <Typography mb={3} sx={customStyles.title}>
        {title}
      </Typography> */}

      <Bar options={options} data={data} height={200} />
    </Stack>
  );
};

export default VerticalBarChartType02;
