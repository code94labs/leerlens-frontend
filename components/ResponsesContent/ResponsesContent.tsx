import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";
import DyanmicListHeader from "./DyanmicListHeader";
import ResponseAccordion from "./ResponseAccordion";
import { getAllStudentResponses } from "../../services/response.service";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";
import { StudentResponse } from "../../utils/types";
import { FormEvaluation } from "../../utils/enum";
import { dateFilterList } from "../../utils/constant";
import { getDateRange } from "../../utils/helper";

const customStyles = {
  dropdown: {
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

const ResponsesContent = () => {
  const [value, setValue] = useState(0);
  const [filterDate, setFilterDate] = useState(dateFilterList[0]);

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

  const handleChangeDate = (event: SelectChangeEvent) => {
    setFilterDate(event.target.value);
  };

  const handleChangeTabs = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dateDropdown = (
    <FormControl sx={customStyles.dropdown}>
      <InputLabel>Date</InputLabel>

      <Select value={filterDate} label="Date" onChange={handleChangeDate}>
        {dateFilterList.map((date) => (
          <MenuItem value={date} key={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const titleContentSection = (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={3}
    >
      <Typography
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
      >
        All
      </Typography>

      {dateDropdown}
    </Stack>
  );

  const filterResponsesByDate = (responses: StudentResponse[]) => {
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
                filteredStudentResponses={filteredStudentResponses}
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
                    filteredStudentResponses={filteredStudentResponses}
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
                    filteredStudentResponses={filteredStudentResponses}
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
                    filteredStudentResponses={filteredStudentResponses}
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
                    filteredStudentResponses={filteredStudentResponses}
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

  const tabSection = (
    <Stack px={2} mt={-3}>
      {tabHeader}

      <DyanmicListHeader
        title="Recorded date"
        subTitle="Question types"
        isMainTitle
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

  return (
    <>
      <Stack sx={customStyles.stack}>
        {titleContentSection}

        {tabSection}
      </Stack>

      {snackbar}
    </>
  );
};

export default ResponsesContent;
