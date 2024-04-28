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
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DyanmicListHeader from "./DyanmicListHeader";
import DyanmicListContent from "./DyanmicListContent";
import { StudentResponse } from "../../utils/types";
import {
  FieldType,
  QuestionnaireSection,
  evaluationTypesTitles,
} from "../../utils/enum";
import { formatTimeStamp } from "../../utils/helper";
import { Fragment, useState } from "react";
import { deleteStudentResponseById } from "../../services/response.service";
import { champBlackFontFamily } from "../../shared/typography";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgressWithLabel";
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
    py: {
      xs: 2.5,
      md: 4,
    },
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

const ResponseAccordion = (props: Props) => {
  const { response, setFilteredStudentResponses } = props;

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

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

      await deleteStudentResponseById(response.id);

      setNotificationMsg("Successfully deleted student response..");
      setDisplaySnackbarMsg(true);

      handleCloseDeleteDialog();

      setFilteredStudentResponses((prev: StudentResponse[]) => {
        return prev.filter(
          (stdResponse: StudentResponse) => stdResponse.id !== response.id
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

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  // These functions are used to handle the form step changes
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

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? generalSteps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

    const newCompleted = completed;
    newCompleted[activeStep] = true;

    setCompleted(newCompleted);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleUpdate = () => {};

  const editResponseDialog = (
    <Dialog
      open={openEditDialog}
      keepMounted
      onClose={closeEditDialog}
    >
      <DialogContent>
        <Box sx={customStyles.titleBox}>
          <Typography variant="h5" sx={customStyles.title}>
            Pre-Intervention Measurement
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

          {activeStep < 3 && (
            <Box
              sx={{
                width: "100%",
                display: {
                  xs: "flex",
                  md: "none",
                },
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CircularProgressWithLabel
                activeStep={activeStep}
                totalSteps={generalSteps.length}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#1A1A1A", fontSize: 13, fontWeight: 700 }}
                >
                  {generalSteps[activeStep]}
                </Typography>
                {activeStep < 2 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#98989A",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Next : {generalSteps[activeStep + 1]}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          <Box sx={{ my: 2 }}>
            {allStepsCompleted() ? (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                {/* <Box sx={customStyles.formBox}>{personalDetailsForm}</Box> */}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep === 0 ? (
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => {}}
                      sx={customStyles.secondaryButton}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={() => {}}
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
                </Box>
              </Fragment>
            )}
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
        {response.createdAt &&
          formatTimeStamp(new Date(response.createdAt).toDateString())}
      </Typography>

      <Typography sx={{ flex: 1 }}>
        {evaluationTypesTitles[response.formType]}
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
        {response.studentDetails.map((studentInfo) => (
          <DyanmicListContent
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
        {response.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartOne
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

  const questionSetTwo = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Question | Part 02" subTitle="Answers" />

      <Stack>
        {response.responses
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

  const supervisorEvaluation = <></>;

  const final = <></>;

  const accordionContent = (
    <AccordionDetails>
      {personalDetails}

      {questionSetOne}

      {questionSetTwo}

      {supervisorEvaluation}

      {final}
    </AccordionDetails>
  );
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
