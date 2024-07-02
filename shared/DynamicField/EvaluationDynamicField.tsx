import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

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
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

import { setFormModified } from "../../redux/slices/formSlice";

import { champBlackFontFamily } from "../typography";

import {
  FieldType,
  QuestionSetType,
  SentimentQuestionType,
} from "../../utils/enum";
import { EvaluationQuestion, FormQuestion } from "../../utils/types";
import {
  questionSetTypes,
  sentimentTypes,
  summaryTypes,
} from "../../utils/constant";

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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#A879FF",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const validationSchema = yup.object({
  questionText: yup.string().required("Question text is required"),
});

type Props = {
  question: EvaluationQuestion;
  handleQuestionUpdate: (question: EvaluationQuestion) => void;
  handleQuestionSoftDelete: (id: number) => void;
  moveItemUp: (orderId: number | undefined) => void;
  moveItemDown: (orderId: number | undefined) => void;
};

const EvaluationDynamicField = (props: Props) => {
  const {
    question,
    handleQuestionUpdate,
    handleQuestionSoftDelete,
    moveItemUp,
    moveItemDown,
  } = props;

  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [questionType, setQuestionType] = useState<FieldType>(
    question.fieldType
  );
  const [onlySeasonalSchoolSelected, setOnlySeasonalSchoolSelected] =
    useState<boolean>(
      question.questionSetType === QuestionSetType.onlySeasonalSchools
        ? true
        : false
    );

  const handleSeasonalSchoolSelectionToggle = () => {
    setOnlySeasonalSchoolSelected((prev) => !prev);
  };

  const handleQuestionDeleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChangeQuestionType = (event: SelectChangeEvent) => {
    setQuestionType(parseInt(event.target.value));
    dispatch(setFormModified());
  };

  const formik = useFormik({
    initialValues: {
      questionText: question.questionText,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // handleSaveChanges(values.questionText);
    },
  });

  const deleteQuestionDialogModal = (
    <Box sx={customStyles.modalContent}>
      <Typography variant="h6" sx={customStyles.modalTitle}>
        Delete Question
      </Typography>

      <Typography variant="body1">
        Are you sure want to delete question no. {question.positionOrderId} ?
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
            question?.id && handleQuestionSoftDelete(question?.id);
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
          {`Question : ${question.positionOrderId}`}
        </Typography>

        <Box>
          {question.isNewlyAdded && (
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
              onClick={() => moveItemDown(question.positionOrderId)}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Move the question up the order">
            <IconButton
              sx={customStyles.button}
              onClick={() => moveItemUp(question.positionOrderId)}
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
        {deleteQuestionDialogModal}
      </Modal>

      <Stack flexDirection="row" mt={1}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel>
            Select Question Type
            <span style={customStyles.dropdownAsterisk}> * </span>
          </InputLabel>

          <Select
            value={questionType.toString()}
            label="Select Question Type"
            onChange={handleChangeQuestionType}
            autoWidth
          >
            <MenuItem value={FieldType.Scale1to6.toString()}>
              Scale 1 to 6
            </MenuItem>

            <MenuItem value={FieldType.Scale1to10.toString()}>
              Scale 1 to 10
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          label={"Type Question"}
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

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        {/* <FormControl sx={{ width: 150 }}>
          <InputLabel>
            Evaluation form type
            <span style={customStyles.dropdownAsterisk}> * </span>
          </InputLabel>

          <Select
            defaultValue={selectedQuestionSetType}
            onChange={handleQuestionSetTypeUpdate}
          >
            {questionSetTypes.map((set) => (
              <MenuItem value={set.id}>{set.label}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <Switch
          checked={onlySeasonalSchoolSelected}
          onChange={handleSeasonalSchoolSelectionToggle}
          inputProps={{ "aria-label": "controlled" }}
        /> */}
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} />}
          checked={onlySeasonalSchoolSelected}
          onChange={handleSeasonalSchoolSelectionToggle}
          label={
            <InputLabel>
              Only seasonal schools
              {/* <span style={customStyles.dropdownAsterisk}> * </span> */}
            </InputLabel>
          }
          labelPlacement="start"
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

  useEffect(() => {
    const handleSaveChanges = () => {
      const newQuestion: EvaluationQuestion = question;
      newQuestion.questionText = formik.values.questionText;
      newQuestion.fieldType = questionType;
      newQuestion.questionSetType = onlySeasonalSchoolSelected
        ? QuestionSetType.onlySeasonalSchools
        : QuestionSetType.allSchools;

      handleQuestionUpdate(newQuestion);
    };

    handleSaveChanges();
  }, [
    question,
    formik.values.questionText,
    questionType,
    onlySeasonalSchoolSelected,
  ]);

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {questionnaireField}
    </Stack>
  );
};

export default EvaluationDynamicField;
