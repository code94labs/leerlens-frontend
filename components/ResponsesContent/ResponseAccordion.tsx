import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  Alert,
  Box,
  Button,
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
  Input,
  InputAdornment,
  InputLabel,
  ListSubheader,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DyanmicListHeader from "./DyanmicListHeader";
import DyanmicListContent from "./DyanmicListContent";
import {
  StudentDetailsAnswer,
  StudentResponse,
  UpdateQuestionResponse,
  UpdateStudentResponse,
} from "../../utils/types";
import {
  FieldType,
  QuestionnaireSection,
  SectionType,
  evaluationTypesTitles,
} from "../../utils/enum";
import { formatTimeStamp } from "../../utils/helper";
import { Fragment, useEffect, useState } from "react";
import {
  deleteStudentResponseById,
  updateStudentResponse,
} from "../../services/response.service";
import { champBlackFontFamily } from "../../shared/typography";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgressWithLabel";
import { CustomStepper } from "../../shared/Stepper/Stepper";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";

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
};

type Props = {
  response: StudentResponse;
  setFilteredStudentResponses: any;
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
  const { response: studentResponse, setFilteredStudentResponses } = props;

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      await deleteStudentResponseById(studentResponse.id);

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

  const totalSteps = () => {
    return generalSteps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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

  const personalDetailsForm = (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {studentResponse &&
        studentResponse.studentDetails.map((item: StudentDetailsAnswer) => (
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

                  case FieldType.TextArea:
                    return (
                      <>
                        <Input
                          aria-label={item.questionTitle}
                          multiline
                          placeholder={item.questionTitle}
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
                      </>
                    );

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
                          handleInputChange(item.questionId, event.target.value)
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
            steps={generalSteps}
            completed={completed}
            handleStep={handleStep}
          />

          <Divider sx={{ py: 3, mb: 2 }} />

          <Box sx={{ my: 2 }}>
            <Fragment>
              <Box sx={customStyles.formBox}>{personalDetailsForm}</Box>

              <Stack pt={2} mb={-3} flexDirection="row">
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={closeEditDialog}
                  disabled={isLoading}
                  sx={customStyles.secondaryButton}
                >
                  Cancel
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />

                <Button
                  variant="outlined"
                  onClick={handleUpdate}
                  sx={customStyles.primaryButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
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
      <Typography sx={{ width: 200 }}>
        {studentResponse.createdAt &&
          formatTimeStamp(new Date(studentResponse.createdAt).toDateString())}
      </Typography>

      <Typography sx={{ flex: 1 }}>
        {evaluationTypesTitles[studentResponse.formType]}
      </Typography>

      <Box>
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
      <DyanmicListHeader title="Personal details" subTitle="Answers" />

      <Stack>
        {studentResponse.studentDetails
          .filter((item) => item.sectionType === SectionType.PersonalDetails)
          .map((studentInfo) => (
            <DyanmicListContent
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
      <DyanmicListHeader title="Question | Part 01" subTitle="Answers" />

      <Stack>
        {studentResponse.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartOne
          )
          .map((question) => (
            <DyanmicListContent
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
      <DyanmicListHeader title="Question | Part 02" subTitle="Answers" />

      <Stack>
        {studentResponse.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartTwo
          )
          .map((question, index) => (
            <DyanmicListContent
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
      <DyanmicListHeader title="Program and Supervisor" subTitle="Answers" />

      <Stack>
        {studentResponse.studentDetails
          .filter(
            (item) => item.sectionType === SectionType.ProgramAndSupervisor
          )
          .map((studentInfo) => (
            <DyanmicListContent
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
      <DyanmicListHeader title="Final" subTitle="Answers" />

      <Stack>
        {studentResponse.studentDetails
          .filter((item) => item.sectionType === SectionType.Final)
          .map((studentInfo) => (
            <DyanmicListContent
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
