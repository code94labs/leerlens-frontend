import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { champBlackFontFamily } from "../typography";
import { FieldType } from "../../utils/enum";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DynamicDropdown from "../DynamicDropdown";
import { DropDownOptions } from "../../utils/types";

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
  dragDropButton: {
    backgroundColor: "#A879FF",
    color: "white",
    p: 0.5,
    ml: 0.5,
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

type Props = {
  title: string;
  label: string;
  fieldType: FieldType;
  questionText?: string;
  dropdownOptions?: DropDownOptions[];
  isQuestionnaireType?: boolean;
  isNewQuestionType?: boolean;
  handleNewQuestionDelete?: () => void;
  handleNewQuestionSave?: (props: {
    fieldType: FieldType;
    questionText: string;
    dropdownOptions: DropDownOptions[];
  }) => void;
};

const DynamicField = (props: Props) => {
  const {
    title,
    label,
    fieldType,
    questionText,
    dropdownOptions,
    isQuestionnaireType,
    isNewQuestionType,
    handleNewQuestionDelete,
    handleNewQuestionSave,
  } = props;

  const [questionType, setQuestionType] = useState(fieldType);

  const [qText, setQText] = useState<string | undefined>(questionText);

  const handleChangeQuestionType = (event: SelectChangeEvent) => {
    setQuestionType(parseInt(event.target.value));
  };

  const metaDataField = (
    <>
      <Typography
        my={1}
        fontSize={20}
        fontFamily={champBlackFontFamily}
        textTransform="uppercase"
      >
        {title}
      </Typography>

      <TextField
        variant="outlined"
        label={label}
        required
        type="text"
        multiline={fieldType === FieldType.TextArea}
        rows={4}
        // placeholder="abc@gmail.com"
        // disabled={isLoading}
        // value={qText}
        // onChange={(
        //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        // ) => setQText(e.target.value)}
        sx={customStyles.textField}
      />
    </>
  );

  const buttons = (
    <Stack direction="row" justifyContent="end" my={2} gap={2}>
      <Button
        onClick={() =>
          handleNewQuestionSave &&
          handleNewQuestionSave({
            fieldType: questionType,
            questionText: qText ? qText : "",
            dropdownOptions: [],
          })
        }
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
          {title}
        </Typography>

        <Box>
          <IconButton sx={customStyles.dragDropButton}>
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>

          <IconButton sx={customStyles.dragDropButton}>
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
        </Box>
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
          label={label}
          required
          type="text"
          // placeholder="abc@gmail.com"
          // disabled={isLoading}
          value={qText}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setQText(e.target.value)}
          sx={{ ...customStyles.textField, flex: 0.75 }}
        />
      </Stack>

      {questionType === FieldType.DropDown && dropdownOptions && (
        <DynamicDropdown dropDownOptions={dropdownOptions} />
      )}

      {isNewQuestionType && buttons}
    </>
  );

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {isQuestionnaireType ? questionnaireField : metaDataField}
    </Stack>
  );
};

export default DynamicField;
