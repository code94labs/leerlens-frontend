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
} from "../../services/editPreInerventionQuestionSets.service";

import { FieldType, FormEvaluation, SectionType } from "../../utils/enum";
import {
  DropDownOptions,
  FormQuestion,
  Question,
  QuestionResponse,
} from "../../utils/types";

import { champBlackFontFamily } from "../../shared/typography";
import QuestionnaireDynamicField from "../../shared/DynamicField/QuestionnaireDynamicField";

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
  const dispatch = useDispatch();

  const formDetails = useSelector(selectForm);

  const [tab, setTab] = useState(0);

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
            (item: FormQuestion) => item.questionSection === 1
          )
        );
        setPartTwoQuestions(
          preInterventionQuestions.filter(
            (item: FormQuestion) => item.questionSection === 2
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchPersonalDetailsQuestions();
    fetchPreInterventionsQuestions();
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleQuestionSoftDelete = async (id: number, orderId: number) => {
    const response: QuestionResponse = await studentFormInfoItemSoftDelete(id);

    const newQuestionArr = [...personalDetailsQuestions];

    for (let i = orderId; i < newQuestionArr.length; i++) {
      newQuestionArr[i].positionOrderId--;
    }

    newQuestionArr[response.positionOrderId - 1].isDelete = true;

    await studentFormInfoItemUpdateBulk(newQuestionArr);

    const updatedQuestionsArr = newQuestionArr.filter(
      (item: QuestionResponse) => item.id !== (response as QuestionResponse).id
    );

    setPersonalDetailsQuestions(updatedQuestionsArr);
  };

  // function to update the state of this(parent) component
  const handlePersonalDetailsQuestionUpdate = async (
    question: QuestionResponse
  ) => {
    setPersonalDetailsQuestions((prevQuestions) => {
      const updatedQuestionsArr = [...prevQuestions];

      const index = updatedQuestionsArr.findIndex((q) => q.id === question.id);

      if (index !== -1) {
        updatedQuestionsArr[index] = question;
      } else {
        console.error(`Question with id ${question.id} not found`);
      }

      return updatedQuestionsArr;
    });
  };

  const handlePreInterventionQuestionUpdate = async (
    question: FormQuestion
  ) => {
    setPartOneQuestions((prevQuestions) => {
      const updatedQuestionsArr = [...prevQuestions];

      const index = updatedQuestionsArr.findIndex((q) => q.id === question.id);

      if (index !== -1) {
        updatedQuestionsArr[index] = question;
      } else {
        console.error(`Question with id ${question.id} not found`);
      }

      return updatedQuestionsArr;
    });
  };

  const handleUpdateAllQuestions = async () => {
    try {
      const updatedQuestions = personalDetailsQuestions.map((question) => {
        const { isDelete, isNewlyAdded, ...updatedQuestion } = question;
        return updatedQuestion;
      });

      const response = await studentFormInfoItemUpdateBulk(updatedQuestions);
      setPersonalDetailsQuestions(response);
      dispatch(resetForm());
    } catch (error) {
      console.error("Error updating questions:", error);
    }
  };

  const handleAddNewQuestion = () => {
    setDisplayNewQuestion(true);
  };

  const handleNewQuestionDelete = () => {
    setDisplayNewQuestion(false);
    // setNewQuestion(initialNewQuestionContent);
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
      tab === 1 ? partOneQuestions.length + 1 : partTwoQuestions.length + 1;

    const newQuestion: FormQuestion = {
      questionText: questionText,
      positionOrderId: newPositionOrderId,
      minValue: 1,
      maxValue: 6,
      isDelete: false,
      isNewlyAdded: true,
      questionSetId: 1,
      questionSection: tab,
    };

    const response = await postPreInterventionQuestions(newQuestion);

    const updatedQuestionsArr = tab === 1 ? partOneQuestions : partTwoQuestions;
    updatedQuestionsArr?.push(response);
    tab === 1
      ? setPartOneQuestions(updatedQuestionsArr)
      : setPartTwoQuestions(updatedQuestionsArr);

    setDisplayNewQuestion(false);
  };

  // Function to handle moving an item up in the array
  const moveItemUp = (
    orderId: number | undefined,
    questionnaireType: boolean,
    sectionType?: number
  ) => {
    if (!orderId) return;
    if (orderId <= 1) return; // Already at the top, can't move up
    if (!questionnaireType) {
      const newQuestionArr = [...personalDetailsQuestions];
      newQuestionArr[orderId - 1].positionOrderId = orderId - 1;
      newQuestionArr[orderId - 2].positionOrderId = orderId;

      setPersonalDetailsQuestions(newQuestionArr);
    } else {
      if (sectionType === 0) {
        const newQuestionArr = [...partOneQuestions];
        newQuestionArr[orderId - 1].positionOrderId = orderId - 1;
        newQuestionArr[orderId - 2].positionOrderId = orderId;

        setPartOneQuestions(newQuestionArr);
      } else if ((sectionType = 1)) {
        const newQuestionArr = [...partTwoQuestions];
        newQuestionArr[orderId - 1].positionOrderId = orderId - 1;
        newQuestionArr[orderId - 2].positionOrderId = orderId;

        setPartTwoQuestions(newQuestionArr);
      }
    }
    dispatch(setFormModified());
  };

  // Function to handle moving an item down in the array
  const moveItemDown = (
    orderId: number | undefined,
    questionnaireType: boolean,
    sectionType?: number
  ) => {
    if (!orderId) return;
    if (orderId >= personalDetailsQuestions.length) return; // Already at the bottom, can't move down
    if (!questionnaireType) {
      const newQuestionArr = [...personalDetailsQuestions];
      newQuestionArr[orderId - 1].positionOrderId = orderId + 1;
      newQuestionArr[orderId].positionOrderId = orderId;

      setPersonalDetailsQuestions(newQuestionArr);
    } else {
      if (sectionType === 0) {
        const newQuestionArr = [...partOneQuestions];
        newQuestionArr[orderId - 1].positionOrderId = orderId + 1;
        newQuestionArr[orderId].positionOrderId = orderId;

        setPartOneQuestions(newQuestionArr);
      } else if ((sectionType = 1)) {
        const newQuestionArr = [...partTwoQuestions];
        newQuestionArr[orderId - 1].positionOrderId = orderId + 1;
        newQuestionArr[orderId].positionOrderId = orderId;

        setPartTwoQuestions(newQuestionArr);
      }
    }
    // const newQuestionArr = [...personalDetailsQuestions];
    // newQuestionArr[orderId - 1].positionOrderId = orderId + 1;
    // newQuestionArr[orderId].positionOrderId = orderId;

    // setPersonalDetailsQuestions(newQuestionArr);
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
        onClick={handleUpdateAllQuestions}
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
                  handleQuestionSoftDelete={handleQuestionSoftDelete}
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
                  handleQuestionSoftDelete={handleQuestionSoftDelete}
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
                  handleQuestionSoftDelete={handleQuestionSoftDelete}
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
          {renderTabContent(tab)}
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
