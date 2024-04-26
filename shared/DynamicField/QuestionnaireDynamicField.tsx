import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";

import { setFormModified } from "../../redux/slices/formSlice";

import { champBlackFontFamily } from "../typography";

import DynamicDropdown from "../DynamicDropdown";

import { FieldType } from "../../utils/enum";
import {
  DropDownOptions,
  FormQuestion,
  QuestionResponse,
} from "../../utils/types";

const customStyles = {
  textField: {
    mb: 2,
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey !important",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "grey",
    },
  },
  dropdown: {
    mb: 2,
    flex: 0.25,
    mr: 2,
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey !important",
    },
    "& .MuiInputBase-input": {
      fontWeight: 800,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "grey",
    },
  },
  dropdownAsterisk: {
    color: "red",
  },
  stack: {
    backgroundColor: "white",
    borderRadius: 4,
    height: "min-content",
  },
  button: {
    backgroundColor: "#A879FF",
    color: "white",
    p: 0.5,
    ml: 0.5,
    "&:hover": {
      backgroundColor: "#C4B0EB",
    },
  },
  deleteButton: {
    backgroundColor: "white",
    color: "#E55C55",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    border: "2px #E55C55 solid",
    p: 1.3,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontFamily: champBlackFontFamily,
  },
  saveButton: {
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
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: {
      xs: 1,
      md: 3,
    },
    py: {
      xs: 1,
      md: 3,
    },
    width: {
      xs: "90%",
      md: 514,
    },
    maxWidth: {
      xs: 360,
      md: 514,
    },
    boxSizing: "border-box",
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: {
      xs: 18,
      md: 22,
    },
    mb: 2,
    // textTransform: "uppercase",
  },
  modalStack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
    width: {
      xs: "100%",
      md: 290,
    },
    gap: 1,
  },
  dialogBtnStack: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "space-between",
    width: "100%",
    mt: {
      xs: 2,
      md: 4,
    },
    gap: {
      xs: 1,
      md: 2,
    },
  },
  primaryBtn: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: 900,
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
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: 900,
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
  },
};

const validationSchema = yup.object({
  questionText: yup.string().required("Question text is required"),
});

type Props = {
  title?: string;
  label?: string;
  question?: FormQuestion;
  handleQuestionUpdate?: (question: FormQuestion) => void;
  handleQuestionSoftDelete?: (id: number, orderId: number) => void;
  moveItemUp?: (index: number | undefined) => void;
  moveItemDown?: (index: number | undefined) => void;
};

const QuestionnaireDynamicField = (props: Props) => {
  const {
    title,
    label,
    question,
    handleQuestionUpdate,
    handleQuestionSoftDelete,
    moveItemUp,
    moveItemDown,
  } = props;

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);

  const handleQuestionDeleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      questionText: question?.questionText ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // handleSaveChanges(values.questionText);
    },
  });

  useEffect(() => {
    const handleSaveChanges = () => {
      if (question && handleQuestionUpdate) {
        const newQuestion: FormQuestion = question;
        newQuestion.questionText = formik.values.questionText;

        handleQuestionUpdate(newQuestion);
      }
    };

    handleSaveChanges();
  }, [question, formik.values.questionText]);

  // const handleSaveClick = (questionText: string) => {
  //   handleNewQuestionSave &&
  //     handleNewQuestionSave({
  //       fieldType: questionType,
  //       questionText,
  //       dropdownOptions: options ?? [],
  //     });
  // };

  const deleteQuestionDialogModel = (
    <Box sx={customStyles.modalContent}>
      <Typography variant="h6" sx={customStyles.modalTitle}>
        Delete Question
      </Typography>

      <Typography variant="body1">
        Are you sure want to delete question no. {question?.positionOrderId} ?
      </Typography>

      <Stack sx={customStyles.dialogBtnStack}>
        <Button
          variant="contained"
          sx={{
            ...customStyles.secondaryBtn,
            order: {
              xs: 2,
              md: 1,
            },
          }}
          fullWidth
          onClick={handleClose}
          disableElevation
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            ...customStyles.primaryBtn,
            order: {
              xs: 1,
              md: 2,
            },
          }}
          fullWidth
          onClick={() => {
            handleQuestionSoftDelete &&
              question?.id &&
              handleQuestionSoftDelete(question?.id, question.positionOrderId);
            setOpenDialog(false);
          }}
          disableElevation
        >
          Delete Question
        </Button>
      </Stack>
    </Box>
  );

  const questionnaireField = (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          my={1}
          fontSize={20}
          fontFamily={champBlackFontFamily}
          textTransform="uppercase"
        >
          {title ? title : `Question : ${question?.positionOrderId}`}
        </Typography>

        <Box>
          {question?.isNewlyAdded && (
            <Tooltip title="Delete Question">
              <IconButton
                sx={customStyles.button}
                onClick={handleQuestionDeleteDialogOpen}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Move the question down the order">
            <IconButton
              sx={customStyles.button}
              onClick={() =>
                moveItemDown && moveItemDown(question?.positionOrderId)
              }
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Move the question up the order">
            <IconButton
              sx={customStyles.button}
              onClick={() =>
                moveItemUp && moveItemUp(question?.positionOrderId)
              }
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>

      <Modal
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {deleteQuestionDialogModel}
      </Modal>

      <Stack flexDirection="row" mt={1}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>
            Question Type
            <span style={customStyles.dropdownAsterisk}> * </span>
          </InputLabel>

          <Select
            label="Select Question Type"
            autoWidth
            disabled
            defaultValue={FieldType.Scale1to6.toString()}
          >
            <MenuItem value={FieldType.Scale1to6.toString()}>
              Scale 1 to 6
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          label={label ? label : "Type Question"}
          required
          type="text"
          // placeholder="abc@gmail.com"
          // disabled={isLoading}
          id="questionText"
          name="questionText"
          value={formik.values.questionText}
          onChange={(e) => {
            formik.handleChange(e);
            dispatch(setFormModified());
          }}
          onBlur={formik.handleBlur}
          error={
            formik.touched.questionText && Boolean(formik.errors.questionText)
          }
          sx={{ ...customStyles.textField, flex: 0.75 }}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mt={formik.errors.questionText ? -2 : 0}
      >
        {formik.touched.questionText && (
          <FormHelperText sx={{ color: "red" }}>
            {formik.errors.questionText}
          </FormHelperText>
        )}
      </Stack>
    </>
  );

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {questionnaireField}
    </Stack>
  );
};

export default QuestionnaireDynamicField;
