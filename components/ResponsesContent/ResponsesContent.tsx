import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";

import DynamicListHeader from "./DynamicListHeader";
import ResponseAccordion from "./ResponseAccordion";
import { getAllStudentResponses } from "../../services/response.service";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import { GetResponsesQueryParams, StudentResponse } from "../../utils/types";
import { FormEvaluation } from "../../utils/enum";
import {
  ageList,
  dateFilterList,
  gradeList,
  remindProgramList,
  remindProgramListForFilters,
  schoolList,
  studyFieldList,
} from "../../utils/constant";
import { getDateRange } from "../../utils/helper";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import EditContentDialog from "./EditContentDialog";

const customStyles = {
  primaryButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 100,
    border: "2px #A879FF solid",
    px: 1.25,
    py: 1.25,
    fontSize: 16,
    fontFamily: champBlackFontFamily,
    fontWeight: 400,
    mx: 1.5,

    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
    },
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
  tabs: {
    "& .Mui-selected": {
      color: "#A879FF !important",
      fontWeight: "bold",
      fontSize: 16,
      borderBottom: "5px solid #A879FF",
      zIndex: 999,
    },
    "& .MuiButtonBase-root": {
      textTransform: "initial",
      alignItems: "flex-start",
      p: 1,
      mr: 5,
    },
    borderBottom: "5px solid #E6E6E6",
  },
  scrollableList: {
    overflowY: "auto",
    maxHeight: "60vh",
    "&::-webkit-scrollbar": {
      width: "0",
    },
  },
  paginationComponent: {
    width: "100%",
    marginY: 2,
    "& .css-1yt0x08-MuiButtonBase-root-MuiPaginationItem-root": {
      fontWeight: 600,
    },
    "& .css-1yt0x08-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#A879FF",
      color: "#FFF",
    },
  },
  tabContent: {
    width: "100%",
    zIndex: 3,
    border: "1px #A879FF solid",
    borderRadius: 3,
    p: 0.5,
  },
  stack: {
    backgroundColor: "white",
  },
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
};

const editTypeDropdown = ["Edit class name", "Edit course name"];

enum ResponsesTabs {
  All = 0,
  PreInterventions = 1,
  PostInterventions = 2,
  Normgroup = 3,
  Evaluation = 4,
}

const ResponsesContent = () => {
  const [tabValue, setTabValue] = useState<ResponsesTabs>(ResponsesTabs.All);

  const [displayFiltersDiv, setDisplayFiltersDiv] = useState<boolean>(false);
  const [filterSchool, setFilterSchool] = useState<number>(schoolList[0].id);
  const [filterGrade, setFilterGrade] = useState<number>(gradeList[0].id);
  const [filterCourse, setFilterCourse] = useState<number>(
    remindProgramListForFilters[0].id
  );
  const [filterAge, setFilterAge] = useState<number>(ageList[0].id);
  const [filterStudy, setFilterStudy] = useState<number>(studyFieldList[0].id);
  const [filterDate, setFilterDate] = useState<string>("");

  const [selectedEditType, setSelectedEditType] = useState(editTypeDropdown[0]);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(true);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>(
    []
  );
  const [selectedResponseIds, setSelectedResponseIds] = useState<number[]>([]);

  const isClassEditType = selectedEditType === editTypeDropdown[0];
  const isCourceEditType = selectedEditType === editTypeDropdown[1];

  const handleChangeSelectedEditType = (item: string) => {
    setSelectedEditType(item);

    setOpen(true);

    setIsDropdownOpen(false);
  };

  const handleEditClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChangeTabs = (_: SyntheticEvent, newValue: ResponsesTabs) => {
    setTabValue(newValue);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const CustomDropdown = ({
  //   label,
  //   selectArray,
  //   filterValue,
  //   setFilterValue,
  // }: {
  //   label: string;
  //   selectArray: string[];
  //   filterValue: string;
  //   setFilterValue: (value: string) => void;
  // }) => (
  //   <FormControl sx={customStyles.dropdown}>
  //     <InputLabel>{label}</InputLabel>

  //     <Select
  //       value={filterValue}
  //       label={label}
  //       onChange={(event: SelectChangeEvent) => {
  //         setFilterValue(event.target.value);
  //       }}
  //     >
  //       {selectArray.map((item) => (
  //         <MenuItem value={item} key={item}>
  //           {item}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   </FormControl>
  // );

  const filtersDiv = (
    <Grid container spacing={1}>
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

      <Grid item xs={4}>
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

  const filterEditButtons = (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button
        variant="outlined"
        onClick={() => {
          setDisplayFiltersDiv((prev) => !prev);
        }}
        sx={customStyles.primaryButton}
      >
        <FilterAltSharpIcon />

        <Typography fontWeight={800} mx={0.8}>
          Filter
        </Typography>
      </Button>

      <Box>
        <Button
          variant="outlined"
          onClick={handleEditClick}
          sx={customStyles.primaryButton}
        >
          <Typography fontWeight={800} mx={0.8}>
            Edit
          </Typography>

          <ExpandMoreOutlinedIcon />
        </Button>

        <Menu
          open={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ marginTop: 170, marginLeft: -10 }}
        >
          {editTypeDropdown.map((item) => (
            <MenuItem
              value={item}
              key={item}
              onClick={() => handleChangeSelectedEditType(item)}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  );

  const titleFilterSection = (
    <Stack px={2} py={3} gap={2}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        // px={2}
        // py={3}
      >
        <Typography
          fontSize={20}
          fontFamily={champBlackFontFamily}
          textTransform="uppercase"
        >
          All
        </Typography>

        {filterEditButtons}
      </Stack>

      {displayFiltersDiv && filtersDiv}
    </Stack>
  );

  // const filterResponsesByDate = (responses: StudentResponse[]) => {
  //   if (!responses) return [];

  //   if (responses.length === 0) return [];

  //   const dateRangeStr = filterDate;

  //   const dateRange = getDateRange(dateRangeStr);

  //   const fromDate = new Date(dateRange[0]);
  //   const toDate = new Date(dateRange[1]);

  //   const filteredResponses = responses.filter((response) => {
  //     if (response.createdAt) {
  //       const createdAtDate = new Date(response.createdAt);

  //       return createdAtDate >= fromDate && createdAtDate <= toDate;
  //     }

  //     return false;
  //   });

  //   setFilteredStudentResponses(filteredResponses);
  // };

  const getResponsesByFormType = (formType?: FormEvaluation) => {
    if (!studentResponses) return [];

    if (!formType && formType !== 0) {
      return studentResponses;
    }

    return studentResponses.filter(
      (response) => response.formType === formType
    );
  };

  const renderTabContent = (tabValue: number) => {
    const getFilteredResponses = (formType?: FormEvaluation) => {
      return getResponsesByFormType(formType).length > 0 ? (
        getResponsesByFormType(formType).map(
          (response) =>
            response && (
              <ResponseAccordion
                key={response.id}
                response={response}
                isSelectAllChecked={isSelectAllChecked}
                setFilteredStudentResponses={setStudentResponses}
                setSelectedResponseIds={setSelectedResponseIds}
              />
            )
        )
      ) : (
        <Stack justifyContent="center" alignItems="center" height={200}>
          <Typography fontSize={18}>No responses were found</Typography>
        </Stack>
      );
    };

    switch (tabValue) {
      case 0:
        return (
          <Stack sx={customStyles.tabContent}>{getFilteredResponses()}</Stack>
        );

      case 1:
        return (
          <Stack sx={customStyles.tabContent}>
            {getFilteredResponses(FormEvaluation.PreInterventions)}
          </Stack>
        );

      case 2:
        return (
          <Stack sx={customStyles.tabContent}>
            {getFilteredResponses(FormEvaluation.PostInterventions)}
          </Stack>
        );

      case 3:
        return (
          <Stack sx={customStyles.tabContent}>
            {getFilteredResponses(FormEvaluation.Evaluation)}
          </Stack>
        );

      case 4:
        return (
          <Stack sx={customStyles.tabContent}>
            {getFilteredResponses(FormEvaluation.Normgroup)}
          </Stack>
        );

      default:
        return null;
    }
  };

  const tabHeader = (
    <Tabs value={tabValue} onChange={handleChangeTabs} sx={customStyles.tabs}>
      <Tab value={ResponsesTabs.All} label="All" />
      <Tab value={ResponsesTabs.PreInterventions} label="Pre - Intervention" />
      <Tab
        value={ResponsesTabs.PostInterventions}
        label="Post - Intervention"
      />
      <Tab value={ResponsesTabs.Evaluation} label="Evaluation" />
      <Tab value={ResponsesTabs.Normgroup} label="NormGroup" />
    </Tabs>
  );

  const PaginationComponent = (
    <Stack
      direction="row"
      justifyContent="end"
      sx={customStyles.paginationComponent}
    >
      <Pagination
        count={numberOfPages}
        shape="rounded"
        // color="primary"
        page={page}
        onChange={handleChange}
        sx={{}}
      />
    </Stack>
  );

  const tabSection = (
    <Stack px={2} mt={-3}>
      {tabHeader}

      <DynamicListHeader
        isMainTitle
        titles={
          tabValue === ResponsesTabs.All
            ? [
                "Recorded date",
                "Question types",
                "School",
                "Study",
                "Grade",
                "Remind Program",
              ]
            : ["Recorded date", "School", "Study", "Grade", "Remind Program"]
        }
        isSelectAllChecked={isSelectAllChecked}
        setIsSelectAllChecked={setIsSelectAllChecked}
      />

      {isLoading ? (
        <ProgressSpinner />
      ) : (
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={customStyles.scrollableList}
        >
          {renderTabContent(tabValue)}
        </Stack>
      )}
      {numberOfPages > 1 && PaginationComponent}
    </Stack>
  );

  const snackbar = (
    <Snackbar
      open={displaySnackbarMsg}
      autoHideDuration={6000}
      onClose={() => setDisplaySnackbarMsg(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={() => setDisplaySnackbarMsg(false)}
        severity={isError ? "error" : "success"}
        variant="outlined"
        sx={customStyles.snackbarAlert}
      >
        {notificationMsg}
      </Alert>
    </Snackbar>
  );

  useEffect(() => {
    const fetchingAllStudentResponses = async () => {
      // making the params object
      const params: GetResponsesQueryParams = {
        formType: tabValue !== 0 ? tabValue - 1 : undefined,
        age: filterAge !== 0 ? filterAge : undefined,
        course: filterCourse !== 0 ? filterCourse : undefined,
        grade: filterGrade !== 0 ? filterGrade : undefined,
        school: filterSchool !== 0 ? filterSchool : undefined,
        study: filterStudy !== 0 ? filterStudy : undefined,
        fromDate:
          filterDate.length > 1
            ? getDateRange(filterDate)[0].replace(/[/]/g, "-")
            : undefined,
        toDate:
          filterDate.length > 1
            ? getDateRange(filterDate)[1].replace(/[/]/g, "-")
            : undefined,
        page,
        limit,
      };

      await getAllStudentResponses(params)
        .then((res) => {
          setStudentResponses(res.items);
          setNumberOfPages(res.meta.totalPages);
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

    const fetchData = async () => {
      setIsLoading(true);

      await fetchingAllStudentResponses();

      setRefetch(false);
    };

    // refetch && fetchData();
    fetchData();
  }, [
    refetch,
    tabValue,
    filterSchool,
    filterCourse,
    filterGrade,
    filterStudy,
    filterAge,
    filterDate,
    page,
    limit,
  ]);

  useEffect(() => {
    if (isSelectAllChecked) {
      switch (tabValue) {
        case 0:
          setSelectedResponseIds(studentResponses.map((res) => res.id));
          break;

        case 1:
          setSelectedResponseIds(
            studentResponses
              .filter((res) => res.formType === FormEvaluation.PreInterventions)
              .map((res) => res.id)
          );
          break;

        case 2:
          setSelectedResponseIds(
            studentResponses
              .filter(
                (res) => res.formType === FormEvaluation.PostInterventions
              )
              .map((res) => res.id)
          );
          break;

        case 3:
          setSelectedResponseIds(
            studentResponses
              .filter((res) => res.formType === FormEvaluation.Evaluation)
              .map((res) => res.id)
          );
          break;

        case 4:
          setSelectedResponseIds(
            studentResponses
              .filter((res) => res.formType === FormEvaluation.Normgroup)
              .map((res) => res.id)
          );
          break;
      }
    } else {
      setSelectedResponseIds([]);
    }
  }, [isSelectAllChecked]);

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleFilterSection}

        {tabSection}
      </Stack>

      {snackbar}

      <EditContentDialog
        open={open}
        setOpen={setOpen}
        isClassEdit={isClassEditType}
        isCourseEdit={isCourceEditType}
        selectedResponseIds={selectedResponseIds}
        setRefetch={setRefetch}
      />
    </>
  );
};

export default ResponsesContent;
