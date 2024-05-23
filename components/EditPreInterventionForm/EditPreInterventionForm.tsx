import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DynamicField from "../../shared/DynamicField/DynamicField";
import AddNewField from "../../shared/AddNewField/AddNewField";

import {
  resetForm,
  selectForm,
  setFormModified,
} from "../../redux/slices/formSlice";

import {
  getStudentFormInfo,
  postStudentFormInfo,
  studentFormInfoItemSoftDelete,
  studentFormInfoItemUpdateBulk,
  studentFormInfoItemUpdateById,
} from "../../services/editQuestionSets.service";
import {
  getPreInterventionQuestions,
  postPreInterventionQuestions,
  preInterventionQuesionsUpdateBulk,
  preInterventionQuestionFormSoftDelete,
} from "../../services/editPreInerventionQuestionSets.service";

import {
  FieldType,
  FormEvaluation,
  QuestionnaireSection,
  SectionType,
} from "../../utils/enum";
import {
  DropDownOptions,
  FormQuestion,
  Question,
  QuestionResponse,
} from "../../utils/types";

import { champBlackFontFamily } from "../../shared/typography";
import QuestionnaireDynamicField from "../../shared/DynamicField/QuestionnaireDynamicField";
import { QuestionSetMenuItems, questionSetTabs } from "../../utils/constant";
import {
  moveItemDownInArray,
  moveItemUpInArray,
  updateArrayByIndex,
} from "../../utils/helper";

// constants

const topMostIndex = 1;

// styles

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

const EditPreInterventionForm = () => {
  const dispatch = useDispatch();

  const formDetails = useSelector(selectForm);

  const [tab, setTab] = useState(questionSetTabs.personalDetails);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [displayNewQuestion, setDisplayNewQuestion] = useState(false);

  const [personalDetailsQuestions, setPersonalDetailsQuestions] = useState<
    QuestionResponse[]
  >([]);

  const [partOneQuestions, setPartOneQuestions] = useState<FormQuestion[]>([]);
  const [partTwoQuestions, setPartTwoQuestions] = useState<FormQuestion[]>([]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(resetForm());
    setTab(newValue);
  };

  const handlePersonalDetailsSoftDelete = async (id: number) => {
    const response: QuestionResponse[] = await studentFormInfoItemSoftDelete(
      id
    );

    setPersonalDetailsQuestions(response);
  };

  const handlePreInterventionSoftDelete = async (id: number) => {
    const response: FormQuestion[] =
      await preInterventionQuestionFormSoftDelete(id);

    tab === questionSetTabs.quesitonSetOne
      ? setPartOneQuestions(response)
      : setPartTwoQuestions(response);
  };

  // function to update the state of this(parent) component
  const handlePersonalDetailsQuestionUpdate = async (
    question: QuestionResponse
  ) => {
    setPersonalDetailsQuestions(
      updateArrayByIndex([...personalDetailsQuestions], question)
    );
  };

  // function to update the state of this(parent) component
  const handlePreInterventionQuestionUpdate = async (
    question: FormQuestion
  ) => {
    if (question.questionSection === QuestionnaireSection.QuestionPartOne) {
      setPartOneQuestions(updateArrayByIndex([...partOneQuestions], question));
    } else {
      setPartTwoQuestions(updateArrayByIndex([...partTwoQuestions], question));
    }
  };

  const handleUpdateAllPersonalDetailsQuestions = async () => {
    try {
      const response = await studentFormInfoItemUpdateBulk(
        personalDetailsQuestions
      );

      setPersonalDetailsQuestions(response);
      dispatch(resetForm());
    } catch (error) {
      setNotificationMsg("Error updating the questions. Please try again");
      setDisplaySnackbarMsg(true);
    }
  };

  const handleUpdateAllPreInterventionQuestions = async () => {
    const arrayToUpdate = tab === 1 ? partOneQuestions : partTwoQuestions;

    try {
      const response = await preInterventionQuesionsUpdateBulk(arrayToUpdate);

      tab === 1
        ? setPartOneQuestions(
            response.filter(
              (item: FormQuestion) =>
                item.questionSection === QuestionnaireSection.QuestionPartOne
            )
          )
        : setPartTwoQuestions(
            response.filter(
              (item: FormQuestion) =>
                item.questionSection === QuestionnaireSection.QuestionPartTwo
            )
          );

      dispatch(resetForm());
    } catch (error) {
      setNotificationMsg("Error updating the questions. Please try again");
      setDisplaySnackbarMsg(true);
    }
  };

  const handleAddNewQuestion = () => {
    setDisplayNewQuestion(true);
  };

  const handleNewQuestionDelete = () => {
    setDisplayNewQuestion(false);
  };

  const handleNewPersonalDetailsQuestionSave = async ({
    fieldType,
    questionText,
    dropdownOptions,
  }: {
    fieldType: FieldType;
    questionText: string;
    dropdownOptions: DropDownOptions[];
  }) => {
    const newPositionOrderId = personalDetailsQuestions.length + 1;

    const newQuestion: Question = {
      formType: FormEvaluation.PreInterventions,
      questionText: questionText,
      fieldType: fieldType,
      sectionType: SectionType.PersonalDetails,
      positionOrderId: newPositionOrderId,
      dropdownOptions: dropdownOptions,
      minValue: 1,
      maxValue: 6,
      isDelete: false,
      isNewlyAdded: true,
    };

    const response = await postStudentFormInfo(newQuestion);

    const updatedQuestionsArr = personalDetailsQuestions;
    updatedQuestionsArr?.push(response);
    setPersonalDetailsQuestions(updatedQuestionsArr);

    setDisplayNewQuestion(false);
  };

  const handleNewQuestionnaireQuestionSave = async ({
    questionText,
  }: {
    questionText: string;
  }) => {
    const newPositionOrderId =
      tab === questionSetTabs.quesitonSetOne
        ? partOneQuestions.length + 1
        : partTwoQuestions.length + 1;

    const newQuestion: FormQuestion = {
      questionText: questionText,
      positionOrderId: newPositionOrderId,
      minValue: 1,
      maxValue: 6,
      isDelete: false,
      isNewlyAdded: true,
      questionSetId: 0,
      questionSection:
        tab === 1
          ? QuestionnaireSection.QuestionPartOne
          : QuestionnaireSection.QuestionPartTwo,
    };

    const response = await postPreInterventionQuestions(newQuestion);

    const updatedQuestionsArr =
      tab === questionSetTabs.quesitonSetOne
        ? [...partOneQuestions]
        : [...partTwoQuestions];

    updatedQuestionsArr?.push(response);

    if (response.questionSection === QuestionnaireSection.QuestionPartOne) {
      setPartOneQuestions(updatedQuestionsArr);
    } else {
      setPartTwoQuestions(updatedQuestionsArr);
    }

    setDisplayNewQuestion(false);
  };

  // Function to handle moving an item up in the array
  const moveItemUp = (orderId: number | undefined) => {
    if (!orderId) return;
    if (orderId <= topMostIndex) return; // Already at the top, can't move up

    if (tab === questionSetTabs.personalDetails) {
      setPersonalDetailsQuestions(
        moveItemUpInArray([...personalDetailsQuestions], orderId)
      );
    } else if (tab === questionSetTabs.quesitonSetOne) {
      setPartOneQuestions(moveItemUpInArray([...partOneQuestions], orderId));
    } else if (tab === questionSetTabs.quesitonSetTwo) {
      setPartTwoQuestions(moveItemUpInArray([...partTwoQuestions], orderId));
    }

    dispatch(setFormModified());
  };

  // Function to handle moving an item down in the array
  const moveItemDown = (orderId: number | undefined) => {
    if (!orderId) return;
    if (tab === questionSetTabs.personalDetails) {
      if (orderId >= personalDetailsQuestions.length) return; // Already at the bottom, can't move down

      setPersonalDetailsQuestions(
        moveItemDownInArray([...personalDetailsQuestions], orderId)
      );
    } else if (tab === questionSetTabs.quesitonSetOne) {
      if (orderId >= partOneQuestions.length) return; // Already at the bottom, can't move down

      setPartOneQuestions(moveItemDownInArray([...partOneQuestions], orderId));
    } else if (tab === questionSetTabs.quesitonSetTwo) {
      if (orderId >= partTwoQuestions.length) return; // Already at the bottom, can't move down

      setPartTwoQuestions(moveItemDownInArray([...partTwoQuestions], orderId));
    }

    dispatch(setFormModified());
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

  const addQuestionButton = (
    <Stack flexDirection="row" alignItems="center" my={5} mx={3}>
      <Button
        onClick={handleAddNewQuestion}
        sx={customStyles.primaryButton}
        disabled={displayNewQuestion}
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

      <Button
        onClick={
          tab < 1
            ? handleUpdateAllPersonalDetailsQuestions
            : handleUpdateAllPreInterventionQuestions
        }
        sx={customStyles.updateButton}
        disabled={!formDetails.isModified}
      >
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
            {personalDetailsQuestions
              .sort((a, b) => a.positionOrderId - b.positionOrderId)
              .map((question: QuestionResponse) => (
                <DynamicField
                  key={question.id}
                  fieldType={question.fieldType as FieldType}
                  isQuestionnaireType
                  question={question}
                  handleQuestionUpdate={handlePersonalDetailsQuestionUpdate}
                  handleQuestionSoftDelete={handlePersonalDetailsSoftDelete}
                  moveItemUp={moveItemUp}
                  moveItemDown={moveItemDown}
                />
              ))}

            {displayNewQuestion && (
              <AddNewField
                handleNewQuestionDelete={handleNewQuestionDelete}
                handleNewQuestionSave={handleNewPersonalDetailsQuestionSave}
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      case 1:
        return (
          <>
            {partOneQuestions
              .sort((a, b) => a.positionOrderId - b.positionOrderId)
              .map((question: FormQuestion) => (
                <QuestionnaireDynamicField
                  key={question.id}
                  question={question}
                  handleQuestionUpdate={handlePreInterventionQuestionUpdate}
                  handleQuestionSoftDelete={handlePreInterventionSoftDelete}
                  moveItemUp={moveItemUp}
                  moveItemDown={moveItemDown}
                />
              ))}

            {displayNewQuestion && (
              <AddNewField
                handleNewQuestionDelete={handleNewQuestionDelete}
                handleNewQuestionSave={handleNewQuestionnaireQuestionSave}
                questionnaireType
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      case 2:
        return (
          <>
            {partTwoQuestions
              .sort((a, b) => a.positionOrderId - b.positionOrderId)
              .map((question: FormQuestion) => (
                <QuestionnaireDynamicField
                  key={question.id}
                  question={question}
                  handleQuestionUpdate={handlePreInterventionQuestionUpdate}
                  handleQuestionSoftDelete={handlePreInterventionSoftDelete}
                  moveItemUp={moveItemUp}
                  moveItemDown={moveItemDown}
                />
              ))}

            {displayNewQuestion && (
              <AddNewField
                handleNewQuestionDelete={handleNewQuestionDelete}
                handleNewQuestionSave={handleNewQuestionnaireQuestionSave}
                questionnaireType
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      default:
        return null;
    }
  };

  const menuNavigation = (
    <Stack flex={0.17} sx={customStyles.menuNavigation}>
      <Tabs
        value={tab}
        onChange={handleChange}
        orientation="vertical"
        sx={customStyles.tabs}
      >
        {QuestionSetMenuItems.slice(0, 3).map((item) => (
          <Tab value={item.id} label={item.title} key={item.id} />
        ))}
      </Tabs>
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

  const formContent = (
    <Stack flex={0.83}>
      {isLoading ? (
        loading
      ) : (
        <Stack flexDirection="column" sx={customStyles.formContent}>
          {renderTabContent(tab)}
        </Stack>
      )}
    </Stack>
  );

  useMemo(() => {
    const fetchPersonalDetailsQuestions = async () => {
      try {
        const studentFormInfoQuestions = await getStudentFormInfo();

        setPersonalDetailsQuestions(
          studentFormInfoQuestions.filter(
            (item: Question) =>
              item.sectionType === SectionType.PersonalDetails &&
              item.formType === FormEvaluation.PreInterventions
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPreInterventionsQuestions = async () => {
      try {
        const preInterventionQuestions = await getPreInterventionQuestions();

        setPartOneQuestions(
          preInterventionQuestions.filter(
            (item: FormQuestion) =>
              item.questionSection === QuestionnaireSection.QuestionPartOne
          )
        );
        setPartTwoQuestions(
          preInterventionQuestions.filter(
            (item: FormQuestion) =>
              item.questionSection === QuestionnaireSection.QuestionPartTwo
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchPersonalDetailsQuestions();
    fetchPreInterventionsQuestions();
  }, []);

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
