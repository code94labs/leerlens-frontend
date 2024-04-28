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
import { useState } from "react";
import { deleteStudentResponseById } from "../../services/response.service";

const customStyles = {
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
  filteredStudentResponses: StudentResponse[];
  setFilteredStudentResponses: any;
};

const ResponseAccordion = (props: Props) => {
  const { response, filteredStudentResponses, setFilteredStudentResponses } =
    props;

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditResponse = (event: any) => {
    event.stopPropagation();
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
        return prev.filter((stdResponse: StudentResponse) => stdResponse.id !== response.id);
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

      {snackbar}
    </>
  );
};

export default ResponseAccordion;
