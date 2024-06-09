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

import { champBlackFontFamily } from "../../shared/typography";

import { getNormGroupStatistics } from "../../services/dashboardStatistics.service";
import { barChartColorCombinations } from "../../utils/constant";
import { DashboardBarChart } from "../../utils/types";

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

const DashboardNormGroupContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<DashboardBarChart[]>([]);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        Norm Group
      </Typography>
      <Typography fontSize={18} color={"#1A1A1A"}>
        # tagline for norm group
      </Typography>
    </Stack>
  );

  const getBackgroundColors = (index: number) =>
    barChartColorCombinations[index % barChartColorCombinations.length];

  useEffect(() => {
    const fetchingNormGroupStatistics = async () => {
      setIsLoading(true);
      await getNormGroupStatistics()
        .then((res) => {
          setStatisticsData(res);
        })
        .catch(() => {
          setIsError(true);

          setNotificationMsg("Error when fetching norm group statistics...");
          setDisplaySnackbarMsg(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchingNormGroupStatistics();
  }, []);

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleSection}

        {filterButton}

        <Grid container px={2} spacing={2}>
          {statisticsData.map((data, index) => (
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
    </>
  );
};

export default DashboardNormGroupContent;
