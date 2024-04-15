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
    mr: 2,
  },
};

type Props = {
  title: string;
  label: string;
  fieldType: FieldType;
  isQuestionnaireType?: boolean;
  isNewQuestionType?: boolean;
};

const DynamicField = (props: Props) => {
  const { title, label, fieldType, isQuestionnaireType, isNewQuestionType } =
    props;

  const [questionType, setQuestionType] = useState(FieldType.TextField);

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
        // value={email}
        // onChange={(
        //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        // ) => setEmail(e.target.value)}
        sx={customStyles.textField}
      />
    </>
  );

  const deleteButton = (
    <Stack flex="row" alignItems="flex-end" my={2}>
      <Button onClick={() => {}} sx={customStyles.deleteButton}>
        Cancel
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
          // value={email}
          // onChange={(
          //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => setEmail(e.target.value)}
          sx={{ ...customStyles.textField, flex: 0.75 }}
        />
      </Stack>

      {isNewQuestionType && deleteButton}
    </>
  );

  return (
    <Stack mx={2} mt={2} px={3} py={1} sx={customStyles.stack}>
      {isQuestionnaireType ? questionnaireField : metaDataField}
    </Stack>
  );
};

export default DynamicField;
