import React, { useEffect, useState } from "react";
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

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import NumericalDigit from "../../shared/Dashboard/NumericalDigit/NumericalDigit";
import ProgressBar from "../../shared/Dashboard/ProgressBar/ProgressBar";
import ProgressIndicator from "../../shared/Dashboard/ProgressIndicator/ProgressIndicator";
import VerticalBarChartType02 from "../../shared/Dashboard/VerticalBarChartType02/VerticalBarChartType02";

import { champBlackFontFamily } from "../../shared/typography";

import { DashboardEvaluationChart, FormQuestion } from "../../utils/types";
import { ChartType, FieldType, QuestionnaireSection } from "../../utils/enum";
import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";
import { getEvaluationStatistics } from "../../services/dashboardStatistics.service";
import { getWeightedAverage } from "../../utils/helper";
import { chartColors } from "../../utils/constant";

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

const customStyles = {
  stack: {
    backgroundColor: "white",
  },
};

type Props = {};

const DashboardEvaluationContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<
    DashboardEvaluationChart[]
  >([]);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getChartComponent = (stat: DashboardEvaluationChart, index: number) => {
    switch (stat.chartType) {
      case ChartType.numericalRepresentation:
        return (
          <NumericalDigit
            title={`${index + 1}.${stat.questionText}`}
            value={getWeightedAverage(stat.answerStatistics)}
          />
        );
      case ChartType.progressIndicatorTypeOne:
        return (
          <ProgressIndicator
            title={`${index + 1}.${stat.questionText}`}
            value={getWeightedAverage(stat.answerStatistics)}
            color={chartColors[index % chartColors.length]}
            type={FieldType.DropDown}
          />
        );
      case ChartType.progressIndicatorTypeTwo:
        return (
          <ProgressBar
            title={`${index + 1}.${stat.questionText}`}
            value={getWeightedAverage(stat.answerStatistics)}
            color={chartColors[index % chartColors.length]}
            type={FieldType.DropDown}
          />
        );
      // case ChartType.verticalBarChartTypeOne:
      //   return (
      //     <VerticalBarChartType01
      //       title="zelfregulatie"
      //       labels={["Voor", "NA"]}
      //       datasets={[
      //         {
      //           data: [3.1, 4.1],
      //           backgroundColor: ["#AEDCD1", "#05A88D"],
      //         },
      //       ]}
      //     />
      //   );
      case ChartType.verticalBarChartTypeTwo:
        return (
          <VerticalBarChartType02
            title={`${index + 1}.${stat.questionText}`}
            labels={stat.answerStatistics.map((stat, index) =>
              (index + 1).toString()
            )}
            datasets={[
              {
                data: stat.answerStatistics,
                backgroundColor: [chartColors[index % chartColors.length]],
              },
            ]}
          />
        );
      default:
        console.log(`Sorry, we are out of charts.`);
    }
  };

  const filterButton = (
    <Stack px={2} py={3}>
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        sx={{ width: "max-content" }}
      >
        Filter
      </Button>
    </Stack>
  );

  const titleSection = (
    <Stack mx={2} mt={3}>
      <Typography
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
        color={"#1A1A1A"}
        fontWeight={900}
      >
        The seasonal school
      </Typography>
      <Typography fontSize={18} color={"#1A1A1A"}>
        After the program students gave us grades and assessed statements.Below
        you can read the results
      </Typography>
    </Stack>
  );

  useEffect(() => {
    const fetchingEvaluationStatistics = async () => {
      setIsLoading(true);
      await getEvaluationStatistics()
        .then((res) => {
          setStatisticsData(res);
        })
        .catch(() => {
          setIsError(true);

          setNotificationMsg("Error when fetching evaluation statistics...");
          setDisplaySnackbarMsg(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchingEvaluationStatistics();
  }, []);

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleSection}

        {filterButton}

        <Grid container px={2} spacing={2}>
          {statisticsData.map(
            (stat: DashboardEvaluationChart, index: number) => (
              <Grid item xs={4} key={stat.questionId}>
                {getChartComponent(stat, index)}
              </Grid>
            )
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default DashboardEvaluationContent;
