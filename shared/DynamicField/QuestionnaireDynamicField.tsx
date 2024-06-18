import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
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
import FormControl from "@mui/material/FormControl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";

import { setFormModified } from "../../redux/slices/formSlice";

import { champBlackFontFamily } from "../typography";

import DynamicDropdown from "../DynamicDropdown";

import {
  FieldType,
  SentimentQuestionType,
  SummaryTypes,
} from "../../utils/enum";
import {
  DropDownOptions,
  FormQuestion,
  QuestionResponse,
} from "../../utils/types";
import { sentimentTypes, summaryTypes } from "../../utils/constant";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

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
  moveItemUp: (orderId: number | undefined, questionnaireType: boolean) => void;
  moveItemDown: (
    orderId: number | undefined,
    questionnaireType: boolean
  ) => void;
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
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSummaryTypes, setSelectedSummaryTypes] = useState<number[]>(
    question?.summaryTypes ?? []
  );
  const [selectedSentimentTypes, setSelectedSentimentTypes] = useState<number>(
    question?.sentiment
      ? SentimentQuestionType.Positive
      : SentimentQuestionType.Negative
  );

  const handleChange = (
    event: SelectChangeEvent<typeof selectedSummaryTypes>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSummaryTypes(
      // On autofill we get a stringified value.
      typeof value === "string"
        ? value.split(",").map((item) => Number(item))
        : value
    );
  };

  const onHandleSentimentUpdate = (event: any) => {
    setSelectedSentimentTypes(event.target.value);
  }

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
        newQuestion.summaryTypes = selectedSummaryTypes;

        handleQuestionUpdate(newQuestion);
      }
    };

    handleSaveChanges();
  }, [question, formik.values.questionText, selectedSummaryTypes]);

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
              onClick={() => moveItemDown(question?.positionOrderId, true)}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Move the question up the order">
            <IconButton
              sx={customStyles.button}
              onClick={() => moveItemUp(question?.positionOrderId, true)}
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

      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <FormControl sx={{ width: 400 }}>
          <InputLabel>Select Summary Type</InputLabel>
          <Select
            label="Select Summary Type"
            id="summary-type-select"
            multiple
            value={selectedSummaryTypes}
            onChange={handleChange}
            input={<OutlinedInput id="summary-type-select" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      summaryTypes.find((item: any) => item.id === value)
                        ?.label || ""
                    }
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {summaryTypes.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
                // style={getStyles(item.label, selectedSummaryTypes, theme)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 150, ml: 2 }}>
          <InputLabel>
            Sentiment Type
            <span style={customStyles.dropdownAsterisk}> * </span>
          </InputLabel>

          <Select defaultValue={selectedSentimentTypes} onChange={onHandleSentimentUpdate}>
            {sentimentTypes.map((sentiment) => (
              <MenuItem value={sentiment.id}>{sentiment.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
