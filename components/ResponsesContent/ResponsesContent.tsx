import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";
import DyanmicListHeader from "./DyanmicListHeader";
import ResponseAccordion from "./ResponseAccordion";

const dateFilterList = [
  "01/01/2022 - 31/12/2022",
  "01/01/2023 - 31/12/2023",
  "01/01/2024 - 31/12/2024",
];

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
};

const ResponsesContent = () => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dateFilterList[0]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeDate = (event: SelectChangeEvent) => {
    setDate(event.target.value);
  };

  const handleChangeTabs = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dateDropdown = (
    <FormControl sx={customStyles.dropdown}>
      <InputLabel>Date</InputLabel>

      <Select value={date} label="Date" onChange={handleChangeDate}>
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

  const loading = (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <CircularProgress sx={{ color: "#A879FF" }} />
    </Stack>
  );

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <Stack sx={customStyles.tabContent}>
            <ResponseAccordion />
            <ResponseAccordion />
            <ResponseAccordion />
          </Stack>
        );
      case 1:
        return (
          <Stack sx={customStyles.tabContent}>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
          </Stack>
        );
      case 2:
        return (
          <Stack sx={customStyles.tabContent}>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
          </Stack>
        );
      case 3:
        return (
          <Stack sx={customStyles.tabContent}>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
          </Stack>
        );
      case 4:
        return (
          <Stack sx={customStyles.tabContent}>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
            <Typography>Hello world</Typography>
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
        loading
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

  return (
    <Stack sx={customStyles.stack}>
      {titleContentSection}

      {tabSection}
    </Stack>
  );
};

export default ResponsesContent;
