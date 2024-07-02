import React from "react";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ProgressBar from "../../shared/Dashboard/ProgressBar/ProgressBar";
import { FieldType } from "../../utils/enum";
import ProgressIndicator from "../../shared/Dashboard/ProgressIndicator/ProgressIndicator";
import LineChart from "../../shared/Dashboard/LineChart/LineChart";
import NumericalDigit from "../../shared/Dashboard/NumericalDigit/NumericalDigit";
import HorizontalBarChart from "../../shared/Dashboard/HorizontalBarChart/HorizontalBarChart";
import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";
import VerticalBarChartType02 from "../../shared/Dashboard/VerticalBarChartType02/VerticalBarChartType02";
import HorizontalBarChartType02 from "../../shared/Dashboard/HorizontalBarChartType02/HorizontalBarChartType02";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  PointElement
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
          <HorizontalBarChart datasets={[]} />

          <HorizontalBarChart datasets={[]} />
        </Stack>
      </Typography>
    </Stack>
  );

  const horizontalBarChartType02 = (
    <Stack>
      <Typography>
        <Typography variant="h4">
          Shared UI component horizontal bar chart Type 02
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <HorizontalBarChartType02
              title={"ABSOLUTE DIFFERENCE"}
              labels={["1", "2", "3", "4"]}
              datasets={[
                {
                  data: [1.5, 0.4, 0.9, 1.2],
                  backgroundColor: ["#EB7200"],
                },
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <HorizontalBarChartType02
              title={"ABSOLUTE DIFFERENCE"}
              labels={["1", "2", "3", "4"]}
              datasets={[
                {
                  data: [0.4, 0.7, 0.9, 1.2],
                  backgroundColor: ["#A879FF"],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Typography>
    </Stack>
  );

  const verticalBarChartType01 = (
    <Stack>
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
    </Stack>
  );

  const verticalBarChartType02 = (
    <Stack>
      <Typography>
        <Typography variant="h4">
          Shared UI component vertical bar chart - type 02
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={["1", "2", "3", "4", "5", "6"]}
              datasets={[
                {
                  data: [4, 10, 4, 7, 6, 8],
                  backgroundColor: ["#A879FF"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              datasets={[
                {
                  data: [4, 10, 4, 7, 6, 8, 8, 8, 8, 8],
                  backgroundColor: ["#A879FF"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={["1", "2", "3", "4", "5", "6"]}
              datasets={[
                {
                  data: [4, 10, 4, 7, 6, 8],
                  backgroundColor: ["#E85D67"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              datasets={[
                {
                  data: [4, 10, 4, 7, 6, 8, 8, 8, 8, 8],
                  backgroundColor: ["#E85D67"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={[
                "1VC",
                "1VA",
                "2VB",
                "2VC",
                "3VA",
                "3VA",
                "3VC",
                "1VQ",
                "1VP",
                "1VD",
              ]}
              dataLabelsVisible
              datasets={[
                {
                  data: [6.1, 4.1, 5.1, 6.1, 8.1, 4.1, 6.1, 8.1, 4.1, 6.5],
                  backgroundColor: ["#EB7200"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={[
                "1VC",
                "1VA",
                "2VB",
                "2VC",
                "3VA",
                "3VA",
                "3VC",
                "1VQ",
                "1VP",
                "1VD",
              ]}
              dataLabelsVisible
              datasets={[
                {
                  data: [6.1, 4.1, 5.1, 6.1, 8.1, 4.1, 6.1, 8.1, 4.1, 6.5],
                  backgroundColor: ["#E85D67"],
                },
              ]}
            />
          </Grid>
          <Grid item xs={8}>
            <VerticalBarChartType02
              title="verdelng van de scores"
              labels={[
                "1VC",
                "1VA",
                "2VB",
                "2VC",
                "3VA",
                "3VA",
                "3VC",
                "1VQ",
                "1VP",
                "1VD",
              ]}
              dataLabelsVisible
              datasets={[
                {
                  data: [6.1, 4.1, 5.1, 6.1, 8.1, 4.1, 6.1, 8.1, 4.1, 6.5],
                  backgroundColor: ["#E85D67"],
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
          type={FieldType.Scale1to10}
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

  const lineGraph = (
    <Stack>
      <Typography variant="h4">Shared UI Component - Line Graph</Typography>

      <Stack
        my={5}
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        <LineChart
          minWidth={650}
          labels={["January", "February", "March", "April"]}
          datasets={[
            {
              label: "Dataset 1",
              data: [65, 59, 80, 81, 56, 55, 40],
              borderColor: "#EB7200",
              backgroundColor: "#EB7200",
            },
            {
              label: "Dataset 2",
              data: [45, 70, 55, 90, 65, 75, 60],
              borderColor: "#A879FF",
              backgroundColor: "#A879FF",
            },
            {
              label: "Dataset 3",
              data: [30, 45, 60, 55, 70, 50, 65],
              borderColor: "#00A88D",
              backgroundColor: "#00A88D",
            },
            {
              label: "Dataset 4",
              data: [80, 75, 85, 60, 75, 70, 85],
              borderColor: "#F5477C",
              backgroundColor: "#F5477C",
            },
          ]}
        />

        <LineChart
          minWidth={650}
          labels={["January", "February", "March", "April"]}
          datasets={[
            {
              label: "Dataset 1",
              data: [65, 59, 80, 81, 56, 55, 40],
              borderColor: "#EB7200",
              backgroundColor: "#EB7200",
            },
            {
              label: "Dataset 2",
              data: [45, 70, 55, 90, 65, 75, 60],
              borderColor: "#A879FF",
              backgroundColor: "#A879FF",
            },
            {
              label: "Dataset 3",
              data: [30, 45, 60, 55, 70, 50, 65],
              borderColor: "#00A88D",
              backgroundColor: "#00A88D",
            },
            {
              label: "Dataset 4",
              data: [80, 75, 85, 60, 75, 70, 85],
              borderColor: "#F5477C",
              backgroundColor: "#F5477C",
            },
          ]}
        />
      </Stack>
    </Stack>
  );

  const verticalCustomBarChart = (
    <Stack>
      <Typography variant="h4">
        Shared UI Component - Individual Vertical Bar Chart
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <VerticalBarChartType01
            removeBarGaps
            datasets={[
              {
                data: [9.1, 16.1, 10.1],
                backgroundColor: ["#8B63A2", "#FDCD00", "#EF804A"],
              },
            ]}
          />
        </Grid>

        <Grid item xs={4}>
          <VerticalBarChartType01
            removeBarGaps
            datasets={[
              {
                data: [9.1, 16.1, 10.1],
                backgroundColor: ["#8B63A2", "#FDCD00", "#EF804A"],
              },
            ]}
          />
        </Grid>

        <Grid item xs={4}>
          <VerticalBarChartType01
            removeBarGaps
            datasets={[
              {
                data: [9.1, 16.1, 10.1],
                backgroundColor: ["#8B63A2", "#FDCD00", "#EF804A"],
              },
            ]}
          />
        </Grid>
      </Grid>
    </Stack>
  );

  return (
    <Stack direction="row" p={5} flexDirection="column">
      {numericalDigits}

      {linebreak}

      {horizontalBarChart}

      {linebreak}

      {horizontalBarChartType02}

      {linebreak}

      {progressBar}

      {linebreak}

      {progressIndicator}

      {linebreak}

      {verticalBarChartType01}

      {linebreak}

      {verticalBarChartType02}

      {linebreak}

      {lineGraph}

      {linebreak}

      {verticalCustomBarChart}
    </Stack>
  );
};

export default SharedDashboardPage;
