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

import DyanmicListHeader from "./DyanmicListHeader";
import ResponseAccordion from "./ResponseAccordion";
import { getAllStudentResponses } from "../../services/response.service";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import { StudentResponse } from "../../utils/types";
import { FormEvaluation } from "../../utils/enum";
import { dateFilterList } from "../../utils/constant";
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
      color: "black",
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

// test arrays
const schoolArray = ["All", "school 1", "school 2", "school 3"];
const gradeArray = ["All", "grade 1", "grade 2", "grade 3"];
const courseArray = ["All", "course 1", "course 2", "course 3"];
const studyArray = ["All", "study 1", "study 2", "study 3"];
const ageArray = ["All", "age 1", "age 2", "age 3"];

const ResponsesContent = () => {
  const [value, setValue] = useState(0);
  const [displayFiltersDiv, setDisplayFiltersDiv] = useState<boolean>(false);
  const [filterSchool, setFilterSchool] = useState<string>(schoolArray[0]);
  const [filterGrade, setFilterGrade] = useState<string>(gradeArray[0]);
  const [filterCourse, setFilterCourse] = useState<string>(courseArray[0]);
  const [filterAge, setFilterAge] = useState<string>(studyArray[0]);
  const [filterStudy, setFilterStudy] = useState<string>(ageArray[0]);
  const [filterDate, setFilterDate] = useState(dateFilterList[0]);
  const [selectedEditType, setSelectedEditType] = useState(editTypeDropdown[0]);

  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(10);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  const [open, setOpen] = useState(false);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>(
    []
  );

  const [filteredStudentResponses, setFilteredStudentResponses] = useState<
    StudentResponse[]
  >([]);

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

  const handleChangeTabs = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const CustomDropdown = ({
    label,
    selectArray,
    filterValue,
    setFilterValue,
  }: {
    label: string;
    selectArray: string[];
    filterValue: string;
    setFilterValue: (value: string) => void;
  }) => (
    <FormControl sx={customStyles.dropdown}>
      <InputLabel>{label}</InputLabel>

      <Select
        value={filterValue}
        label={label}
        onChange={(event: SelectChangeEvent) => {
          setFilterValue(event.target.value);
        }}
      >
        {selectArray.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const filtersDiv = (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <CustomDropdown
          label="School"
          selectArray={schoolArray}
          filterValue={filterSchool}
          setFilterValue={setFilterSchool}
        />
      </Grid>

      <Grid item xs={2}>
        <CustomDropdown
          label="Grade"
          selectArray={gradeArray}
          filterValue={filterGrade}
          setFilterValue={setFilterGrade}
        />
      </Grid>

      <Grid item xs={2}>
        <CustomDropdown
          label="Course"
          selectArray={courseArray}
          filterValue={filterCourse}
          setFilterValue={setFilterCourse}
        />
      </Grid>

      <Grid item xs={4}>
        <CustomDropdown
          label="What do you study"
          selectArray={studyArray}
          filterValue={filterStudy}
          setFilterValue={setFilterStudy}
        />
      </Grid>

      <Grid item xs={1}>
        <CustomDropdown
          label="Age"
          selectArray={ageArray}
          filterValue={filterAge}
          setFilterValue={setFilterAge}
        />
      </Grid>

      <Grid item xs={3}>
        <CustomDropdown
          label="Date"
          selectArray={dateFilterList}
          filterValue={filterDate}
          setFilterValue={setFilterDate}
        />
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

  const filterResponsesByDate = (responses: StudentResponse[]) => {
    if (!responses) return [];

    if (responses.length === 0) return [];

    const dateRangeStr = filterDate;

    const dateRange = getDateRange(dateRangeStr);

    const fromDate = new Date(dateRange[0]);
    const toDate = new Date(dateRange[1]);

    const filteredResponses = responses.filter((response) => {
      if (response.createdAt) {
        const createdAtDate = new Date(response.createdAt);

        return createdAtDate >= fromDate && createdAtDate <= toDate;
      }

      return false;
    });

    setFilteredStudentResponses(filteredResponses);
  };

  const getResponsesByFormType = (formType?: FormEvaluation) => {
    if (!formType && formType !== 0) {
      return filteredStudentResponses;
    }

    return filteredStudentResponses.filter(
      (response) => response.formType === formType
    );
  };

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <Stack sx={customStyles.tabContent}>
            {getResponsesByFormType().map((response) => (
              <ResponseAccordion
                key={response?.id}
                response={response}
                isSelectAllChecked={isSelectAllChecked}
                setFilteredStudentResponses={setFilteredStudentResponses}
              />
            ))}
          </Stack>
        );

      case 1:
        return (
          <Stack sx={customStyles.tabContent}>
            {getResponsesByFormType(FormEvaluation.PreInterventions).map(
              (response) =>
                response && (
                  <ResponseAccordion
                    key={response.id}
                    response={response}
                    isSelectAllChecked={isSelectAllChecked}
                    setFilteredStudentResponses={setFilteredStudentResponses}
                  />
                )
            )}
          </Stack>
        );

      case 2:
        return (
          <Stack sx={customStyles.tabContent}>
            {getResponsesByFormType(FormEvaluation.PostInterventions).map(
              (response) =>
                response && (
                  <ResponseAccordion
                    key={response.id}
                    response={response}
                    isSelectAllChecked={isSelectAllChecked}
                    setFilteredStudentResponses={setFilteredStudentResponses}
                  />
                )
            )}
          </Stack>
        );

      case 3:
        return (
          <Stack sx={customStyles.tabContent}>
            {getResponsesByFormType(FormEvaluation.Evaluation).map(
              (response) =>
                response && (
                  <ResponseAccordion
                    key={response.id}
                    response={response}
                    isSelectAllChecked={isSelectAllChecked}
                    setFilteredStudentResponses={setFilteredStudentResponses}
                  />
                )
            )}
          </Stack>
        );

      case 4:
        return (
          <Stack sx={customStyles.tabContent}>
            {getResponsesByFormType(FormEvaluation.Normgroup).map(
              (response) =>
                response && (
                  <ResponseAccordion
                    key={response.id}
                    response={response}
                    isSelectAllChecked={isSelectAllChecked}
                    setFilteredStudentResponses={setFilteredStudentResponses}
                  />
                )
            )}
          </Stack>
        );

      default:
        return null;
    }
  };

  const tabHeader = (
    <Tabs value={value} onChange={handleChangeTabs} sx={customStyles.tabs}>
      <Tab value={0} label="All" />
      <Tab value={1} label="Pre - Intervention" />
      <Tab value={2} label="Post - Intervention" />
      <Tab value={3} label="Evaluation" />
      <Tab value={4} label="NormGroup" />
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

      <DyanmicListHeader
        title="Recorded date"
        subTitle="Question types"
        isMainTitle
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
          {renderTabContent(value)}
        </Stack>
      )}
      {PaginationComponent}
    </Stack>
  );

  const fetchingAllStudentInfo = async () => {
    await getAllStudentResponses()
      .then((res) => {
        setStudentResponses(res);
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
    const fetchData = async () => {
      setIsLoading(true);

      await fetchingAllStudentInfo();
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterResponsesByDate(studentResponses);
  }, [filterDate, studentResponses]);

  useEffect(() => {
    console.log({
      school: filterSchool,
      course: filterCourse,
      grade: filterGrade,
      study: filterStudy,
      age: filterAge,
      dateRange: filterDate,
    });
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
        {titleFilterSection}

        {tabSection}
      </Stack>

      {snackbar}

      <EditContentDialog
        open={open}
        setOpen={setOpen}
        isClassEdit={isClassEditType}
        isCourseEdit={isCourceEditType}
      />
    </>
  );
};

export default ResponsesContent;
