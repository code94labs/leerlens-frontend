import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { ChangeEvent, Fragment, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { champBlackFontFamily } from "../../shared/typography";
import CustomScale from "../../shared/CustomScale/CustomScale";
import {
  getAllPostInterventionQuestions,
  getStudentFormInfo,
} from "../../services/questionnaire.service";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgress";
import { DropDownOptions, Question } from "../../utils/types";
import { FieldType } from "../../utils/enum";

const customStyles = {
  mainBox: {
    width: "100%",
    border: "1px #E6E6E6 solid",
    p: 5,
    borderRadius: 2,
  },
  stack: {
    width: {
      // xs: "100%",
      md: "90%",
    },
    maxWidth: 1200,
    mx: {
      xs: 2,
      md: "auto",
    },
    mb: {
      xs: 0,
      md: 20,
    },
  },
  titleBox: {
    py: {
      xs: 2.5,
      md: 4,
    },
  },
  title: {
    fontWeight: {
      xs: 900,
      md: 1000,
    },
    mb: 1,
    textTransform: "uppercase",
    fontFamily: champBlackFontFamily,
    color: "#1A1A1A",
  },
  body: {
    mb: 1,
    fontsize: {
      xs: 13,
      md: 16,
    },
  },
  formBox: {
    mb: 1,
    py: 1,
  },
  selectStack: {
    flexDirection: {
      xs: "column",
      md: "row",
    },
    gap: 1,
    mb: {
      xs: 1,
      md: 4,
    },
    mt: {
      xs: 0,
      md: 2,
    },
  },
  step: {
    "& .MuiStepLabel-iconContainer > .Mui-active": {
      color: "#A879FF",
    },

    "& .MuiStepLabel-label": {
      fontWeight: 600,
    },
  },
  primaryButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
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
    fontWeight: 400,
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
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
    fontFamily: champBlackFontFamily,
  },
};

const steps = ["Personal Details", "Part 01 Questions", "Part 02 Questions"];

const PostInterventionForm = () => {
  const router = useRouter();

  const [school, setSchool] = useState("");
  const [studyField, setStudyField] = useState("");
  const [grade, setGrade] = useState("");
  const [studentClass, setClass] = useState("");
  const [completeSentence, setCompleteSentence] = useState("");
  const [age, setAge] = useState("");
  const [remindProgram, setRemindProgram] = useState("");
  
  const [searchTextSchool, setSearchTextSchool] = useState("");

  const [studentFormInfo, setStudentFormInfo] = useState<Question[]>([]);
  const [questionListPartOne, setQuestionListPartOne] = useState<Question[]>(
    []
  );
  const [questionListPartTwo, setQuestionListPartTwo] = useState<Question[]>(
    []
  );

  const [answersPartOne, setAnswersPartOne] = useState<number[]>(
    Array(questionListPartOne.length).fill(0)
  );
  const [answersPartTwo, setAnswersPartTwo] = useState<number[]>(
    Array(questionListPartTwo.length).fill(0)
  );

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const updateAnswerPartOne = (questionId: number, answer: number) => {
    setAnswersPartOne((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionId] = answer;
      return newAnswers;
    });
  };

  const updateAnswerPartTwo = (questionId: number, answer: number) => {
    setAnswersPartTwo((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionId] = answer;
      return newAnswers;
    });
  };

  const handleChangeSchool = (event: SelectChangeEvent) => {
    setSchool(event.target.value as string);
  };

  const handleChangeClass = (event: ChangeEvent<HTMLInputElement>) => {
    setClass(event.target.value as string);
  };

  const handleChangeRemindProgram = (event: SelectChangeEvent) => {
    setRemindProgram(event.target.value as string);
  };

  const handleChangeStudyField = (event: SelectChangeEvent) => {
    setStudyField(event.target.value as string);
  };

  const handleChangeGrade = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string);
  };

  const handleChangeCompleteSentence = (event: SelectChangeEvent) => {
    setCompleteSentence(event.target.value as string);
  };

  const handleChangeAge = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  // These functions are used to handle the form step changes
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

    const newCompleted = completed;
    newCompleted[activeStep] = true;

    setCompleted(newCompleted);
  };

  const handleBack = () => {
    if (activeStep === 0) router.back();

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleSubmit = () => {
    console.log(answersPartOne);
    console.log(answersPartTwo);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // End of form step creation

  const personalDetailsForm = (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {studentFormInfo &&
        studentFormInfo.map((question: Question) => (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              {question.fieldType === FieldType.DropDown ? (
                <>
                  <InputLabel>{question.questionText}</InputLabel>
                  <Select
                    MenuProps={{ autoFocus: false }}
                    labelId="search-select-school"
                    id="school"
                    name="school"
                    value={formik.values.school}
                    label="What school are you at?"
                    onChange={formik.handleChange}
                    onClose={() => setSearchTextSchool("")}
                    renderValue={() => formik.values.school}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.school && Boolean(formik.errors.school)
                    }
                  >
                    <ListSubheader>
                      <TextField
                        size="small"
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchRoundedIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setSearchTextSchool(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== "Escape") {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </ListSubheader>
                    <Box maxHeight={150}>
                      {question.dropdownOptions
                        .filter((item) => !item.isDelete)
                        .map((item: DropDownOptions, index: number) => (
                          <MenuItem value={item.id} key={index}>
                            {item.item}
                          </MenuItem>
                        ))}
                    </Box>
                  </Select>
                </>
              ) : (
                <TextField
                  id="studentClass"
                  name="studentClass"
                  label={question.questionText}
                  value={formik.values.studentClass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.studentClass &&
                    Boolean(formik.errors.studentClass)
                  }
                />
              )}
              {formik.touched.school && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.school}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
    </Grid>
  );

  const questionPartOneForm = (
    <>
      <Typography variant="subtitle2" fontWeight={500}>
        Below are a number of statements. You can answer these statements on a
        scale from 1 to 6
      </Typography>

      <Typography variant="subtitle2" fontWeight={500}>
        1 to 23 statements (1 = completely disagree, 2 = disagree, 3 = somewhat
        disagree, 4 = somewhat agree, 5 = agree, 6 = completely agree).
      </Typography>

      <FormControl>
        {questionListPartOne.map((questionDetails: Question, index: number) => (
          <CustomScale
            key={questionDetails.id}
            {...questionDetails}
            updateAnswer={(answer: number) =>
              updateAnswerPartOne(index, answer)
            }
          />
        ))}
      </FormControl>
    </>
  );

  const questionPartTwoForm = (
    <>
      <Typography variant="subtitle2" fontWeight={500}>
        Below are a number of statements. You can answer these statements on a
        scale from 1 to 6
      </Typography>

      <Typography variant="subtitle2" fontWeight={500}>
        1 to 23 statements (1 = completely disagree, 2 = disagree, 3 = somewhat
        disagree, 4 = somewhat agree, 5 = agree, 6 = completely agree).
      </Typography>

      <FormControl>
        {questionListPartTwo.map((questionDetails: Question, index: number) => (
          <CustomScale
            key={questionDetails.id}
            {...questionDetails}
            updateAnswer={(answer: number) =>
              updateAnswerPartTwo(index, answer)
            }
          />
        ))}
      </FormControl>
    </>
  );

  const formContent = () => {
    switch (activeStep) {
      case 0:
        return personalDetailsForm;

      case 1:
        return questionPartOneForm;

      case 2:
        return questionPartTwoForm;

      default:
        break;
    }
  };

  useMemo(() => {
    const fetchData = async () => {
      try {
        const studentFormInfoQuestions = await getStudentFormInfo();

        setStudentFormInfo(studentFormInfoQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useMemo(() => {
    const fetchData = async () => {
      try {
        const postInterventionQuestions =
          await getAllPostInterventionQuestions();

        const questionsWithAnswerValue = postInterventionQuestions.map(
          (question: Question) => ({
            ...question,
            answerValue: 0,
          })
        );

        const midpointIndex = Math.ceil(questionsWithAnswerValue.length / 2);

        const firstHalf = questionsWithAnswerValue.slice(0, midpointIndex);
        const secondHalf = questionsWithAnswerValue.slice(midpointIndex);

        setQuestionListPartOne(firstHalf);
        setQuestionListPartTwo(secondHalf);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const validationSchema = yup.object({
    school: yup.string().required("School is required!"),
    studyField: yup.string().required("Study field is required!"),
    grade: yup.string().required("Grade is required!"),
    studentClass: yup.string().required("Student class is required!"),
    completeSentence: yup.string().required("Complete sentence is required!"),
    age: yup.string().required("Age is required!"),
    remindProgram: yup.string().required("Remind program is required!"),
  });


  const formik = useFormik({
    initialValues: {
      school: "",
      studyField: "",
      grade: "",
      studentClass: "",
      completeSentence: "",
      age: "",
      remindProgram: "",
    },
    validationSchema,
    onSubmit: () => {
      // Handle form submission here
      // You can access form values using formik.values
    },
  });

  return (
    <Stack sx={customStyles.stack}>
      <Box sx={customStyles.titleBox}>
        <Typography variant="h5" sx={customStyles.title}>
          Post-Intervention Measurement
        </Typography>

        <Typography variant="body1" sx={customStyles.body}>
          Here are some general questions about you?
        </Typography>
      </Box>

      <Box sx={customStyles.mainBox}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              completed={completed[index]}
              sx={customStyles.step}
            >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ py: 3, mb: 2 }} />

        {activeStep < 3 && (
          <Box
            sx={{
              width: "100%",
              display: {
                xs: "flex",
                md: "none",
              },
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgressWithLabel activeStep={activeStep} totalSteps={3} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#1A1A1A", fontSize: 13, fontWeight: 700 }}
              >
                {steps[activeStep]}
              </Typography>
              {activeStep < 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#98989A",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Next : {steps[activeStep + 1]}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        <Box>
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {formContent()}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {activeStep === 0 ? (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleBack}
                  sx={customStyles.secondaryButton}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleBack}
                  sx={customStyles.secondaryButton}
                >
                  Back
                </Button>
              )}

              <Box sx={{ flex: "1 1 auto" }} />

              {isLastStep() ? (
                <Button
                  variant="outlined"
                  onClick={handleSubmit}
                  sx={customStyles.primaryButton}
                >
                  Complete
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleNext}
                  sx={customStyles.primaryButton}
                >
                  Next
                </Button>
              )}
            </Box>
          </Fragment>
        </Box>
      </Box>
    </Stack>
  );
};

export default PostInterventionForm;
