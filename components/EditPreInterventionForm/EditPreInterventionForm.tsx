import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useMemo, useState } from "react";
import DynamicField from "../../shared/DynamicField/DynamicField";
import { FieldType, FormEvaluation, SectionType } from "../../utils/enum";
import { champBlackFontFamily } from "../../shared/typography";
import AddIcon from "@mui/icons-material/Add";
import {
  getStudentFormInfo,
  postStudentFormInfo,
} from "../../services/editQuestionSets.service";
import { DropDownOptions, Question, QuestionResponse } from "../../utils/types";

const customStyles = {
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
  menuNavigation: {
    backgroundColor: "#F2EEFB",
    height: "82vh",
  },
  tabs: {
    "& .Mui-selected": {
      color: "black",
      fontWeight: "bold",
      fontSize: 15,
      borderBottom: "5px solid #A879FF",
    },
    "& .MuiButtonBase-root": {
      textTransform: "initial",
      mx: 2,
      my: 0.5,
      color: "black !important",
      borderBottom: "1px solid #98989A",
      alignItems: "flex-start",
      pl: 0,
      pb: 2.5,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  formContent: {
    backgroundColor: "#F8F8F8",
    overflowY: "auto",
    height: "80vh",
  },
  primaryButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    border: "2px #A879FF solid",
    p: 1.5,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontSize: 16,
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
    },
    "> *": {
      fontWeight: 400,
      fontFamily: champBlackFontFamily,
    },
  },
  updateButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    padding: 1.3,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
    },
    fontSize: 16,
    fontFamily: champBlackFontFamily,
    fontWeight: 400,
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
    },
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    border: "2px #A879FF solid",
    p: 1.3,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontFamily: champBlackFontFamily,
    mr: 2,
  },
};

const initialNewQuestionContent: Question = {
  formType: FormEvaluation.PreInterventions,
  questionText: "",
  fieldType: FieldType.TextField,
  sectionType: SectionType.PersonalDetails,
  positionOrderId: 999,
  dropdownOptions: [],
  minValue: 0,
  maxValue: 6,
};

const menuItems = [
  {
    id: 0,
    title: "Personal Details",
  },
  {
    id: 1,
    title: "Question | Part 01",
  },
  {
    id: 2,
    title: "Question | Part 02",
  },
];

const EditPreInterventionForm = () => {
  const [value, setValue] = useState(0);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [displayNewQuestion, setDisplayNewQuestion] = useState(false);

  const [questions, setQuestions] = useState<QuestionResponse[]>();

  useMemo(() => {
    const fetchData = async () => {
      try {
        const studentFormInfoQuestions = await getStudentFormInfo();

        setQuestions(
          studentFormInfoQuestions.filter(
            (item: Question) => item.sectionType === SectionType.PersonalDetails
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddNewQuestion = () => {
    setDisplayNewQuestion(true);
  };

  const handleNewQuestionDelete = () => {
    setDisplayNewQuestion(false);
    // setNewQuestion(initialNewQuestionContent);
  };

  const handleNewQuestionSave = async ({
    fieldType,
    questionText,
    dropdownOptions,
  }: {
    fieldType: FieldType;
    questionText: string;
    dropdownOptions: DropDownOptions[];
  }) => {
    const newQuestion = initialNewQuestionContent;
    if (questionText.length > 1) {
      newQuestion.fieldType = fieldType;
      newQuestion.questionText = questionText;
      newQuestion.dropdownOptions = dropdownOptions;
      const response = await postStudentFormInfo(newQuestion);

      const updatedQuestionsArr = questions;
      updatedQuestionsArr?.push(response);
      setQuestions(updatedQuestionsArr);

      setDisplayNewQuestion(false);
    } else {
      console.log("questionText empty");
    }
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

  const addQuestionButton = (
    <Stack flexDirection="row" alignItems="center" my={5} mx={3}>
      <Button onClick={handleAddNewQuestion} sx={customStyles.primaryButton}>
        <AddIcon />

        <Typography>Add Question</Typography>
      </Button>
    </Stack>
  );

  const updateButtonGroup = (
    <Stack
      flexDirection="row"
      alignItems="center"
      my={5}
      mx={3}
      justifyContent="flex-end"
    >
      <Button onClick={() => {}} sx={customStyles.cancelButton}>
        Cancel
      </Button>

      <Button onClick={() => {}} sx={customStyles.updateButton} disabled>
        Update
      </Button>
    </Stack>
  );

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <>
            <DynamicField
              title="Personal Details"
              label="Question heading"
              fieldType={FieldType.TextField}
            />
            <DynamicField
              title="Description"
              label="Question heading description"
              fieldType={FieldType.TextArea}
            />
            <DynamicField
              title="Sub heading"
              label="Question heading"
              fieldType={FieldType.TextField}
            />
            {questions &&
              questions.map((question: QuestionResponse) => (
                <DynamicField
                  title={`Question : ${question.id}`}
                  label="Type Question"
                  fieldType={question.fieldType as FieldType}
                  isQuestionnaireType={true}
                  questionText={question.questionText}
                  dropdownOptions={question.dropdownOptions}
                  key={question.id}
                />
              ))}

            {displayNewQuestion && (
              <DynamicField
                title="Add New Question"
                label="Type Question"
                fieldType={initialNewQuestionContent.fieldType as FieldType}
                questionText={initialNewQuestionContent.questionText}
                dropdownOptions={initialNewQuestionContent.dropdownOptions}
                isQuestionnaireType={true}
                isNewQuestionType={true}
                handleNewQuestionDelete={handleNewQuestionDelete}
                handleNewQuestionSave={handleNewQuestionSave}
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      case 1:
        return (
          <>
            <DynamicField
              title="Question : 1"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />
            <DynamicField
              title="Question : 1"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />

            {addQuestionButton}
          </>
        );
      case 2:
        return (
          <>
            <DynamicField
              title="Question : 1"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />

            {addQuestionButton}
          </>
        );
      default:
        return null;
    }
  };

  const menuNavigation = (
    <Stack flex={0.17} sx={customStyles.menuNavigation}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        sx={customStyles.tabs}
      >
        {menuItems.map((item) => (
          <Tab value={item.id} label={item.title} key={item.id} />
        ))}
      </Tabs>
    </Stack>
  );

  const formContent = (
    <Stack flex={0.83}>
      {isLoading ? (
        loading
      ) : (
        <Stack flexDirection="column" sx={customStyles.formContent}>
          {renderTabContent(value)}
        </Stack>
      )}
    </Stack>
  );

  return (
    <>
      <Stack flexDirection="row">
        {menuNavigation}

        {formContent}
      </Stack>

      {snackbar}
    </>
  );
};

export default EditPreInterventionForm;
