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
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ageList,
  completeSentenceList,
  gradeList,
  remindProgramList,
  schoolList,
  studyFieldList,
} from "../../utils/constant";
import { useRouter } from "next/router";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { champBlackFontFamily } from "../../shared/typography";
import CustomScale from "../../shared/CustomScale/CustomScale";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgress";

import {
  getAllPreInterventionQuestions,
  getStudentFormInfo,
} from "../../services/questionnaire.service";

import { FieldType, FormEvaluation, SectionType } from "../../utils/enum";
import { DropDownOptions, Question } from "../../utils/types";

// const sampleResponse: Question[] = [
//   {
//     id: 1,
//     formType: 3,
//     questionText: "What school are you from",
//     fieldType: 0,
//     sectionType: 0,
//     positionOrderId: 1,
//     dropdownOptions: [
//       {
//         id: 1,
//         item: "Royal Institute",
//         isDelete: false,
//       },
//       {
//         id: 2,
//         item: "Lyceum",
//         isDelete: false,
//       },
//     ],
//     minValue: 1,
//     maxValue: 6,
//   },
//   {
//     id: 2,
//     formType: 3,
//     questionText: "What's your age group",
//     fieldType: 0,
//     sectionType: 0,
//     positionOrderId: 1,
//     dropdownOptions: [
//       {
//         id: 1,
//         item: "18",
//         isDelete: false,
//       },
//       {
//         id: 2,
//         item: "19",
//         isDelete: false,
//       },
//     ],
//     minValue: 1,
//     maxValue: 6,
//   },
//   {
//     id: 3,
//     formType: 3,
//     questionText: "What's your age group",
//     fieldType: 1,
//     sectionType: 0,
//     positionOrderId: 1,
//     dropdownOptions: [],
//     minValue: 1,
//     maxValue: 6,
//   },
//   {
//     id: 4,
//     formType: 3,
//     questionText: "What's your age group",
//     fieldType: 2,
//     sectionType: 0,
//     positionOrderId: 1,
//     dropdownOptions: [],
//     minValue: 1,
//     maxValue: 6,
//   },
// ];

const customStyles = {
  mainBox: {
    // width: "100%",
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

    "& .MuiStepLabel-iconContainer > .Mui-completed": {
      color: "#2E8B33",
    },

    "& .MuiStepLabel-label": {
      fontWeight: 600,
    },
  },
  customArrow: {
    color: "#98989A",
    "& .MuiStepLabel-label.Mui-active": {
      color: "#98989A",
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
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
    },
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

const RootDiv = styled("div")`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 4px;
  color: rgba(0,0,0, 0.75);
  background-color: transparent;
  border: 1px solid rgba(0,0,0, 0.25);

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseInput
      slots={{
        root: RootDiv,
        input: "input",
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const ArrowIcon = () => {
  return (
    <StepLabel sx={customStyles.customArrow} icon={<span />}>
      <ArrowForwardIosIcon fontSize="small" />
    </StepLabel>
  );
};

const steps = ["Personal Details", "Part 01 Questions", "Part 02 Questions"];

const PreInterventionForm = () => {
  const router = useRouter();

  const [school, setSchool] = useState("");
  const [searchTextSchool, setSearchTextSchool] = useState("");
  const [studyField, setStudyField] = useState("");
  const [grade, setGrade] = useState("");
  const [studentClass, setClass] = useState("");
  const [completeSentence, setCompleteSentence] = useState("");
  const [age, setAge] = useState("");
  const [remindProgram, setRemindProgram] = useState("");

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

  const [allAnsweredPartOne, setAllAnsweredPartOne] = useState<boolean>(false);
  const [allAnsweredPartTwo, setAllAnsweredPartTwo] = useState<boolean>(false);

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

  useMemo(() => {
    const partOneAllAnswered = () => {
      if (answersPartOne.length !== questionListPartOne.length) {
        return false;
      }

      for (let i = 0; i < answersPartOne.length; i++) {
        if (
          answersPartOne[i] === undefined ||
          answersPartOne[i] === null ||
          answersPartOne[i] === 0
        ) {
          return false;
        }
      }
      return true;
    };

    setAllAnsweredPartOne(partOneAllAnswered());
  }, [answersPartOne, questionListPartOne]);

  useMemo(() => {
    const partTwoAllAnswered = () => {
      if (answersPartTwo.length !== questionListPartTwo.length) {
        return false;
      }

      for (let i = 0; i < answersPartTwo.length; i++) {
        if (
          answersPartTwo[i] === undefined ||
          answersPartTwo[i] === null ||
          answersPartTwo[i] === 0
        ) {
          return false;
        }
      }
      return true;
    };

    setAllAnsweredPartTwo(partTwoAllAnswered());
  }, [answersPartTwo, questionListPartTwo]);

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

  const validationSchema = yup
    .object()
    .shape(
      studentFormInfo.length > 0
        ? Object.fromEntries(
            studentFormInfo.map((field) => [
              field.id,
              yup.string().required(`Response is required`),
            ])
          )
        : {}
    );

  const formik = useFormik({
    initialValues: studentFormInfo
      ? Object.fromEntries(studentFormInfo.map((field) => [field.id, ""]))
      : {},
    validationSchema,
    onSubmit: () => {
      // Handle form submission here
      // You can access form values using formik.values
    },
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedSchoolOptions = useMemo(
    () =>
      schoolList.filter((option) =>
        containsText(option.schoolName, searchTextSchool)
      ),
    [searchTextSchool]
  );

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

  const formatQuestionnaire = (questionList: Question[], answers: number[]) => {
    return questionList.map((question, index) => ({
      questionnaireId: question.id,
      answer: answers[index],
    }));
  };

  const handleSubmit = () => {
    // Question id of the element refers to (Input Element type & Question)
    // TODO: We have to look into this once the admin panel is ready or we can replicate it using sample data from the database.
    const studentDetails = [
      { questionId: 1, answer: school },
      { questionId: 2, answer: studyField },
      { questionId: 3, answer: grade },
      { questionId: 4, answer: studentClass },
      { questionId: 5, answer: completeSentence },
      { questionId: 6, answer: age },
      { questionId: 7, answer: remindProgram },
    ];

    const partOneResponses = formatQuestionnaire(
      questionListPartOne,
      answersPartOne
    );

    const partTwoResponses = formatQuestionnaire(
      questionListPartTwo,
      answersPartTwo
    );

    const responses = [...partOneResponses, ...partTwoResponses];

    const request = {
      formType: FormEvaluation.PreInterventions,
      studentDetails,
      responses,
    };

    console.log("request", request);
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

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  // End of form step creation

  const personalDetailsForm = (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {studentFormInfo &&
        studentFormInfo.map((question: Question) => (
          <Grid item xs={12} md={6} key={question.id}>
            <FormControl fullWidth required>
              {(() => {
                switch (question.fieldType) {
                  case FieldType.DropDown:
                    return (
                      <>
                        <InputLabel>{question.questionText}</InputLabel>
                        <Select
                          MenuProps={{ autoFocus: false }}
                          labelId={`search-select-`}
                          id={String(question.id)}
                          name={String(question.id)}
                          value={formik.values[question.id]}
                          label={question.questionText}
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched[question.id] &&
                            Boolean(formik.errors[question.id])
                          }
                        >
                          {question.dropdownOptions
                            .filter((item) => !item.isDelete)
                            .map((item: DropDownOptions, index: number) => (
                              <MenuItem value={item.item} key={index}>
                                {item.item}
                              </MenuItem>
                            ))}
                        </Select>
                      </>
                    );
                  case FieldType.TextArea:
                    return (
                      <>
                        {/* <InputLabel>{question.questionText}</InputLabel> */}
                        <Input
                          aria-label={question.questionText}
                          multiline
                          placeholder={question.questionText}
                          id={String(question.id)}
                          name={String(question.id)}
                          value={formik.values[question.id]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched[question.id] &&
                            Boolean(formik.errors[question.id])
                          }
                        />
                      </>
                    );
                  default:
                    return (
                      <TextField
                        id={String(question.id)}
                        name={String(question.id)}
                        label={question.questionText}
                        value={formik.values[question.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[question.id] &&
                          Boolean(formik.errors[question.id])
                        }
                      />
                    );
                }
              })()}
              {formik.touched[question.id] && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors[question.id]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
      {/* <Select
                    MenuProps={{ autoFocus: false }}
                    labelId="search-select-school"
                    id={String(question.id)}
                    name={String(question.id)}
                    value={formik.values[question.id]}
                    label={question.questionText}
                    onChange={(e) => {
                      console.log(e);
                      handleChange(e);
                    }}
                    onClose={() => setSearchTextSchool("")}
                    renderValue={() => formik.values[question.id]}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[question.id] &&
                      Boolean(formik.errors[question.id])
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
                  </Select> */}
    </Grid>
  );

  const questionPartOneForm = (
    <>
      <Typography
        variant="subtitle2"
        sx={{
          color: "#1A1A1A",
          fontWeight: 500,
          fontSize: {
            xs: 13,
            md: 16,
          },
          mb: 1,
        }}
      >
        Below are a number of statements. You can answer these statements on a
        scale from 1 to 6
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          color: "#4C4C4D",
          fontWeight: 500,
          fontSize: {
            xs: 13,
            md: 16,
          },
          mb: 4,
        }}
      >
        1 to 23 statements <br />
        (1 = completely disagree, 2 = disagree, 3 = somewhat disagree, 4 =
        somewhat agree, 5 = agree, 6 = completely agree).
      </Typography>

      <FormControl
        sx={{
          gap: {
            xs: 4,
            md: 4,
          },
        }}
      >
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
      <Typography
        variant="subtitle2"
        sx={{
          color: "#1A1A1A",
          fontWeight: 500,
          fontSize: {
            xs: 13,
            md: 16,
          },
          mb: 1,
        }}
      >
        Below are a number of statements. You can answer these statements on a
        scale from 1 to 6
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          color: "#4C4C4D",
          fontWeight: 500,
          fontSize: {
            xs: 13,
            md: 16,
          },
          mb: 4,
        }}
      >
        1 to 23 statements
        <br />
        (1 = completely disagree, 2 = disagree, 3 = somewhat disagree, 4 =
        somewhat agree, 5 = agree, 6 = completely agree).
      </Typography>

      <FormControl
        sx={{
          gap: {
            xs: 4,
            md: 4,
          },
        }}
      >
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
        const preInterventionQuestions = await getAllPreInterventionQuestions();

        const questionsWithAnswerValue = preInterventionQuestions.map(
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

  return (
    <Stack sx={customStyles.stack}>
      <Box sx={customStyles.titleBox}>
        <Typography variant="h5" sx={customStyles.title}>
          Pre-Intervention Measurement
        </Typography>

        <Typography variant="h6" sx={customStyles.body}>
          Here are some general questions about you?
        </Typography>
      </Box>

      <Box sx={customStyles.mainBox}>
        <Stepper
          activeStep={activeStep}
          connector={<ArrowIcon />}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            width: "100%",
            justifyContent: "space-between",
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

        <Box sx={{ my: 2 }}>
          {allStepsCompleted() ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box sx={customStyles.formBox}>{formContent()}</Box>

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
                    disabled={activeStep === 2 && !allAnsweredPartTwo}
                  >
                    Complete
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={customStyles.primaryButton}
                    disabled={
                      activeStep === 0
                        ? !(formik.isValid && formik.dirty)
                        : !allAnsweredPartOne
                    }
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Fragment>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default PreInterventionForm;
