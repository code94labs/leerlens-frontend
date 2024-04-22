import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { champBlackFontFamily } from "../typography";

import DynamicDropdown from "../DynamicDropdown";

import { FieldType } from "../../utils/enum";
import { DropDownOptions, QuestionResponse } from "../../utils/types";

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

const validationSchema = yup.object({
  questionText: yup.string().required("Question text is required"),
});

type Props = {
  handleNewQuestionDelete?: () => void;
  handleNewQuestionSave?: (props: {
    fieldType: FieldType;
    questionText: string;
    dropdownOptions: DropDownOptions[];
  }) => void;
};

const AddNewField = (props: Props) => {
  const { handleNewQuestionDelete, handleNewQuestionSave } = props;

  const [questionType, setQuestionType] = useState(FieldType.TextField);

  const [options, setOptions] = useState<DropDownOptions[] | undefined>(
    undefined
  );

  const formik = useFormik({
    initialValues: {
      questionText: undefined,
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
        dropdownOptions: options ?? [],
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
            <MenuItem value={FieldType.TextField.toString()}>Text</MenuItem>

            <MenuItem value={FieldType.Scale1to6.toString()}>
              Scale 1 to 6
            </MenuItem>

            <MenuItem value={FieldType.Scale1to10.toString()}>
              Scale 1 to 10
            </MenuItem>

            <MenuItem value={FieldType.DropDown.toString()}>Drop Down</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          label="Type Question"
          required
          type="text"
          // placeholder="abc@gmail.com"
          // disabled={isLoading}
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

      {questionType === FieldType.DropDown && (
        <DynamicDropdown
          options={options ? options : []}
          setOptions={setOptions}
        />
      )}

      {buttons}
    </>
  );

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {questionnaireField}
    </Stack>
  );
};

export default AddNewField;
