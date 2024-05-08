import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  elements,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Button, Grid, Stack, Typography } from "@mui/material";

import Sidebar from "../../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../../shared/Header/AdminHeader";

import { Livvic } from "next/font/google";

export const livvic = Livvic({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "EIGENAARSCHAP",
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
      grid: { display: false },
      color: "#333333",
      border: {
        width: 3,
        color: "black",
        z: 1,
      },
      // barPercentage: 1.0,
      // categoryPercentage: 1.0,
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
};

const labels = ["Voor", "NA"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [3.1, 4.1],
      backgroundColor: ["#F9C8A6", "#EB7200"],
      borderRadius: 10,
      barPercentage: 1.0,
      categoryPercentage: 1.0,
      // maxBarThickness: 80,
    },
  ],
};

const ChartPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard" shouldDisplayBreadcrumb />

        <Typography variant="h4" gutterBottom m={2}>
          Vertical bar chart - Type 01
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Bar options={options} data={data} height={200} />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ChartPage;
