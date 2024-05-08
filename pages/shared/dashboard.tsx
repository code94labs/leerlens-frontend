import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import NumericalDigit from "../../shared/Dashboard/NumericalDigit/NumericalDigit";
import HorizontalBarChart from "../../shared/Dashboard/HorizontalBarChart/HorizontalBarChart";
import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const SharedDashboardPage = () => {
  const numericalDigits = (
    <Stack>
      <Typography variant="h4">
        Shared UI Component - Numerical Digits
      </Typography>

      <Stack flexDirection="row" justifyContent="space-evenly" my={5}>
        <NumericalDigit
          title="WHAT RATING DO YOU GIVE THE PROGRAM?"
          value={8.3}
        />

        <NumericalDigit
          title="WHAT RATING DO YOU GIVE THE TRAINER(S)?"
          value={8.7}
        />
      </Stack>
    </Stack>
  );

  const horizontalBarChart = (
    <Stack>
      <Typography>
        <Typography variant="h4">
          Shared UI component horizontal bar chart
        </Typography>

        <HorizontalBarChart />
      </Typography>
    </Stack>
  );

  const verticalBarChartType01 = (
    <Stack>
      <Typography>
        <Typography variant="h4">
          Shared UI component vertical bar chart - type 01
        </Typography>

        <VerticalBarChartType01 />
      </Typography>
    </Stack>
  );

  const linebreak = <Divider sx={{ border: 3, my: 5 }} />;

  return (
    <Stack direction="row" p={5} flexDirection="column">
      {numericalDigits}

      {linebreak}

      {horizontalBarChart}
      {verticalBarChartType01}
    </Stack>
  );
};

export default SharedDashboardPage;
