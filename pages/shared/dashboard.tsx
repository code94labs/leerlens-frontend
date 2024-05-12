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
import ProgressBar from "../../shared/Dashboard/ProgressBar/ProgressBar";
import { FieldType } from "../../utils/enum";
import ProgressIndicator from "../../shared/Dashboard/ProgressIndicator/ProgressIndicator";

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

        <Stack flexDirection="row" justifyContent="space-evenly" my={5}>
          <HorizontalBarChart />

          <HorizontalBarChart />
        </Stack>
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

  const progressBar = (
    <Stack>
      <Typography variant="h4">Shared UI Component - Progress bar</Typography>

      {/* NOTE: the 'color' prop should be in HEX code */}
      <Stack
        flexDirection="row"
        justifyContent="space-evenly"
        my={5}
        flexWrap="wrap"
      >
        <ProgressBar
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#05A88D"
          type={FieldType.Scale1to6}
          value={5}
        />

        <ProgressBar
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#A879FF"
          type={FieldType.Scale1to6}
          value={3}
        />

        <ProgressBar
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#FF1D61"
          type={FieldType.Scale1to10}
          value={5}
        />

        <ProgressBar
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#EB7200"
          type={FieldType.Scale1to6}
          value={4.2}
        />

        <ProgressBar
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#0F0F0F"
          type={FieldType.Scale1to10}
          value={1}
        />
      </Stack>
    </Stack>
  );

  const progressIndicator = (
    <Stack>
      <Typography variant="h4">
        Shared UI Component - Progress Indicator
      </Typography>

      <Stack
        my={5}
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        <ProgressIndicator
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#05A88D"
          type={FieldType.Scale1to6}
          value={2.2}
        />

        <ProgressIndicator
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#EB7200"
          type={FieldType.Scale1to6}
          value={5.6}
        />

        <ProgressIndicator
          title="To what extent have you learned to be smarter and more motivated to learn?"
          color="#A879FF"
          type={FieldType.Scale1to6}
          value={3.8}
        />
      </Stack>
    </Stack>
  );

  return (
    <Stack direction="row" p={5} flexDirection="column">
      {numericalDigits}

      {linebreak}

      {horizontalBarChart}

      {linebreak}

      {verticalBarChartType01}

      {linebreak}

      {progressBar}

      {linebreak}

      {progressIndicator}
    </Stack>
  );
};

export default SharedDashboardPage;
