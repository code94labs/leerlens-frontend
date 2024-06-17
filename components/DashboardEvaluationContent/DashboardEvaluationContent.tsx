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
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

import NumericalDigit from "../../shared/Dashboard/NumericalDigit/NumericalDigit";
import ProgressBar from "../../shared/Dashboard/ProgressBar/ProgressBar";
import ProgressIndicator from "../../shared/Dashboard/ProgressIndicator/ProgressIndicator";
import VerticalBarChartType02 from "../../shared/Dashboard/VerticalBarChartType02/VerticalBarChartType02";

import { champBlackFontFamily } from "../../shared/typography";

import {
  DashboardEvaluationChart,
  FormQuestion,
  GetStatisticsQueryParams,
} from "../../utils/types";
import { ChartType, FieldType, QuestionnaireSection } from "../../utils/enum";
import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";
import { getEvaluationStatistics } from "../../services/dashboardStatistics.service";
import { getDateRange, getWeightedAverage } from "../../utils/helper";
import {
  ageList,
  chartColors,
  dateFilterList,
  gradeList,
  remindProgramListForFilters,
  schoolList,
  studyFieldList,
} from "../../utils/constant";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";

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
  dropdown: {
    width: "100%",
    mb: 2,
    mr: 2,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey !important",
    },
    "& .MuiInputBase-input": {
      fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "grey",
    },
  },
  primaryButtonOutlined: {
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    width: 160,
    border: "2px #A879FF solid",
    px: 1.25,
    py: 1.25,
    fontSize: 16,
    fontFamily: champBlackFontFamily,
    fontWeight: 400,
    mx: 1.5,

    "&:hover": {
      backgroundColor: "#A879FF",
      color: "white",
      border: "2px #A879FF solid",
    },
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
    },
  },
};

type Props = {};

const DashboardEvaluationContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<
    DashboardEvaluationChart[]
  >([]);

  const [displayFiltersDiv, setDisplayFiltersDiv] = useState<boolean>(false);
  const [filterSchool, setFilterSchool] = useState<number>(schoolList[0].id);
  const [filterGrade, setFilterGrade] = useState<number>(gradeList[0].id);
  const [filterCourse, setFilterCourse] = useState<number>(
    remindProgramListForFilters[0].id
  );
  const [filterAge, setFilterAge] = useState<number>(ageList[0].id);
  const [filterStudy, setFilterStudy] = useState<number>(studyFieldList[0].id);
  const [filterDate, setFilterDate] = useState<string>(dateFilterList[0]);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const areFiltersActivated = () => {
    if (
      filterSchool !== schoolList[0].id ||
      filterGrade !== gradeList[0].id ||
      filterCourse !== remindProgramListForFilters[0].id ||
      filterAge !== ageList[0].id ||
      filterStudy !== studyFieldList[0].id ||
      filterDate !== dateFilterList[0]
    ) {
      return false;
    } else {
      return true;
    }
  };

  const resetAllFilters = () => {
    setFilterSchool(schoolList[0].id);
    setFilterGrade(gradeList[0].id);
    setFilterCourse(remindProgramListForFilters[0].id);
    setFilterAge(ageList[0].id);
    setFilterStudy(studyFieldList[0].id);
    setFilterDate(dateFilterList[0]);
  };

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
      // console.log(`Sorry, we are out of charts.`);
    }
  };

  const filterButtonDiv = (
    <Stack px={2} py={2} direction="row" justifyContent="space-between">
      <Button
        variant="outlined"
        onClick={() => {
          setDisplayFiltersDiv((prev) => !prev);
        }}
        startIcon={<FilterAltIcon />}
        sx={{ width: "max-content" }}
        color="secondary"
      >
        Filter
      </Button>
      {!areFiltersActivated() && (
        <Button
          variant="outlined"
          onClick={resetAllFilters}
          // sx={customStyles.primaryButtonOutlined}
          sx={{ width: "max-content" }}
          color="secondary"
        >
          <DoNotDisturbAltOutlinedIcon />

          <Typography fontWeight={800} mx={0.8}>
            Reset filters
          </Typography>
        </Button>
      )}
    </Stack>
  );

  const filtersDiv = (
    <Grid container px={2} gap={2}>
      <Grid item xs={4}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>School</InputLabel>

          <Select
            value={String(filterSchool)}
            label="School"
            onChange={(event: SelectChangeEvent) => {
              setFilterSchool(Number(event.target.value));
            }}
          >
            {schoolList.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.schoolName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>Grade</InputLabel>

          <Select
            value={String(filterGrade)}
            label="Grade"
            onChange={(event: SelectChangeEvent) => {
              setFilterGrade(Number(event.target.value));
            }}
          >
            {gradeList.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>Course</InputLabel>

          <Select
            value={String(filterCourse)}
            label="Course"
            onChange={(event: SelectChangeEvent) => {
              setFilterCourse(Number(event.target.value));
            }}
          >
            {remindProgramListForFilters.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.sentence}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={3}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>What do you study</InputLabel>

          <Select
            value={String(filterStudy)}
            label="What do you study"
            onChange={(event: SelectChangeEvent) => {
              setFilterStudy(Number(event.target.value));
            }}
          >
            {studyFieldList.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.studyField}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>Age</InputLabel>

          <Select
            value={String(filterAge)}
            label="Age"
            onChange={(event: SelectChangeEvent) => {
              setFilterAge(Number(event.target.value));
            }}
          >
            {ageList.map((item) => (
              <MenuItem value={item.id} key={item.age}>
                {item.age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={3}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>Date</InputLabel>

          <Select
            value={filterDate}
            label="Date"
            onChange={(event: SelectChangeEvent) => {
              setFilterDate(event.target.value);
            }}
          >
            {dateFilterList.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
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

  const spinnerSection = (
    <Stack
      m={2}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={200}
    >
      <ProgressSpinner />
    </Stack>
  );

  const noResponsesSection = (
    <Stack
      m={2}
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={200}
    >
      <Typography
        fontSize={18}
        textTransform="uppercase"
        color={"#1A1A1A"}
        fontWeight={700}
      >
        There are no responses under above filters
      </Typography>
    </Stack>
  );

  const statisticsCharts = (
    <Grid container p={2} spacing={2}>
      {isLoading
        ? spinnerSection
        : statisticsData.length < 1
        ? noResponsesSection
        : statisticsData.map(
            (stat: DashboardEvaluationChart, index: number) => (
              <Grid item xs={4} key={stat.questionId}>
                {getChartComponent(stat, index)}
              </Grid>
            )
          )}
    </Grid>
  );

  useEffect(() => {
    const fetchingEvaluationStatistics = async () => {
      setIsLoading(true);

      // making the params object
      const params: GetStatisticsQueryParams = {
        age: filterAge !== 0 ? filterAge : undefined,
        course: filterCourse !== 0 ? filterCourse : undefined,
        grade: filterGrade !== 0 ? filterGrade : undefined,
        school: filterSchool !== 0 ? filterSchool : undefined,
        study: filterStudy !== 0 ? filterStudy : undefined,
        fromDate:
          filterDate !== dateFilterList[0]
            ? getDateRange(filterDate)[0].replace(/[/]/g, "-")
            : undefined,
        toDate:
          filterDate !== dateFilterList[0]
            ? getDateRange(filterDate)[1].replace(/[/]/g, "-")
            : undefined,
      };

      await getEvaluationStatistics(params)
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
  }, [
    filterSchool,
    filterCourse,
    filterGrade,
    filterStudy,
    filterAge,
    filterDate,
  ]);

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleSection}

        {filterButtonDiv}

        {displayFiltersDiv && filtersDiv}

        {statisticsCharts}
      </Stack>
    </>
  );
};

export default DashboardEvaluationContent;
