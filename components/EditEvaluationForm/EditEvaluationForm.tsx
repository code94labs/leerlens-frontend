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
  FieldType,
  FormEvaluation,
  QuestionSetType,
  QuestionnaireSection,
  SectionType,
} from "../../utils/enum";
import {
  DropDownOptions,
  EvaluationQuestion,
  Question,
  QuestionResponse,
} from "../../utils/types";
import { QuestionSetMenuItems, questionSetTabs } from "../../utils/constant";

import { champBlackFontFamily } from "../../shared/typography";
import EvaluationDynamicField from "../../shared/DynamicField/EvaluationDynamicField";
import {
  evaluationQuestionsUpdateBulk,
  evaluationQuestionFormSoftDelete,
  getEvaluationQuestions,
  postEvaluationQuestions,
} from "../../services/editEvaluationQuestionSets.service";
import {
  moveItemDownInArray,
  moveItemUpInArray,
  updateArrayByIndex,
} from "../../utils/helper";
import AddNewEvaluationField from "../../shared/AddNewEvaluationField/AddNewEvaluationField";

// constants

const indexNotFound = -1;

const topMostIndex = 1;

// custom styles

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

const EditEvaluationForm = () => {
  const dispatch = useDispatch();

  const formDetails = useSelector(selectForm);

  const [tab, setTab] = useState(questionSetTabs.personalDetails);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [displayNewQuestion, setDisplayNewQuestion] = useState<boolean>(false);

  const [personalDetailsQuestions, setPersonalDetailsQuestions] = useState<
    QuestionResponse[]
  >([]);
  const [partOneQuestions, setPartOneQuestions] = useState<
    EvaluationQuestion[]
  >([]);

  const [personalDetailsPartTwoQuestions, setPersonalDetailsPartTwoQuestions] =
    useState<QuestionResponse[]>([]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(resetForm());
    setTab(newValue);
  };

  const handlePersonalDetailsSoftDelete = async (id: number) => {
    const response: QuestionResponse[] = await studentFormInfoItemSoftDelete(
      id
    );

    if (tab === questionSetTabs.personalDetails) {
      setPersonalDetailsQuestions(response);
    } else if (tab === questionSetTabs.quesitonSetTwo) {
      setPersonalDetailsPartTwoQuestions(response);
    }
  };

  const handleEvaluationSoftDelete = async (id: number) => {
    const response: EvaluationQuestion[] =
      await evaluationQuestionFormSoftDelete(id);

    setPartOneQuestions(response);
  };

  // function to update the state of this(parent) component
  const handlePersonalDetailsQuestionUpdate = async (
    question: QuestionResponse
  ) => {
    if (question.sectionType === SectionType.PersonalDetails) {
      setPersonalDetailsQuestions(
        updateArrayByIndex([...personalDetailsQuestions], question)
      );
    } else {
      setPersonalDetailsPartTwoQuestions(
        updateArrayByIndex([...personalDetailsPartTwoQuestions], question)
      );
    }
  };

  // function to update the state of this(parent) component
  const handleEvaluationQuestionUpdate = async (
    question: EvaluationQuestion
  ) => {
    setPartOneQuestions(updateArrayByIndex([...partOneQuestions], question));
  };

  const handleUpdateAllPersonalDetailsQuestions = async () => {
    const arrayToUpdate =
      tab === questionSetTabs.personalDetails
        ? personalDetailsQuestions
        : personalDetailsPartTwoQuestions;

    try {
      const response = await studentFormInfoItemUpdateBulk(arrayToUpdate);

      tab === questionSetTabs.personalDetails
        ? setPersonalDetailsQuestions(
            (response as QuestionResponse[]).filter(
              (q) => q.sectionType === SectionType.PersonalDetails
            )
          )
        : setPersonalDetailsPartTwoQuestions(
            (response as QuestionResponse[]).filter(
              (q) => q.sectionType === SectionType.EvaluationPartTwo
            )
          );
      dispatch(resetForm());
    } catch (error) {
      setNotificationMsg("Error updating the questions. Please try again");
      setDisplaySnackbarMsg(true);
    }
  };

  const handleUpdateAllEvaluationQuestions = async () => {
    try {
      const response = await evaluationQuestionsUpdateBulk(partOneQuestions);

      setPartOneQuestions(response);

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
    const targetArray =
      tab === questionSetTabs.personalDetails
        ? personalDetailsQuestions
        : personalDetailsPartTwoQuestions;

    const newPositionOrderId = targetArray.length + 1;

    const newQuestion: Question = {
      formType: FormEvaluation.Evaluation,
      questionText: questionText,
      fieldType: fieldType,
      sectionType:
        tab === questionSetTabs.personalDetails
          ? SectionType.PersonalDetails
          : SectionType.EvaluationPartTwo,
      positionOrderId: newPositionOrderId,
      dropdownOptions: dropdownOptions,
      minValue: 1,
      maxValue: 6,
      isDelete: false,
      isNewlyAdded: true,
    };

    const response: QuestionResponse = await postStudentFormInfo(newQuestion);

    const updatedQuestionsArr = [...targetArray];

    updatedQuestionsArr?.push(response);

    if (response.sectionType === SectionType.PersonalDetails) {
      setPersonalDetailsQuestions(updatedQuestionsArr);
    } else {
      setPersonalDetailsPartTwoQuestions(updatedQuestionsArr);
    }

    setDisplayNewQuestion(false);
  };

  const handleNewEvaluationQuestionSave = async ({
    questionText,
    fieldType,
    questionSetType,
  }: {
    fieldType: FieldType;
    questionText: string;
    questionSetType: QuestionSetType;
  }) => {
    const newPositionOrderId = partOneQuestions.length + 1;

    const newQuestion: EvaluationQuestion = {
      questionText: questionText,
      positionOrderId: newPositionOrderId,
      isDelete: false,
      isNewlyAdded: true,
      fieldType: fieldType,
      questionSetType: questionSetType,
    };

    const response = await postEvaluationQuestions(newQuestion);

    const updatedQuestionsArr = [...partOneQuestions];

    updatedQuestionsArr?.push(response);

    setPartOneQuestions(updatedQuestionsArr);

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
      setPersonalDetailsPartTwoQuestions(
        moveItemUpInArray([...personalDetailsPartTwoQuestions], orderId)
      );
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
      if (orderId >= personalDetailsPartTwoQuestions.length) return; // Already at the bottom, can't move down

      setPersonalDetailsPartTwoQuestions(
        moveItemDownInArray([...personalDetailsPartTwoQuestions], orderId)
      );
    }

    dispatch(setFormModified());
  };

  // todo: move to a component
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
          tab === questionSetTabs.personalDetails ||
          tab === questionSetTabs.quesitonSetTwo
            ? handleUpdateAllPersonalDetailsQuestions
            : handleUpdateAllEvaluationQuestions
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
      case questionSetTabs.personalDetails:
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
      case questionSetTabs.quesitonSetOne:
        return (
          <>
            {partOneQuestions
              .sort((a, b) => a.positionOrderId - b.positionOrderId)
              .map((question: EvaluationQuestion) => (
                <EvaluationDynamicField
                  key={question.id}
                  question={question}
                  handleQuestionUpdate={handleEvaluationQuestionUpdate}
                  handleQuestionSoftDelete={handleEvaluationSoftDelete}
                  moveItemUp={moveItemUp}
                  moveItemDown={moveItemDown}
                />
              ))}

            {displayNewQuestion && (
              <AddNewEvaluationField
                handleNewQuestionDelete={handleNewQuestionDelete}
                handleNewQuestionSave={handleNewEvaluationQuestionSave}
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      case questionSetTabs.quesitonSetTwo:
        return (
          <>
            {personalDetailsPartTwoQuestions
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
                questionnaireType
              />
            )}

            {addQuestionButton}

            {updateButtonGroup}
          </>
        );
      // case questionSetTabs.programAndSupervisor:
      //   return (
      //     <>
      //       {programAndSupervisorsQuestions
      //         .sort((a, b) => a.positionOrderId - b.positionOrderId)
      //         .map((question: QuestionResponse) => (
      //           <DynamicField
      //             key={question.id}
      //             fieldType={question.fieldType as FieldType}
      //             isQuestionnaireType
      //             question={question}
      //             handleQuestionUpdate={handlePersonalDetailsQuestionUpdate}
      //             handleQuestionSoftDelete={handlePersonalDetailsSoftDelete}
      //             moveItemUp={moveItemUp}
      //             moveItemDown={moveItemDown}
      //           />
      //         ))}

      //       {displayNewQuestion && (
      //         <AddNewField
      //           handleNewQuestionDelete={handleNewQuestionDelete}
      //           handleNewQuestionSave={handleNewPersonalDetailsQuestionSave}
      //         />
      //       )}

      //       {addQuestionButton}

      //       {updateButtonGroup}
      //     </>
      //   );
      // case questionSetTabs.final:
      // return (
      //   <>
      //     {finalQuestions
      //       .sort((a, b) => a.positionOrderId - b.positionOrderId)
      //       .map((question: QuestionResponse) => (
      //         <DynamicField
      //           key={question.id}
      //           fieldType={question.fieldType as FieldType}
      //           isQuestionnaireType
      //           question={question}
      //           handleQuestionUpdate={handlePersonalDetailsQuestionUpdate}
      //           handleQuestionSoftDelete={handlePersonalDetailsSoftDelete}
      //           moveItemUp={moveItemUp}
      //           moveItemDown={moveItemDown}
      //         />
      //       ))}

      //     {displayNewQuestion && (
      //       <AddNewField
      //         handleNewQuestionDelete={handleNewQuestionDelete}
      //         handleNewQuestionSave={handleNewPersonalDetailsQuestionSave}
      //       />
      //     )}

      //     {addQuestionButton}

      //     {updateButtonGroup}
      //   </>
      // );
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
        {QuestionSetMenuItems.map((item) => (
          <Tab
            value={item.id}
            label={item.title}
            key={item.id}
            sx={{ textAlign: "start" }}
          />
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
          {renderTabContent(tab)}
        </Stack>
      )}
    </Stack>
  );

  useEffect(() => {
    const fetchPersonalDetailsQuestions = async () => {
      setIsLoading(true);
      try {
        const studentFormInfoQuestions = await getStudentFormInfo();

        setPersonalDetailsQuestions(
          studentFormInfoQuestions.filter(
            (item: Question) =>
              item.sectionType === SectionType.PersonalDetails &&
              item.formType === FormEvaluation.Evaluation
          )
        );
        setPersonalDetailsPartTwoQuestions(
          studentFormInfoQuestions.filter(
            (item: Question) =>
              item.sectionType === SectionType.EvaluationPartTwo &&
              item.formType === FormEvaluation.Evaluation
          )
        );
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const fetchEvaluationsQuestions = async () => {
      setIsLoading(true);
      try {
        const evaluationQuestions = await getEvaluationQuestions();

        setPartOneQuestions(evaluationQuestions);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPersonalDetailsQuestions();
    fetchEvaluationsQuestions();

    dispatch(resetForm());
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

export default EditEvaluationForm;
