import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";
import QuestionSet from "../../shared/QuestionSet/QuestionSet";
import {
  FieldType,
  FormEvaluation,
  QuestionnaireSection,
  QuestionnaireSet,
} from "../../utils/enum";
import {
  getAllPreInterventionQuestions,
  getStudentFormInfoByFormType,
} from "../../services/questionnaire.service";
import { useRouter } from "next/router";

const customStyles = {
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
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
  scrollableList: {
    overflowY: "auto",
    maxHeight: "60vh",
    "&::-webkit-scrollbar": {
      width: "0",
    },
  },
};

const formType = FormEvaluation.PostInterventions;

type StudentInfo = {
  id: number;
  formType: FormEvaluation;
  questionText: string;
  fieldType: FieldType;
  sectionType: number;
  positionOrderId: number;
};

type Questionnaire = {
  id: number;
  questionText: string;
  positionOrderId: number;
  minvalue: number;
  maxValue: number;
  isDelete: boolean;
  questionSetId: QuestionnaireSet;
  questionSection: QuestionnaireSection;
};

const PreInterventionContent = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [preQuestionnaireList, setPreQuestionnaireList] = useState<
    Questionnaire[]
  >([]);
  const [personalDetails, setPersonalDetails] = useState<StudentInfo[]>([]);

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
        onClick={() => router.push("/admin/question-set/pre-intervention/edit")}
        sx={customStyles.primaryButton}
      >
        Edit Question
      </Button>
    </Stack>
  );

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return personalDetails.map((item, index) => (
          <QuestionSet
            key={item.id}
            number={++index}
            question={item.questionText}
            answerType={item.fieldType}
          />
        ));
      case 1:
        return getQuestionList(QuestionnaireSection.QuestionPartOne).map(
          (item) => (
            <QuestionSet
              key={item.id}
              number={item.id}
              question={item.questionText}
              answerType={FieldType.Scale1to6}
            />
          )
        );
      case 2:
        return getQuestionList(QuestionnaireSection.QuestionPartTwo).map(
          (item) => (
            <QuestionSet
              key={item.id}
              number={item.id}
              question={item.questionText}
              answerType={FieldType.Scale1to6}
            />
          )
        );
      default:
        return null;
    }
  };

  const getQuestionList = (section: QuestionnaireSection) => {
    return preQuestionnaireList.filter(
      (question) => question.questionSection === section
    );
  };

  const fetchingStudentInfo = async () => {
    await getStudentFormInfoByFormType(formType)
      .then((res) => {
        setPersonalDetails(res);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        setNotificationMsg("Error when fetching personal details data...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchingQuestionnaire = async () => {
    await getAllPreInterventionQuestions()
      .then((res) => {
        setPreQuestionnaireList(res);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        setIsError(true);

        setNotificationMsg("Error when fetching pre questionnaire data...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      await fetchingStudentInfo();
      await fetchingQuestionnaire();
    };

    fetchData();
  }, []);

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

  const questionViewTabs = (
    <Stack px={1}>
      <Tabs value={value} onChange={handleChange} sx={customStyles.tabs}>
        <Tab value={0} label="Personal Details" />
        <Tab value={1} label="Questions | Part 01" />
        <Tab value={2} label="Questions | Part 02" />
      </Tabs>

      <QuestionSet isHeading />

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

  return (
    <>
      <Stack>
        {titleButtonSection}

        {questionViewTabs}
      </Stack>

      {snackbar}
    </>
  );
};

export default PreInterventionContent;
