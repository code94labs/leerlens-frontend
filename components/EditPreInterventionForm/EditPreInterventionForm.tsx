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
import React, { SyntheticEvent, useState } from "react";
import DynamicField from "../../shared/DynamicField/DynamicField";
import { FieldType } from "../../utils/enum";
import { champBlackFontFamily } from "../../shared/typography";
import AddIcon from "@mui/icons-material/Add";

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

const sampleResponse = [
  {
    id: 2,
    formType: 1,
    questionText: "What school are you at?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Aeres Hogeschool Dronten",
        isDelete: false,
      },
      {
        id: 2,
        item: "Aeres MBO Almere",
        isDelete: false,
      },
      {
        id: 3,
        item: "Aeres MBO Ede",
        isDelete: false,
      },
      {
        id: 4,
        item: "Aeres MBO Velp",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 3,
    formType: 1,
    questionText: "What do you study?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Havo",
        isDelete: false,
      },
      {
        id: 2,
        item: "VWO",
        isDelete: false,
      },
      {
        id: 3,
        item: "Vmbo TL",
        isDelete: false,
      },
      {
        id: 4,
        item: "Vmbo Kader",
        isDelete: false,
      },
      {
        id: 5,
        item: "Vmbo Basis",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 4,
    formType: 1,
    questionText: "What grade are you in?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "1",
        isDelete: false,
      },
      {
        id: 2,
        item: "2",
        isDelete: false,
      },
      {
        id: 3,
        item: "3",
        isDelete: false,
      },
      {
        id: 4,
        item: "4",
        isDelete: false,
      },
      {
        id: 5,
        item: "5",
        isDelete: false,
      },
      {
        id: 6,
        item: "6",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 5,
    formType: 1,
    questionText: "Which remind program are you following?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Leerlingentraining",
        isDelete: false,
      },
      {
        id: 2,
        item: "Mentorlessen over slim jezelf zijn",
        isDelete: false,
      },
      {
        id: 3,
        item: "Startdag",
        isDelete: false,
      },
      {
        id: 4,
        item: "Doorstroomprogramma vmbo-mbo of mavo-havo",
        isDelete: false,
      },
      {
        id: 5,
        item: "Examentraining",
        isDelete: false,
      },
      {
        id: 6,
        item: "Zomerschool, herfstschool of lenteschool",
        isDelete: false,
      },
      {
        id: 7,
        item: "Remind in de middag / Ondersteuningsprogramma",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 6,
    formType: 1,
    questionText: "In which class are you?",
    fieldType: 1,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 10,
    formType: 2,
    questionText: "What school are you at?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Aeres Hogeschool Dronten",
        isDelete: false,
      },
      {
        id: 2,
        item: "Aeres MBO Almere",
        isDelete: false,
      },
      {
        id: 3,
        item: "Aeres MBO Ede",
        isDelete: false,
      },
      {
        id: 4,
        item: "Aeres MBO Velp",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 11,
    formType: 2,
    questionText: "What do you study?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Havo",
        isDelete: false,
      },
      {
        id: 2,
        item: "VWO",
        isDelete: false,
      },
      {
        id: 3,
        item: "Vmbo TL",
        isDelete: false,
      },
      {
        id: 4,
        item: "Vmbo Kader",
        isDelete: false,
      },
      {
        id: 5,
        item: "Vmbo Basis",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 12,
    formType: 2,
    questionText: "What grade are you in?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "1",
        isDelete: false,
      },
      {
        id: 2,
        item: "2",
        isDelete: false,
      },
      {
        id: 3,
        item: "3",
        isDelete: false,
      },
      {
        id: 4,
        item: "4",
        isDelete: false,
      },
      {
        id: 5,
        item: "5",
        isDelete: false,
      },
      {
        id: 6,
        item: "6",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 13,
    formType: 2,
    questionText: "Which remind program are you following?",
    fieldType: 0,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [
      {
        id: 1,
        item: "Leerlingentraining",
        isDelete: false,
      },
      {
        id: 2,
        item: "Mentorlessen over slim jezelf zijn",
        isDelete: false,
      },
      {
        id: 3,
        item: "Startdag",
        isDelete: false,
      },
      {
        id: 4,
        item: "Doorstroomprogramma vmbo-mbo of mavo-havo",
        isDelete: false,
      },
      {
        id: 5,
        item: "Examentraining",
        isDelete: false,
      },
      {
        id: 6,
        item: "Zomerschool, herfstschool of lenteschool",
        isDelete: false,
      },
      {
        id: 7,
        item: "Remind in de middag / Ondersteuningsprogramma",
        isDelete: false,
      },
    ],
    minValue: 1,
    maxValue: 6,
  },
  {
    id: 14,
    formType: 2,
    questionText: "In which class are you?",
    fieldType: 1,
    sectionType: 0,
    positionOrderId: 1,
    dropdownOptions: [],
    minValue: 1,
    maxValue: 6,
  },
];

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

  const [questions, setQuestions] = useState(sampleResponse);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <Button
        onClick={() =>
          setDisplayNewQuestion((displayNewQuestion) => !displayNewQuestion)
        }
        sx={customStyles.primaryButton}
      >
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
            {questions.map((question) => (
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
            {/* <DynamicField
              title="Question : 2"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />
            <DynamicField
              title="Question : 3"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            /> */}

            {displayNewQuestion && (
              <DynamicField
                title="Question : 4"
                label="Type Question"
                fieldType={FieldType.Scale1to6}
                isQuestionnaireType={true}
                isNewQuestionType={true}
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
          <Tab value={item.id} label={item.title} />
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
