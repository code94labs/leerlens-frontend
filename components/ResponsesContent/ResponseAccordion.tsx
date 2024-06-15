import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DynamicListHeader from "./DynamicListHeader";
import DynamicListContent from "./DynamicListContent";
import {
  StudentDetailsAnswer,
  StudentResponse,
  UpdateQuestionResponse,
  UpdateStudentResponse,
} from "../../utils/types";
import {
  FieldType,
  FormEvaluation,
  QuestionnaireSection,
  SectionType,
  evaluationTypesTitles,
} from "../../utils/enum";
import { formContentFiltering, formatTimeStamp } from "../../utils/helper";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  deleteStudentResponseById,
  updateStudentResponse,
} from "../../services/response.service";
import { champBlackFontFamily } from "../../shared/typography";
import { CustomStepper } from "../../shared/Stepper/Stepper";

const customStyles = {
  mainBox: {
    border: "1px #E6E6E6 solid",
    p: 5,
    borderRadius: 2,
  },
  stack: {
    width: {
      md: "90%",
    },
    maxWidth: 1200,
    mx: {
      xs: 2,
      md: "auto",
    },
    mb: {
      xs: 0,
      md: 20,
    },
  },
  titleBox: {
    py: 2,
  },
  title: {
    fontWeight: {
      xs: 900,
      md: 1000,
    },
    mb: 1,
    textTransform: "uppercase",
    fontFamily: champBlackFontFamily,
    color: "#1A1A1A",
  },
  body: {
    mb: 1,
    fontsize: {
      xs: 13,
      md: 16,
    },
  },
  formBox: {
    mb: 1,
    py: 1,
  },
  selectStack: {
    flexDirection: {
      xs: "column",
      md: "row",
    },
    gap: 1,
    mb: {
      xs: 1,
      md: 4,
    },
    mt: {
      xs: 0,
      md: 2,
    },
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
  secondaryButton: {
    backgroundColor: "white",
    color: "#A879FF",
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
    fontFamily: champBlackFontFamily,
  },
  icon: {
    color: "#1A1A1A",
  },
  accordionSummary: {
    backgroundColor: "white",
  },
  cancelBtn: {
    color: "#E55C55",
    fontWeight: 700,
  },
  deleteBtn: {
    backgroundColor: "#E55C55",
    color: "white",
    fontWeight: 700,
    px: 2,

    ":hover": {
      backgroundColor: "#E55C55",
      color: "white",
    },
  },
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
  checkBox: {
    mr: 2,
  },
};

type Props = {
  showQuestionTypesTab?: boolean;
  response: StudentResponse;
  isSelectAllChecked: boolean;
  setFilteredStudentResponses: Dispatch<SetStateAction<StudentResponse[]>>;
  setSelectedResponseIds: Dispatch<SetStateAction<number[]>>;
};

const generalSteps = [
  "Personal Details",
  "Part 01 Questions",
  "Part 02 Questions",
];

const evaluationSteps = [
  "Personal Details",
  "Part 01 Questions",
  "Part 02 Questions",
  "Program and Supervisor",
  "Final",
];

type StudentAnswerUpdate = {
  responseId: number;
  updates: UpdateQuestionResponse[];
};

const dropdownPaperProp = {
  style: {
    maxHeight: 200,
  },
};

const ResponseAccordion = (props: Props) => {
  const {
    showQuestionTypesTab,
    isSelectAllChecked,
    response: studentResponse,
    setFilteredStudentResponses,
    setSelectedResponseIds,
  } = props;

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [studentAnswerUpdate, setStudentAnswerUpdate] =
    useState<StudentAnswerUpdate>({
      responseId: studentResponse.id,
      updates: [],
    });

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");

  const closeEditDialog = () => {
    setOpenEditDialog(false);
  };

  const isEvaluationForm = () =>
    studentResponse.formType === FormEvaluation.Evaluation;

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditResponse = (event: any) => {
    event.stopPropagation();

    setOpenEditDialog(true);
  };

  const handleDeleteResponse = (event: any) => {
    event.stopPropagation();

    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      setIsLoading(true);

      console.log("Hi there", studentResponse.id);

      // await deleteStudentResponseById(studentResponse.id);

      setNotificationMsg("Successfully deleted student response..");
      setDisplaySnackbarMsg(true);

      handleCloseDeleteDialog();

      setFilteredStudentResponses((prev: StudentResponse[]) => {
        return prev.filter(
          (stdResponse: StudentResponse) =>
            stdResponse.id !== studentResponse.id
        );
      });
    } catch (_) {
      setIsError(true);

      setNotificationMsg("Error when deleting student response...");
      setDisplaySnackbarMsg(true);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = () => {
    return isEvaluationForm() ? evaluationSteps.length : generalSteps.length;
  };

  const handleBack = () => {
    if (activeStep === 0) {
      closeEditDialog();
    } else if (activeStep === 3) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return isEvaluationForm() ? activeStep === totalSteps() - 1 : totalSteps();
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    if (activeStep > 2) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? evaluationSteps.findIndex((_, i) => !(i in completed))
          : activeStep + 1;

      setActiveStep(newActiveStep);

      const newCompleted = completed;
      newCompleted[activeStep] = true;

      setCompleted(newCompleted);
    } else {
      const newCompleted = completed;

      const questionnaireSectionOneIndex = 1;
      const questionnaireSectionTwoIndex = 2;

      newCompleted[questionnaireSectionOneIndex] = true;
      newCompleted[questionnaireSectionTwoIndex] = true;

      setCompleted(newCompleted);
      setActiveStep(3);
    }
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setIsChecked(isChecked);

    if (!isChecked) {
      setSelectedResponseIds((prev: number[]) => {
        return prev.filter((stdId: number) => stdId !== studentResponse.id);
      });
    } else {
      setSelectedResponseIds((prev: number[]) => {
        return [...prev, studentResponse.id];
      });
    }
  };

  const disableExpand = (event: any) => {
    event.stopPropagation();
  };

  const handleUpdate = async () => {
    const requestBody: UpdateStudentResponse = {
      studentDetails: studentAnswerUpdate.updates,
    };

    setIsLoading(true);

    await updateStudentResponse(studentResponse.id, requestBody)
      .then(() => {
        setNotificationMsg("Form Updated Successfully...");

        setDisplaySnackbarMsg(true);

        closeEditDialog();
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when updating the form...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (questionId: number, newValue: string) => {
    setStudentAnswerUpdate((prevUpdate) => {
      const updateIndex = prevUpdate.updates.findIndex(
        (update) => update.questionId === questionId
      );

      if (updateIndex !== -1) {
        return {
          ...prevUpdate,
          updates: [
            ...prevUpdate.updates.slice(0, updateIndex),
            { questionId, answer: newValue },
            ...prevUpdate.updates.slice(updateIndex + 1),
          ],
        };
      } else {
        return {
          ...prevUpdate,
          updates: [...prevUpdate.updates, { questionId, answer: newValue }],
        };
      }
    });
  };

  const deleteResponseDialog = (
    <Dialog
      open={openDeleteDialog}
      keepMounted
      onClose={handleCloseDeleteDialog}
    >
      <DialogTitle>Are you sure?</DialogTitle>

      <DialogContent>
        <DialogContentText color="black">
          The response item will be delete completely, however it can be
          recovered when needed.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCloseDeleteDialog}
          sx={customStyles.cancelBtn}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button
          onClick={handleDeleteConfirmation}
          sx={customStyles.deleteBtn}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: "white" }} />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const formEditContent = (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {studentResponse &&
        studentResponse.studentDetails
          .filter((item) => formContentFiltering(item, activeStep))
          .map((item: StudentDetailsAnswer) => (
            <Grid item xs={12} md={6} key={item.questionId}>
              <FormControl fullWidth required>
                {(() => {
                  switch (item.fieldType) {
                    case FieldType.DropDown:
                      return (
                        <>
                          <InputLabel>{item.questionTitle}</InputLabel>

                          <Select
                            MenuProps={{
                              autoFocus: false,
                              PaperProps: dropdownPaperProp,
                            }}
                            value={item.dropdownTitle}
                            label={item.questionTitle}
                            disabled={true}
                            renderValue={() => item.dropdownTitle}
                          />
                        </>
                      );

                    case FieldType.Scale1to10:
                      return;

                    case FieldType.Scale1to6:
                      return;

                    // case FieldType.TextArea:
                    //   return (
                    //     <>
                    //       <Input
                    //         aria-label={item.questionTitle}
                    //         multiline
                    //         placeholder={item.questionTitle}
                    //         disabled={isLoading}
                    //         value={
                    //           studentAnswerUpdate.updates.find(
                    //             (item_) => item_.questionId === item.questionId
                    //           )?.answer
                    //         }
                    //         onChange={(event) =>
                    //           handleInputChange(
                    //             item.questionId,
                    //             event.target.value
                    //           )
                    //         }
                    //       />
                    //     </>
                    //   );

                    default:
                      return (
                        <TextField
                          label={item.questionTitle}
                          disabled={isLoading}
                          value={
                            studentAnswerUpdate.updates.find(
                              (item_) => item_.questionId === item.questionId
                            )?.answer
                          }
                          onChange={(event) =>
                            handleInputChange(
                              item.questionId,
                              event.target.value
                            )
                          }
                        />
                      );
                  }
                })()}
              </FormControl>
            </Grid>
          ))}
    </Grid>
  );

  const editResponseDialog = (
    <Dialog
      open={openEditDialog}
      keepMounted
      onClose={closeEditDialog}
      maxWidth={maxWidth}
    >
      <DialogContent>
        <Box sx={customStyles.titleBox}>
          <Typography variant="h5" sx={customStyles.title}>
            {evaluationTypesTitles[studentResponse.formType]} Measurement
          </Typography>

          <Typography variant="h6" sx={customStyles.body}>
            Here are some general questions about you?
          </Typography>
        </Box>

        <Box sx={customStyles.mainBox}>
          <CustomStepper
            activeStep={activeStep}
            steps={isEvaluationForm() ? evaluationSteps : generalSteps}
            completed={completed}
            handleStep={handleStep}
          />

          <Divider sx={{ py: 3, mb: 2 }} />

          <Box sx={{ my: 2 }}>
            <Fragment>
              <Box sx={customStyles.formBox}>{formEditContent}</Box>

              <Stack pt={2} mb={-3} flexDirection="row">
                {activeStep === 0 ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleBack}
                    sx={customStyles.secondaryButton}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleBack}
                    sx={customStyles.secondaryButton}
                  >
                    Back
                  </Button>
                )}

                <Box sx={{ flex: "1 1 auto" }} />

                {isLastStep() ? (
                  <Button
                    variant="outlined"
                    onClick={handleUpdate}
                    sx={customStyles.primaryButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={customStyles.primaryButton}
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </Fragment>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
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

  const accordionSummary = (
    <AccordionSummary sx={customStyles.accordionSummary}>
      <Checkbox
        onChange={handleCheckBox}
        onClick={disableExpand}
        sx={customStyles.checkBox}
        checked={isChecked}
      />

      <Typography sx={{ width: "14%", pt: 1 }}>
        {studentResponse.createdAt &&
          formatTimeStamp(new Date(studentResponse.createdAt).toDateString())}
      </Typography>

      {showQuestionTypesTab && (
        <Typography sx={{ pt: 1, width: "14%" }}>
          {evaluationTypesTitles[studentResponse.formType]}
        </Typography>
      )}

      {studentResponse.studentDetails.slice(0, 4).map((studentInfo) => (
        <Typography sx={{ pt: 1, width: "14%" }}>
          {studentInfo.fieldType === FieldType.DropDown
            ? studentInfo.dropdownTitle
            : studentInfo.answer}
        </Typography>
      ))}

      <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
        <IconButton>
          <KeyboardArrowDownRoundedIcon sx={customStyles.icon} />
        </IconButton>

        <IconButton onClick={handleEditResponse}>
          <BorderColorRoundedIcon sx={customStyles.icon} />
        </IconButton>

        <IconButton onClick={handleDeleteResponse}>
          <DeleteOutlinedIcon sx={customStyles.icon} />
        </IconButton>
      </Box>
    </AccordionSummary>
  );

  const personalDetails = (
    <Stack mt={-3}>
      <DynamicListHeader titles={["Personal details", "Answers"]}/>

      <Stack>
        {studentResponse.studentDetails
          .filter((item) => item.sectionType === SectionType.PersonalDetails)
          .map((studentInfo) => (
            <DynamicListContent
              key={studentInfo.questionId}
              question={studentInfo.questionTitle}
              answer={
                studentInfo.fieldType === FieldType.DropDown
                  ? studentInfo.dropdownTitle
                  : studentInfo.answer
              }
            />
          ))}
      </Stack>
    </Stack>
  );

  const questionSetOne = (
    <Stack mt={-3}>
      <DynamicListHeader titles={["Question | Part 01", "Answers"]} />

      <Stack>
        {studentResponse.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartOne
          )
          .map((question) => (
            <DynamicListContent
              key={question.questionId}
              question={`${question.questionId}. ${question.questionTitle}`}
              answer={question.answerText}
            />
          ))}
      </Stack>
    </Stack>
  );

  const questionSetTwo = (
    <Stack mt={-3}>
      <DynamicListHeader titles={["Question | Part 02", "Answers"]} />

      <Stack>
        {studentResponse.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartTwo
          )
          .map((question, index) => (
            <DynamicListContent
              key={index}
              question={`${question.questionId}. ${question.questionTitle}`}
              answer={question.answerText}
            />
          ))}
      </Stack>
    </Stack>
  );

  const supervisorEvaluation = (
    <Stack mt={-3}>
      <DynamicListHeader titles={["Program and Supervisor", "Answers"]} />

      <Stack>
        {studentResponse.studentDetails
          .filter(
            (item) => item.sectionType === SectionType.ProgramAndSupervisor
          )
          .map((studentInfo) => (
            <DynamicListContent
              key={studentInfo.questionId}
              question={studentInfo.questionTitle}
              answer={
                studentInfo.fieldType === FieldType.DropDown
                  ? studentInfo.dropdownTitle
                  : studentInfo.answer
              }
            />
          ))}
      </Stack>
    </Stack>
  );

  const final = (
    <Stack mt={-3}>
      <DynamicListHeader titles={["Final", "Answers"]} />

      <Stack>
        {studentResponse.studentDetails
          .filter((item) => item.sectionType === SectionType.Final)
          .map((studentInfo) => (
            <DynamicListContent
              key={studentInfo.questionId}
              question={studentInfo.questionTitle}
              answer={studentInfo.answer}
            />
          ))}
      </Stack>
    </Stack>
  );

  const accordionContent = (
    <AccordionDetails>
      {personalDetails}

      {questionSetOne}

      {questionSetTwo}

      {supervisorEvaluation}

      {final}
    </AccordionDetails>
  );

  const initialStudentAnswerUpdates = (): UpdateQuestionResponse[] => {
    return studentResponse.studentDetails
      .filter(
        (item) =>
          item.fieldType === FieldType.TextArea ||
          item.fieldType === FieldType.TextField
      )
      .map((item) => ({
        questionId: item.questionId,
        answer: item.answer,
      }));
  };

  useEffect(() => {
    setStudentAnswerUpdate({
      responseId: studentResponse.id,
      updates: initialStudentAnswerUpdates(),
    });
  }, [studentResponse]);

  useEffect(() => {
    setIsChecked(isSelectAllChecked);
  }, [isSelectAllChecked]);

  return (
    <>
      <Accordion>
        {accordionSummary}

        {accordionContent}
      </Accordion>

      {deleteResponseDialog}

      {editResponseDialog}

      {snackbar}
    </>
  );
};

export default ResponseAccordion;
