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

import { FormQuestion } from "../../utils/types";
import { ChartType, FieldType, QuestionnaireSection } from "../../utils/enum";
import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";
import { getPrePostStatistics } from "../../services/dashboardStatistics.service";

const barChartColorCombinations = [
  ["#F9C8A6", "#EB7200"],
  ["#DCC9FF", "#A879FF"],
  ["#FDB8CB", "#F5477C"],
  ["#AEDCD1", "#05A88D"],
];

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

const DashboardPrePostInterventionsContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<
    {
      questionText: string;
      learningOne: number;
      learningTwo: number;
    }[]
  >([]);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterButton = (
    <Stack px={2} py={3} gap={2}>
      <Button variant="outlined" startIcon={<FilterAltIcon />}>
        Filter
      </Button>
    </Stack>
  );

  const titleSection = (
    <Stack px={2} py={3} gap={2}>
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
    const fetchingPrePostStatistics = async () => {
      setIsLoading(true);
      await getPrePostStatistics()
        .then((res) => {
          setStatisticsData(res);
        })
        .catch(() => {
          setIsError(true);

          setNotificationMsg("Error when fetching all student responses...");
          setDisplaySnackbarMsg(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchingPrePostStatistics();
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
                title={`${index + 1}.${data.questionText}`}
                labels={["Learning 1", "Learning 2"]}
                datasets={[
                  {
                    data: [data.learningOne, data.learningTwo],
                    backgroundColor:
                      barChartColorCombinations[
                        index % barChartColorCombinations.length
                      ],
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

export default DashboardPrePostInterventionsContent;
