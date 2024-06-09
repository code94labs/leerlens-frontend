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

import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";

import {
  getPrePostAbsoluteStat,
  getPrePostRelativeStat,
  getPrePostStatistics,
  getPrePostSummaryStatistics,
} from "../../services/dashboardStatistics.service";
import { champBlackFontFamily } from "../../shared/typography";
import {
  barChartColorCombinations,
  barChartGrouColorPallete,
} from "../../utils/constant";
import { CircularProgress } from "@mui/material";

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
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loadingIcon: {
    color: "#A879FF",
  },
};

type Props = {};

const DashboardPrePostContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<
    {
      questionText: string;
      learningOne: number;
      learningTwo: number;
    }[]
  >([]);

  const [summaryData, setSummaryData] = useState<
    {
      questionText: string;
      learningOne: number;
      learningTwo: number;
    }[]
  >([]);

  const [absoluteDifference, setAbsoluteDifference] = useState<
    {
      title: string;
      value: number;
    }[]
  >([]);

  const [relativeDifference, setRelativeDifference] = useState<
    {
      title: string;
      value: number;
    }[]
  >([]);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBackgroundColors = (index: number) =>
    barChartColorCombinations[index % barChartColorCombinations.length];

  const fetchSummaryStat = async () => {
    setIsLoading(true);

    await getPrePostSummaryStatistics()
      .then((res) => {
        setSummaryData(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching summary statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchQuestionnaireStat = async () => {
    setIsLoading(true);

    await getPrePostStatistics()
      .then((res) => {
        setStatisticsData(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchAbsoluteStat = async () => {
    setIsLoading(true);

    await getPrePostAbsoluteStat()
      .then((res) => {
        console.log("absolute reponse:", res);

        setAbsoluteDifference(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchRelativeStat = async () => {
    setIsLoading(true);

    await getPrePostRelativeStat()
      .then((res) => {
        setRelativeDifference(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        Pre - Post Intervention
      </Typography>
      <Typography fontSize={18} color={"#1A1A1A"}>
        # tagline for pre post intervention
      </Typography>
    </Stack>
  );

  const questionnaireCharts = (
    <>
      <Typography variant="h5" m={2} fontWeight={800}>
        Questionnaires
      </Typography>

      <Grid container px={2} spacing={2}>
        {statisticsData &&
          statisticsData.map((data, index) => (
            <Grid item xs={4} key={index}>
              <VerticalBarChartType01
                title={`${index + 1}. ${data.questionText}`}
                labels={["Learning 1", "Learning 2"]}
                datasets={[
                  {
                    data: [data.learningOne, data.learningTwo],
                    backgroundColor: getBackgroundColors(index),
                  },
                ]}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );

  const summaryCharts = (
    <Stack my={2}>
      <Typography variant="h5" m={2} fontWeight={800}>
        Summary charts
      </Typography>

      <Grid container px={2} spacing={2}>
        {summaryData &&
          summaryData.map((data, index) => (
            <Grid item xs={4} key={index}>
              <VerticalBarChartType01
                title={`${index + 1}. ${data.questionText}`}
                labels={["Learning 1", "Learning 2"]}
                datasets={[
                  {
                    data: [data.learningOne, data.learningTwo],
                    backgroundColor: getBackgroundColors(index),
                  },
                ]}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );

  const statisticalCharts = (
    <Stack my={2}>
      <Typography variant="h5" m={2} fontWeight={800}>
        Statistical charts
      </Typography>

      <Grid container spacing={2} px={2}>
        {absoluteDifference && (
          <Grid item xs={6}>
            <VerticalBarChartType01
              removeBarGaps
              title="Absolute Difference"
              labels={absoluteDifference.map((data) => data.title)}
              datasets={[
                {
                  data: absoluteDifference.map((data) => data.value),
                  backgroundColor: barChartGrouColorPallete,
                },
              ]}
            />
          </Grid>
        )}

        {relativeDifference && (
          <Grid item xs={6}>
            <VerticalBarChartType01
              removeBarGaps
              title="Relative Difference"
              labels={relativeDifference.map((data) => data.title)}
              datasets={[
                {
                  data: relativeDifference.map((data) => data.value),
                  backgroundColor: barChartGrouColorPallete,
                },
              ]}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );

  const loading = (
    <Box sx={customStyles.loading}>
      <CircularProgress sx={customStyles.loadingIcon} />
    </Box>
  );

  useEffect(() => {
    fetchQuestionnaireStat();

    fetchSummaryStat();

    fetchAbsoluteStat();

    fetchRelativeStat();
  }, []);

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleSection}

        {filterButton}

        {!isLoading && summaryCharts}

        {!isLoading && statisticalCharts}

        {!isLoading && questionnaireCharts}

        {isLoading && loading}
      </Stack>
    </>
  );
};

export default DashboardPrePostContent;
