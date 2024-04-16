import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { champBlackFontFamily } from "../typography";

const customStyles = {
  addNewOptionsButton: {
    border: "2px solid #A879FF",
    display: "flex",
    alignItems: "center",
    justifyContents: "center",
    borderRadius: 2,
    gap: "6px",
    padding: "14px 16px 14px 14px",
    "&:hover": {
      backgroundColor: "#F2EEFB",
      border: "2px solid #A879FF",
    },
  },
  addButton: {
    border: "2px solid #A879FF",
    display: "flex",
    alignItems: "center",
    justifyContents: "center",
    borderRadius: 1,
    padding: "10px 14px 10px 14px",
    width: "90px",
    margin: "0 0 0 10px",
    "&:hover": {
      backgroundColor: "#F2EEFB",
      border: "2px solid #A879FF",
    },
  },
  buttonText: {
    fontFamily: champBlackFontFamily,
    fontWeight: 900,
    fontSize: 14,
    lineHeight: "16.8px",
    color: "#A879FF",
  },
  option: {
    // color: "red",
    "& .MuiInputBase-root .Mui-disabled": {
      // color: "red", // (default alpha is 0.38)
    },
  },
};

type Props = {};

const index = (props: Props) => {
  const [options, setOptions] = useState<
    {
      id: number;
      item: string;
      isDelete: boolean;
      newlyAdded: boolean;
    }[]
  >([
    {
      id: 1,
      item: "Aeres Hogeschool Dronten",
      isDelete: false,
      newlyAdded: false,
    },
    {
      id: 2,
      item: "Aeres MBO Almere",
      isDelete: false,
      newlyAdded: false,
    },
    {
      id: 3,
      item: "Aeres MBO Ede",
      isDelete: false,
      newlyAdded: false,
    },
    {
      id: 4,
      item: "Aeres MBO Velp",
      isDelete: false,
      newlyAdded: false,
    },
  ]);
  const [editableOptions, setEditableOptions] = useState<number[]>([]);
  const [AddNewOptionData, setAddNewOptionData] = useState<string | undefined>(
    undefined
  );

  const handleShowAddNewOption = () => setAddNewOptionData(" ");

  const handleAddNewOptionDelete = () => setAddNewOptionData(undefined);

  const handleDeleteOption = (id: number) => {
    const newOptionsArr = options.filter((option) => !(option.id === id));
    setOptions(newOptionsArr);
  };

  const handleEditOption = (id: number) => {
    setEditableOptions([...editableOptions, id]);
  };

  const handleUpdateNewOption = (id: number) => {
    const newEditableOptionsArr = editableOptions.filter(
      (option) => !(option === id)
    );
    setEditableOptions(newEditableOptionsArr);
  };

  const handleOptionChangeById = (id: number, value: string) => {
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          item: value,
        };
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleAddNewOption = () => {
    const maxId = Math.max(...options.map((option) => option.id));
    const newOptionsArr = [...options];
    if (AddNewOptionData) {
      newOptionsArr.unshift({
        id: maxId + 1,
        item: AddNewOptionData,
        isDelete: false,
        newlyAdded: true,
      });
      setOptions(newOptionsArr);
      setAddNewOptionData(undefined);
    }
  };

  return (
    <Container maxWidth="sm">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">School</InputLabel>
        <Select
          MenuProps={{
            autoFocus: false,
            PaperProps: {
              style: {
                maxHeight: 300,
                padding: "8px 0",
              },
            },
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Answers"
        >
          <ListSubheader disableSticky>
            <Button
              variant="outlined"
              startIcon={
                <SvgIcon>
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.167 0.666016H6.83366V7.33268H0.166992V10.666H6.83366V17.3327H10.167V10.666H16.8337V7.33268H10.167V0.666016Z"
                      fill="#A879FF"
                    />
                  </svg>
                </SvgIcon>
              }
              sx={customStyles.addNewOptionsButton}
              onClick={handleShowAddNewOption}
            >
              <Typography sx={customStyles.buttonText}>
                Add new option
              </Typography>
            </Button>
          </ListSubheader>
          {AddNewOptionData && (
            <ListSubheader disableSticky>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="35px"
                marginTop={1}
              >
                <Input
                  id="outlined-basic"
                  value={AddNewOptionData}
                  onChange={(e) => setAddNewOptionData(e.target.value)}
                  size="small"
                  fullWidth
                  disableUnderline
                />
                <Stack direction="row" alignItems="center" gap={1}>
                  <Button
                    variant="outlined"
                    sx={customStyles.addButton}
                    onClick={handleAddNewOption}
                  >
                    <Typography sx={customStyles.buttonText}>Add</Typography>
                  </Button>
                  <IconButton
                    aria-label="delete"
                    onClick={handleAddNewOptionDelete}
                  >
                    <SvgIcon>
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 5.5H14C14 4.96957 13.7893 4.46086 13.4142 4.08579C13.0391 3.71071 12.5304 3.5 12 3.5C11.4696 3.5 10.9609 3.71071 10.5858 4.08579C10.2107 4.46086 10 4.96957 10 5.5ZM8.5 5.5C8.5 5.04037 8.59053 4.58525 8.76642 4.16061C8.94231 3.73597 9.20012 3.35013 9.52513 3.02513C9.85013 2.70012 10.236 2.44231 10.6606 2.26642C11.0852 2.09053 11.5404 2 12 2C12.4596 2 12.9148 2.09053 13.3394 2.26642C13.764 2.44231 14.1499 2.70012 14.4749 3.02513C14.7999 3.35013 15.0577 3.73597 15.2336 4.16061C15.4095 4.58525 15.5 5.04037 15.5 5.5H21.25C21.4489 5.5 21.6397 5.57902 21.7803 5.71967C21.921 5.86032 22 6.05109 22 6.25C22 6.44891 21.921 6.63968 21.7803 6.78033C21.6397 6.92098 21.4489 7 21.25 7H19.93L18.76 19.111C18.6702 20.039 18.238 20.9002 17.5477 21.5268C16.8573 22.1534 15.9583 22.5004 15.026 22.5H8.974C8.04186 22.5001 7.1431 22.153 6.45295 21.5265C5.7628 20.8999 5.33073 20.0388 5.241 19.111L4.07 7H2.75C2.55109 7 2.36032 6.92098 2.21967 6.78033C2.07902 6.63968 2 6.44891 2 6.25C2 6.05109 2.07902 5.86032 2.21967 5.71967C2.36032 5.57902 2.55109 5.5 2.75 5.5H8.5ZM10.5 10.25C10.5 10.0511 10.421 9.86032 10.2803 9.71967C10.1397 9.57902 9.94891 9.5 9.75 9.5C9.55109 9.5 9.36032 9.57902 9.21967 9.71967C9.07902 9.86032 9 10.0511 9 10.25V17.75C9 17.9489 9.07902 18.1397 9.21967 18.2803C9.36032 18.421 9.55109 18.5 9.75 18.5C9.94891 18.5 10.1397 18.421 10.2803 18.2803C10.421 18.1397 10.5 17.9489 10.5 17.75V10.25ZM14.25 9.5C14.4489 9.5 14.6397 9.57902 14.7803 9.71967C14.921 9.86032 15 10.0511 15 10.25V17.75C15 17.9489 14.921 18.1397 14.7803 18.2803C14.6397 18.421 14.4489 18.5 14.25 18.5C14.0511 18.5 13.8603 18.421 13.7197 18.2803C13.579 18.1397 13.5 17.9489 13.5 17.75V10.25C13.5 10.0511 13.579 9.86032 13.7197 9.71967C13.8603 9.57902 14.0511 9.5 14.25 9.5ZM6.734 18.967C6.78794 19.5236 7.04724 20.0403 7.46137 20.4161C7.87549 20.792 8.41475 21.0001 8.974 21H15.026C15.5853 21.0001 16.1245 20.792 16.5386 20.4161C16.9528 20.0403 17.2121 19.5236 17.266 18.967L18.424 7H5.576L6.734 18.967Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </SvgIcon>
                  </IconButton>
                </Stack>
              </Stack>
            </ListSubheader>
          )}
          {options.map((item) => (
            <ListSubheader value={item.id} disableSticky sx={{borderBottom: 1, borderBottomColor: "#E6E6E6"}}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="35px"
                marginTop={1}
              >
                {item.newlyAdded && editableOptions.includes(item.id) ? (
                  <Input
                    id="outlined-basic"
                    value={item.item}
                    onChange={(e) =>
                      handleOptionChangeById(item.id, e.target.value)
                    }
                    // disabled={!item.editable}
                    size="small"
                    fullWidth
                    sx={customStyles.option}
                    disableUnderline
                  />
                ) : (
                  <Typography>{item.item}</Typography>
                )}
                {item.newlyAdded && (
                  <Stack direction="row" alignItems="center" gap={1}>
                    {editableOptions.includes(item.id) ? (
                      <Button
                        variant="outlined"
                        sx={customStyles.addButton}
                        onClick={() => handleUpdateNewOption(item.id)}
                      >
                        <Typography sx={customStyles.buttonText}>
                          save
                        </Typography>
                      </Button>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditOption(item.id)}
                      >
                        <SvgIcon>
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.475 5.90783L18.592 8.02483M17.836 4.04283L12.109 9.76983C11.8131 10.0653 11.6113 10.4418 11.529 10.8518L11 13.4998L13.648 12.9698C14.058 12.8878 14.434 12.6868 14.73 12.3908L20.457 6.66383C20.6291 6.49173 20.7656 6.28742 20.8588 6.06256C20.9519 5.83771 20.9998 5.59671 20.9998 5.35333C20.9998 5.10994 20.9519 4.86895 20.8588 4.64409C20.7656 4.41923 20.6291 4.21492 20.457 4.04283C20.2849 3.87073 20.0806 3.73421 19.8557 3.64108C19.6309 3.54794 19.3899 3.5 19.1465 3.5C18.9031 3.5 18.6621 3.54794 18.4373 3.64108C18.2124 3.73421 18.0081 3.87073 17.836 4.04283Z"
                              stroke="#1A1A1A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 15.5V18.5C19 19.0304 18.7893 19.5391 18.4142 19.9142C18.0391 20.2893 17.5304 20.5 17 20.5H6C5.46957 20.5 4.96086 20.2893 4.58579 19.9142C4.21071 19.5391 4 19.0304 4 18.5V7.5C4 6.96957 4.21071 6.46086 4.58579 6.08579C4.96086 5.71071 5.46957 5.5 6 5.5H9"
                              stroke="#1A1A1A"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteOption(item.id)}
                    >
                      <SvgIcon>
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 5.5H14C14 4.96957 13.7893 4.46086 13.4142 4.08579C13.0391 3.71071 12.5304 3.5 12 3.5C11.4696 3.5 10.9609 3.71071 10.5858 4.08579C10.2107 4.46086 10 4.96957 10 5.5ZM8.5 5.5C8.5 5.04037 8.59053 4.58525 8.76642 4.16061C8.94231 3.73597 9.20012 3.35013 9.52513 3.02513C9.85013 2.70012 10.236 2.44231 10.6606 2.26642C11.0852 2.09053 11.5404 2 12 2C12.4596 2 12.9148 2.09053 13.3394 2.26642C13.764 2.44231 14.1499 2.70012 14.4749 3.02513C14.7999 3.35013 15.0577 3.73597 15.2336 4.16061C15.4095 4.58525 15.5 5.04037 15.5 5.5H21.25C21.4489 5.5 21.6397 5.57902 21.7803 5.71967C21.921 5.86032 22 6.05109 22 6.25C22 6.44891 21.921 6.63968 21.7803 6.78033C21.6397 6.92098 21.4489 7 21.25 7H19.93L18.76 19.111C18.6702 20.039 18.238 20.9002 17.5477 21.5268C16.8573 22.1534 15.9583 22.5004 15.026 22.5H8.974C8.04186 22.5001 7.1431 22.153 6.45295 21.5265C5.7628 20.8999 5.33073 20.0388 5.241 19.111L4.07 7H2.75C2.55109 7 2.36032 6.92098 2.21967 6.78033C2.07902 6.63968 2 6.44891 2 6.25C2 6.05109 2.07902 5.86032 2.21967 5.71967C2.36032 5.57902 2.55109 5.5 2.75 5.5H8.5ZM10.5 10.25C10.5 10.0511 10.421 9.86032 10.2803 9.71967C10.1397 9.57902 9.94891 9.5 9.75 9.5C9.55109 9.5 9.36032 9.57902 9.21967 9.71967C9.07902 9.86032 9 10.0511 9 10.25V17.75C9 17.9489 9.07902 18.1397 9.21967 18.2803C9.36032 18.421 9.55109 18.5 9.75 18.5C9.94891 18.5 10.1397 18.421 10.2803 18.2803C10.421 18.1397 10.5 17.9489 10.5 17.75V10.25ZM14.25 9.5C14.4489 9.5 14.6397 9.57902 14.7803 9.71967C14.921 9.86032 15 10.0511 15 10.25V17.75C15 17.9489 14.921 18.1397 14.7803 18.2803C14.6397 18.421 14.4489 18.5 14.25 18.5C14.0511 18.5 13.8603 18.421 13.7197 18.2803C13.579 18.1397 13.5 17.9489 13.5 17.75V10.25C13.5 10.0511 13.579 9.86032 13.7197 9.71967C13.8603 9.57902 14.0511 9.5 14.25 9.5ZM6.734 18.967C6.78794 19.5236 7.04724 20.0403 7.46137 20.4161C7.87549 20.792 8.41475 21.0001 8.974 21H15.026C15.5853 21.0001 16.1245 20.792 16.5386 20.4161C16.9528 20.0403 17.2121 19.5236 17.266 18.967L18.424 7H5.576L6.734 18.967Z"
                            fill="#1A1A1A"
                          />
                        </svg>
                      </SvgIcon>
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            </ListSubheader>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default index;
