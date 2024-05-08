import { Divider, Grid, Stack, Typography } from "@mui/material";
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

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <VerticalBarChartType01
              title="Eigenaarschap"
              labels={["Voor", "NA"]}
              datasets={[
                {
                  data: [3.1, 4.1],
                  backgroundColor: ["#F9C8A6", "#EB7200"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType01
              title="Experimenteren met leren"
              labels={["Voor", "NA"]}
              datasets={[
                {
                  data: [3.1, 4.1],
                  backgroundColor: ["#DCC9FF", "#A879FF"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType01
              title="mindset"
              labels={["Voor", "NA"]}
              datasets={[
                {
                  data: [3.1, 4.1],
                  backgroundColor: ["#FDB8CB", "#F5477C"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType01
              title="zelfregulatie"
              labels={["Voor", "NA"]}
              datasets={[
                {
                  data: [3.1, 4.1],
                  backgroundColor: ["#AEDCD1", "#05A88D"],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Typography>
    </Stack>
  );

  const linebreak = <Divider sx={{ border: 3, my: 5 }} />;

  return (
    <Stack direction="row" p={5} flexDirection="column">
      {numericalDigits}

      {linebreak}

      {horizontalBarChart}

      {linebreak}

      {verticalBarChartType01}
    </Stack>
  );
};

export default SharedDashboardPage;
