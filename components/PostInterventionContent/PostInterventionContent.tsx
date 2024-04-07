import { Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";
import QuestionSet from "../../shared/QuestionSet/QuestionSet";
import { FieldType } from "../../utils/enum";

const customStyles = {
  primaryButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    border: "2px #A879FF solid",
    padding: {
      xs: 0.5,
      md: 1.3,
    },
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontSize: {
      xs: 14,
      md: 16,
    },
    fontFamily: champBlackFontFamily,
    fontWeight: 400,
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
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
      p: 1,
      mr: 5,
    },
    borderBottom: "5px solid #E6E6E6",
  },
};

const PostInterventionContent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const titleButtonSection = (
    <Stack
      py={3}
      px={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5" fontWeight={900} ml={1}>
        PERSONAL DETAILS
      </Typography>

      <Button
        variant="outlined"
        onClick={() => {}}
        sx={customStyles.primaryButton}
      >
        Edit Question
      </Button>
    </Stack>
  );

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <>
            <QuestionSet
              number={1}
              question="What school are you at?"
              answerType={FieldType.DropDown}
            />

            <QuestionSet
              number={2}
              question="What do you study?"
              answerType={FieldType.DropDown}
            />

            <QuestionSet
              number={3}
              question="What grade are you in?"
              answerType={FieldType.DropDown}
            />

            <QuestionSet
              number={4}
              question="In Which class are you?"
              answerType={FieldType.TextField}
            />
          </>
        );
      case 1:
        return <></>;
      case 3:
        return <></>;
      default:
        return null;
    }
  };

  const questionViewTabs = (
    <Stack px={1}>
      <Tabs value={value} onChange={handleChange} sx={customStyles.tabs}>
        <Tab value={0} label="Personal Details" />
        <Tab value={1} label="Questions | Part 01" />
        <Tab value={2} label="Questions | Part 02" />
      </Tabs>

      <QuestionSet isHeading />

      <Stack flexDirection="row" flexWrap="wrap" justifyContent="space-between">
        {renderTabContent(value)}
      </Stack>
    </Stack>
  );

  return (
    <Stack>
      {titleButtonSection}

      {questionViewTabs}
    </Stack>
  );
};

export default PostInterventionContent;
