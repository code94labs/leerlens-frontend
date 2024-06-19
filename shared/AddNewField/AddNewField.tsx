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
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";

import { champBlackFontFamily } from "../typography";

import DynamicDropdown from "../DynamicDropdown";

import { FieldType, SentimentQuestionType } from "../../utils/enum";
import { DropDownOptions, QuestionResponse } from "../../utils/types";
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

const validationSchema = yup.object({
  questionText: yup.string().required("Question text is required"),
});

type Props = {
  handleNewQuestionDelete?: () => void;
  handleNewQuestionSave?: (props: {
    fieldType: FieldType;
    questionText: string;
    dropdownOptions: DropDownOptions[];
    summaryTypes: number[];
    sentiment: number;
  }) => void;
  questionnaireType?: boolean;
};

const AddNewField = (props: Props) => {
  const theme = useTheme();

  const { handleNewQuestionDelete, handleNewQuestionSave, questionnaireType } =
    props;

  const [questionType, setQuestionType] = useState(
    questionnaireType ? FieldType.Scale1to6 : FieldType.TextField
  );

  const [options, setOptions] = useState<DropDownOptions[] | undefined>(
    undefined
  );

  const [selectedSummaryTypes, setSelectedSummaryTypes] = useState<number[]>(
    []
  );

  const [selectedSentimentTypes, setSelectedSentimentTypes] = useState<number>(
    SentimentQuestionType.Positive
  );

  const onHandleSentimentUpdate = (event: any) => {
    setSelectedSentimentTypes(event.target.value);
  };

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
        dropdownOptions: options ?? [],
        summaryTypes: selectedSummaryTypes,
        sentiment: selectedSentimentTypes,
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
            disabled={questionnaireType}
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

      {questionnaireType && (
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <FormControl sx={{ width: 400 }}>
            <InputLabel sx={{ backgroundColor: "white", pr: 1 }}>
              Select Summary Type
            </InputLabel>
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

            <Select
              defaultValue={selectedSentimentTypes}
              onChange={onHandleSentimentUpdate}
            >
              {sentimentTypes.map((sentiment) => (
                <MenuItem value={sentiment.id}>{sentiment.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}

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
