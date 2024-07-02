import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

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
import Switch, { SwitchProps } from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

import { champBlackFontFamily } from "../typography";

import DynamicDropdown from "../DynamicDropdown";

import {
  FieldType,
  QuestionSetType,
  SentimentQuestionType,
} from "../../utils/enum";
import { DropDownOptions, QuestionResponse } from "../../utils/types";
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

// function getStyles(
//   name: string,
//   summaryTypes: readonly number[],
//   theme: Theme
// ) {
//   return {
//     fontWeight:
//       summaryTypes.indexOf(name) === -1
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
  handleNewQuestionDelete: () => void;
  handleNewQuestionSave: (props: {
    fieldType: FieldType;
    questionText: string;
    questionSetType: QuestionSetType;
  }) => void;
};

const AddNewEvaluationField = (props: Props) => {
  const { handleNewQuestionDelete, handleNewQuestionSave } = props;

  const [questionType, setQuestionType] = useState<FieldType>(
    FieldType.Scale1to6
  );

  const [onlySeasonalSchoolSelected, setOnlySeasonalSchoolSelected] =
    useState<boolean>(false);

  const handleSeasonalSchoolSelectionToggle = () => {
    setOnlySeasonalSchoolSelected((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      questionText: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // setDisplayAddNewOption(false);
      values.questionText && handleSaveClick(values.questionText);
      resetForm();
    },
  });

  const handleChangeQuestionType = (event: SelectChangeEvent) => {
    setQuestionType(parseInt(event.target.value));
  };

  const handleSaveClick = (questionText: string) => {
    handleNewQuestionSave &&
      handleNewQuestionSave({
        fieldType: questionType,
        questionText,
        questionSetType: onlySeasonalSchoolSelected
          ? QuestionSetType.onlySeasonalSchools
          : QuestionSetType.allSchools,
      });
  };

  const buttons = (
    <Stack direction="row" justifyContent="end" my={2} gap={2}>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        sx={customStyles.saveButton}
      >
        Save
      </Button>
      <Button onClick={handleNewQuestionDelete} sx={customStyles.deleteButton}>
        Delete
      </Button>
    </Stack>
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
          Add New Question
        </Typography>
      </Stack>

      <Stack flexDirection="row" mt={1}>
        <FormControl sx={customStyles.dropdown}>
          <InputLabel id="demo-simple-select-label">
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
          label="Type Question"
          required
          type="text"
          id="questionText"
          name="questionText"
          value={formik.values.questionText}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.questionText && Boolean(formik.errors.questionText)
          }
          sx={{ ...customStyles.textField, flex: 0.75 }}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
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

      {buttons}
    </>
  );

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {questionnaireField}
    </Stack>
  );
};

export default AddNewEvaluationField;
