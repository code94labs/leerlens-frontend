import React from "react";
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

const sampleEvaluationQuestionData: FormQuestion[] = [
  {
    id: 1,
    questionText: "what is your name",
    positionOrderId: 12,
    minValue: 0,
    maxValue: 6,
    isDelete: false,
    isNewlyAdded: true,
    questionSetId: 0,
    questionSection: QuestionnaireSection.QuestionPartOne,
    summaryTypes: [0],
    chartType: ChartType.numericalRepresentation,
  },
  {
    id: 2,
    questionText: "rate our program",
    positionOrderId: 12,
    minValue: 0,
    maxValue: 6,
    isDelete: false,
    isNewlyAdded: true,
    questionSetId: 0,
    questionSection: QuestionnaireSection.QuestionPartOne,
    summaryTypes: [0],
    chartType: ChartType.progressIndicatorTypeTwo,
  },
  {
    id: 3,
    questionText: "rate our coordinators",
    positionOrderId: 12,
    minValue: 0,
    maxValue: 6,
    isDelete: false,
    isNewlyAdded: true,
    questionSetId: 0,
    questionSection: QuestionnaireSection.QuestionPartOne,
    summaryTypes: [0],
    chartType: ChartType.progressIndicatorTypeOne,
  },
  // {
  //   id: 3,
  //   questionText: "How much will you recommend this program to a friend",
  //   positionOrderId: 12,
  //   minValue: 0,
  //   maxValue: 6,
  //   isDelete: false,
  //   isNewlyAdded: true,
  //   questionSetId: 0,
  //   questionSection: QuestionnaireSection.QuestionPartOne,
  //   summaryTypes: [0],
  //   chartType: ChartType.verticalBarChartTypeOne,
  // },
  {
    id: 4,
    questionText: "How much will you recommend this program to a friend",
    positionOrderId: 12,
    minValue: 0,
    maxValue: 6,
    isDelete: false,
    isNewlyAdded: true,
    questionSetId: 0,
    questionSection: QuestionnaireSection.QuestionPartOne,
    summaryTypes: [0],
    chartType: ChartType.verticalBarChartTypeTwo,
  },
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

const DashboardEvaluationContent = (props: Props) => {
  const getChartComponent = (question: FormQuestion) => {
    switch (question.chartType) {
      case ChartType.numericalRepresentation:
        return <NumericalDigit title={question.questionText} value={0} />;
      case ChartType.progressIndicatorTypeOne:
        return (
          <ProgressIndicator
            title={question.questionText}
            value={7}
            color={"#45f"}
            type={FieldType.DropDown}
          />
        );
      case ChartType.progressIndicatorTypeTwo:
        return (
          <ProgressBar
            title={question.questionText}
            value={7}
            color={"#45f"}
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
            title={question.questionText}
            labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            datasets={[
              {
                data: [4, 10, 4, 7, 6, 8, 8, 8, 8, 8],
                backgroundColor: ["#A879FF"],
              },
            ]}
          />
        );
      default:
        console.log(`Sorry, we are out of charts.`);
    }
  };

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

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleSection}

        {filterButton}

        <Grid container px={2} spacing={2}>
          {sampleEvaluationQuestionData.map((question) => (
            <Grid item xs={4} key={question.id}>
              <Box
              // height={200}
              // // width={200}
              // my={4}
              // display="flex"
              // alignItems="center"
              // gap={4}
              // p={2}
              // sx={{ border: "2px solid grey" }}
              >
                {getChartComponent(question)}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default DashboardEvaluationContent;
