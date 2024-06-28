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
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";

import VerticalBarChartType01 from "../../shared/Dashboard/VerticalBarChartType01/VerticalBarChartType01";

import {
  getPrePostAbsoluteStat,
  getPrePostRelativeStat,
  getPrePostStatistics,
  getPrePostSummaryStatistics,
} from "../../services/dashboardStatistics.service";
import { champBlackFontFamily } from "../../shared/typography";
import {
  ageList,
  barChartColorCombinations,
  barChartGrouColorPallete,
  dateFilterList,
  gradeList,
  remindProgramListForFilters,
  schoolList,
  studyFieldList,
} from "../../utils/constant";
import {
  DashboardBarChart,
  DashboardStatistics,
  GetStatisticsQueryParams,
} from "../../utils/types";
import { getDateRange } from "../../utils/helper";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";
import { APILoadingStates } from "../../utils/enum";
import HorizontalBarChart from "../../shared/Dashboard/HorizontalBarChart/HorizontalBarChart";

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
};

type Props = {};

const DashboardPrePostContent = (props: Props) => {
  const [statisticsData, setStatisticsData] = useState<DashboardBarChart[]>([]);
  const [summaryData, setSummaryData] = useState<DashboardBarChart[]>([]);

  const [absoluteDifference, setAbsoluteDifference] = useState<
    DashboardStatistics[]
  >([]);
  const [relativeDifference, setRelativeDifference] = useState<
    DashboardStatistics[]
  >([]);

  console.log(relativeDifference);

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
  const [isLoading, setIsLoading] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const getBackgroundColors = (index: number) =>
    barChartColorCombinations[index % barChartColorCombinations.length];

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

  const getFilterParams = () => {
    // making the params object
    const filterParams: GetStatisticsQueryParams = {
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

    return filterParams;
  };

  const fetchSummaryStat = async () => {
    setIsLoading((prev) => {
      let loadingArray = [...prev];
      loadingArray[APILoadingStates.summaryCharts] = true;
      return loadingArray;
    });

    await getPrePostSummaryStatistics(getFilterParams())
      .then((res) => {
        setSummaryData(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching summary statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading((prev) => {
          let loadingArray = [...prev];
          loadingArray[APILoadingStates.summaryCharts] = false;
          return loadingArray;
        });
      });
  };

  const fetchQuestionnaireStat = async () => {
    setIsLoading((prev) => {
      let loadingArray = [...prev];
      loadingArray[APILoadingStates.statisticalCharts] = true;
      return loadingArray;
    });

    await getPrePostStatistics(getFilterParams())
      .then((res) => {
        setStatisticsData(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading((prev) => {
          let loadingArray = [...prev];
          loadingArray[APILoadingStates.statisticalCharts] = false;
          return loadingArray;
        });
      });
  };

  const fetchAbsoluteStat = async () => {
    setIsLoading((prev) => {
      let loadingArray = [...prev];
      loadingArray[APILoadingStates.abosoluteDifference] = true;
      return loadingArray;
    });

    await getPrePostAbsoluteStat(getFilterParams())
      .then((res) => {
        // console.log("absolute reponse:", res);

        setAbsoluteDifference(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading((prev) => {
          let loadingArray = [...prev];
          loadingArray[APILoadingStates.abosoluteDifference] = false;
          return loadingArray;
        });
      });
  };

  const fetchRelativeStat = async () => {
    setIsLoading((prev) => {
      let loadingArray = [...prev];
      loadingArray[APILoadingStates.relativeDifference] = true;
      return loadingArray;
    });

    await getPrePostRelativeStat(getFilterParams())
      .then((res) => {
        setRelativeDifference(res);
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching questionnaire statistics...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading((prev) => {
          let loadingArray = [...prev];
          loadingArray[APILoadingStates.relativeDifference] = false;
          return loadingArray;
        });
      });
  };

  const filterButtonDiv = (
    <Stack px={2} py={3} direction="row" justifyContent="space-between">
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
        Pre - Post Intervention
      </Typography>
      <Typography fontSize={18} color={"#1A1A1A"}>
        # tagline for pre post intervention
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

  const questionnaireCharts = (
    <>
      <Typography variant="h5" m={2} fontWeight={800}>
        Questionnaires
      </Typography>

      <Grid container px={2} spacing={2}>
        {isLoading[APILoadingStates.statisticalCharts]
          ? spinnerSection
          : statisticsData && statisticsData.length < 1
          ? noResponsesSection
          : (statisticsData || []).map((data, index) => (
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
        {isLoading[APILoadingStates.summaryCharts]
          ? spinnerSection
          : summaryData && summaryData.length < 1
          ? noResponsesSection
          : (summaryData || []).map((data, index) => (
              <Grid item xs={3} key={index}>
                <VerticalBarChartType01
                  title={`${index + 1}. ${data.questionText}`}
                  labels={["Learning 1", "Learning 2"]}
                  datasets={[
                    {
                      data: [data.learningOne, data.learningTwo],
                      backgroundColor: getBackgroundColors(index),
                    },
                  ]}
                  tightPadding
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
        <Grid item xs={6}>
          {isLoading[APILoadingStates.abosoluteDifference] ? (
            spinnerSection
          ) : absoluteDifference && absoluteDifference.length < 1 ? (
            noResponsesSection
          ) : (
            <VerticalBarChartType01
              removeBarGaps
              title="Absolute Difference"
              labels={(absoluteDifference || []).map((data) => data.title)}
              datasets={[
                {
                  data: (absoluteDifference || []).map((data) => data.value),
                  backgroundColor: barChartGrouColorPallete,
                },
              ]}
              scaledToSix={false}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          {isLoading[APILoadingStates.relativeDifference] ? (
            spinnerSection
          ) : relativeDifference && relativeDifference.length < 1 ? (
            noResponsesSection
          ) : (
            <HorizontalBarChart
              title="Relative Difference"
              datasets={(relativeDifference || []).map((data, index) => {
                return {
                  label: data.title,
                  data: [data.value],
                  backgroundColor: [barChartGrouColorPallete[index]],
                };
              })}
            />
          )}
        </Grid>
      </Grid>
    </Stack>
  );

  useEffect(() => {
    fetchQuestionnaireStat();

    fetchSummaryStat();

    fetchAbsoluteStat();

    fetchRelativeStat();
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

        {summaryCharts}

        {statisticalCharts}

        {questionnaireCharts}
      </Stack>
    </>
  );
};

export default DashboardPrePostContent;
