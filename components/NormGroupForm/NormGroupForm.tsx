import {
  Alert,
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
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { Fragment, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import CustomScale from "../../shared/CustomScale/CustomScale";
import {
  CreateStudentResponse,
  DropDownOptions,
  FormQuestion,
  Question,
  QuestionResponse,
  QuestionniareAnswer,
  StudentDetailsAnswer,
} from "../../utils/types";
import { FieldType, FormEvaluation, SectionType } from "../../utils/enum";
import {
  getAllNormGroupQuestions,
  getStudentFormInfoByFormType,
} from "../../services/questionnaire.service";
import { champBlackFontFamily } from "../../shared/typography";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgressWithLabel";
import { CustomStepper } from "../../shared/Stepper/Stepper";
import { generateStudentDetails } from "../../utils/helper";
import { createStudentResponse } from "../../services/response.service";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";

const customStyles = {
  mainBox: {
    border: "1px #E6E6E6 solid",
    p: 5,
    borderRadius: 2,
  },
  stack: {
    width: {
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
    // mb: 1,
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
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
};

const steps = ["Personal Details", "Part 01 Questions", "Part 02 Questions"];

const questionSectionOne = 0;
const questionSectionTwo = 1;

const NormGroupForm = () => {
  const router = useRouter();

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [studentFormInfo, setStudentFormInfo] = useState<QuestionResponse[]>(
    []
  );
  const [questionListPartOne, setQuestionListPartOne] = useState<
    QuestionResponse[]
  >([]);
  const [questionListPartTwo, setQuestionListPartTwo] = useState<
    QuestionResponse[]
  >([]);

  const [answersPartOne, setAnswersPartOne] = useState<QuestionniareAnswer[]>(
    []
  );
  const [answersPartTwo, setAnswersPartTwo] = useState<QuestionniareAnswer[]>(
    []
  );

  const [allAnsweredPartOne, setAllAnsweredPartOne] = useState<boolean>(false);
  const [allAnsweredPartTwo, setAllAnsweredPartTwo] = useState<boolean>(false);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [searchStrings, setSearchStrings] = useState<{ [key: string]: string }>(
    {}
  );

  const updateAnswerPartOne = (questionId: number, answer: number) => {
    setAnswersPartOne((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      let isPresent = false;

      newAnswers.map((item, index) => {
        if (item.questionId === questionId) {
          isPresent = true;

          newAnswers[index] = {
            questionId,
            answer,
          };
        }
      });

      if (!isPresent) {
        const appendAnswer = [...newAnswers, { questionId, answer }];

        return appendAnswer;
      }

      return newAnswers;
    });
  };

  const updateAnswerPartTwo = (questionId: number, answer: number) => {
    setAnswersPartTwo((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      let isPresent = false;

      newAnswers.map((item, index) => {
        if (item.questionId === questionId) {
          isPresent = true;

          newAnswers[index] = {
            questionId,
            answer,
          };
        }
      });

      if (!isPresent) {
        const appendAnswer = [...newAnswers, { questionId, answer }];

        return appendAnswer;
      }

      return newAnswers;
    });
  };

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

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

  const handleSubmit = async () => {
    const personDetailsInfo: StudentDetailsAnswer[] = generateStudentDetails(
      formik.values,
      studentFormInfo
    );

    const requestBody: CreateStudentResponse = {
      formType: FormEvaluation.Normgroup,
      studentDetails: personDetailsInfo,
      responses: [...answersPartOne, ...answersPartTwo],
    };
    setIsLoading(true);

    await createStudentResponse(requestBody)
      .then(() => {
        setNotificationMsg("Form Submitted Successfully...");

        setDisplaySnackbarMsg(true);

        router.replace("/success-message");
      })
      .catch(() => {
        setIsError(true);

        setNotificationMsg("Error when fetching personal details data...");
        setDisplaySnackbarMsg(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  const personalDetailsForm = isLoading ? (
    <ProgressSpinner />
  ) : (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {studentFormInfo &&
        studentFormInfo.map((question: QuestionResponse) => (
          <Grid item xs={12} md={6} key={question.id}>
            <FormControl fullWidth required>
              {question.fieldType === FieldType.DropDown ? (
                <>
                  <InputLabel>{question.questionText}</InputLabel>
                  <Select
                    MenuProps={{
                      autoFocus: false,
                      PaperProps: {
                        style: {
                          maxHeight: 200, // Set the maximum height here
                        },
                      },
                    }}
                    labelId={`search-select-`}
                    id={String(question.id)}
                    name={String(question.id)}
                    value={formik.values[question.id]}
                    label={question.questionText}
                    onChange={formik.handleChange}
                    onClose={() =>
                      setSearchStrings({
                        ...searchStrings,
                        [question.id]: "",
                      })
                    }
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
                        value={searchStrings[question.id] || ""}
                        onChange={(e) =>
                          setSearchStrings({
                            ...searchStrings,
                            [question.id]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key !== "Escape") {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </ListSubheader>
                    {question.dropdownOptions
                      .filter((item) => !item.isDelete)
                      .filter((option) =>
                        containsText(
                          option.item,
                          searchStrings[question.id] || ""
                        )
                      )
                      .map((item: DropDownOptions, index: number) => (
                        <MenuItem value={item.item} key={index}>
                          {item.item}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              ) : (
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
              )}
              {formik.touched[question.id] && (
                <FormHelperText sx={{ color: "red", mb: -2.5 }}>
                  {formik.errors[question.id]}
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
        1 to {questionListPartOne.length} statements (1 = totally disagree, 2
        = disagree, 3 = somewhat disagree, 4 = somewhat agree, 5 = agree, 6 =
        totally agree).
      </Typography>

      <FormControl>
        {questionListPartOne.map((questionDetails: QuestionResponse) => (
          <CustomScale
            key={questionDetails.id}
            {...questionDetails}
            isDisabled={isLoading}
            updateAnswer={(answer: number) =>
              updateAnswerPartOne(questionDetails.id, answer)
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
        1 to {questionListPartTwo.length} statements (1 = totally disagree, 2
        = disagree, 3 = somewhat disagree, 4 = somewhat agree, 5 = agree, 6 =
        totally agree).
      </Typography>

      <FormControl>
        {questionListPartTwo.map(
          (questionDetails: QuestionResponse, index: number) => (
            <CustomScale
              key={questionDetails.id}
              {...questionDetails}
              isDisabled={isLoading}
              updateAnswer={(answer: number) =>
                updateAnswerPartTwo(questionDetails.id, answer)
              }
            />
          )
        )}
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

  const snackbar = (
    <Snackbar
      open={displaySnackbarMsg}
      autoHideDuration={6000}
      onClose={() => setDisplaySnackbarMsg(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={() => setDisplaySnackbarMsg(false)}
        severity={isError ? "error" : "success"}
        variant="outlined"
        sx={customStyles.snackbarAlert}
      >
        {notificationMsg}
      </Alert>
    </Snackbar>
  );

  useMemo(() => {
    const fetchQuestionnaireData = async () => {
      try {
        setIsLoading(true);

        const normGroupQuestions = await getAllNormGroupQuestions();

        const questionsWithAnswerValue = normGroupQuestions.map(
          (question: FormQuestion) => ({
            ...question,
            answerValue: 0,
          })
        );

        const questionSetOne = questionsWithAnswerValue.filter(
          (question: FormQuestion) =>
            question.questionSection === questionSectionOne
        );

        const questionSetTwo = questionsWithAnswerValue.filter(
          (question: FormQuestion) =>
            question.questionSection === questionSectionTwo
        );

        setQuestionListPartOne(questionSetOne);
        setQuestionListPartTwo(questionSetTwo);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaireData();
  }, []);

  useMemo(() => {
    const partOneAllAnswered = () => {
      if (answersPartOne.length !== questionListPartOne.length) {
        return false;
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

      return true;
    };

    setAllAnsweredPartTwo(partTwoAllAnswered());
  }, [answersPartTwo, questionListPartTwo]);

  useMemo(() => {
    const fetchingStudentInfo = async () => {
      try {
        const studentFormInfoQuestions: QuestionResponse[] =
          await getStudentFormInfoByFormType(FormEvaluation.Normgroup);

        const studentFormInfoPersonal = studentFormInfoQuestions.filter(
          (item: Question) => item.sectionType === SectionType.PersonalDetails
        );

        setStudentFormInfo(studentFormInfoPersonal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingStudentInfo();
  }, []);

  return (
    <Stack sx={customStyles.stack}>
      <Box sx={customStyles.titleBox}>
        <Typography variant="h5" sx={customStyles.title}>
          normgroup
        </Typography>

        <Typography variant="subtitle1" sx={customStyles.body}>
          Here are some general questions about you?
        </Typography>
      </Box>

      <Box sx={customStyles.mainBox}>
        <CustomStepper
          activeStep={activeStep}
          steps={steps}
          completed={completed}
          handleStep={handleStep}
        />

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
                  disabled={
                    activeStep === 2 && !allAnsweredPartTwo && isLoading
                  }
                >
                  {isLoading ? "Submitting..." : "Complete"}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleNext}
                  sx={customStyles.primaryButton}
                  disabled={
                    activeStep === 0
                      ? // ? !(formik.isValid && formik.dirty)
                        !formik.isValid
                      : !allAnsweredPartOne
                  }
                >
                  Next
                </Button>
              )}
            </Box>
          </Fragment>
        </Box>
      </Box>

      {snackbar}
    </Stack>
  );
};

export default NormGroupForm;
