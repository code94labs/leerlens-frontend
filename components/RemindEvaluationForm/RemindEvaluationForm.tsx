import React, { Fragment, useMemo, useState } from "react";
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
  styled,
} from "@mui/material";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/router";
import * as yup from "yup";

import CustomScale from "../../shared/CustomScale/CustomScale";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgressWithLabel";

import { FieldType, FormEvaluation, SectionType } from "../../utils/enum";
import {
  CreateStudentResponse,
  DropDownOptions,
  FormQuestion,
  Question,
  QuestionResponse,
  QuestionniareAnswer,
  StudentDetailsAnswer,
} from "../../utils/types";
import { champBlackFontFamily } from "../../shared/typography";

import {
  getAllEvaluationQuestions,
  getStudentFormInfoByFormType,
} from "../../services/questionnaire.service";
import { useFormik } from "formik";
import { CustomStepper } from "../../shared/Stepper/Stepper";
import ProgressSpinner from "../../shared/CircularProgress/ProgressSpinner";
import { generateStudentDetails } from "../../utils/helper";
import { createStudentResponse } from "../../services/response.service";

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
  formBox: { mb: 1, py: 1 },
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

const steps = [
  "Personal Details",
  "Part 01 Questions",
  "Part 02 Questions",
  "Program and the supervisors",
  "Final",
];

const questionSectionOne = 0;
const questionSectionTwo = 1;

const RemindEvaluationForm = () => {
  const router = useRouter();

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [studentFormInfo, setStudentFormInfo] = useState<QuestionResponse[]>(
    []
  );

  const [programAndSupervisorsQuestions, setProgramAndSupervisorsQuestions] =
    useState<QuestionResponse[]>([]);

  const [finalQuestions, setFinalQuestions] = useState<QuestionResponse[]>([]);

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
      personalDetailsFormik.values,
      studentFormInfo
    );

    const programSupervisorInfo: StudentDetailsAnswer[] =
      generateStudentDetails(
        programAndSupervisorsFormik.values,
        programAndSupervisorsQuestions
      );

    const finalStudentInfo: StudentDetailsAnswer[] = generateStudentDetails(
      finalQuestionsFormik.values,
      finalQuestions
    );

    const requestBody: CreateStudentResponse = {
      formType: FormEvaluation.Evaluation,
      studentDetails: [
        ...personDetailsInfo,
        ...programSupervisorInfo,
        ...finalStudentInfo,
      ],
      responses: [...answersPartOne, ...answersPartTwo],
    };
    setIsLoading(true);

    console.log(requestBody);

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

  const personalDetailsValidationSchema = yup
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

  const personalDetailsFormik = useFormik({
    initialValues: studentFormInfo
      ? Object.fromEntries(studentFormInfo.map((field) => [field.id, ""]))
      : {},
    validationSchema: personalDetailsValidationSchema,
    onSubmit: () => {},
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
                          maxHeight: 200,
                        },
                      },
                    }}
                    labelId={`search-select-`}
                    id={String(question.id)}
                    name={String(question.id)}
                    value={personalDetailsFormik.values[question.id]}
                    label={question.questionText}
                    onChange={personalDetailsFormik.handleChange}
                    onClose={() =>
                      setSearchStrings({
                        ...searchStrings,
                        [question.id]: "",
                      })
                    }
                    renderValue={() =>
                      personalDetailsFormik.values[question.id]
                    }
                    onBlur={personalDetailsFormik.handleBlur}
                    error={
                      personalDetailsFormik.touched[question.id] &&
                      Boolean(personalDetailsFormik.errors[question.id])
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
                  value={personalDetailsFormik.values[question.id]}
                  onChange={personalDetailsFormik.handleChange}
                  onBlur={personalDetailsFormik.handleBlur}
                  error={
                    personalDetailsFormik.touched[question.id] &&
                    Boolean(personalDetailsFormik.errors[question.id])
                  }
                />
              )}
              {personalDetailsFormik.touched[question.id] && (
                <FormHelperText sx={{ color: "red", mb: -2.5 }}>
                  {personalDetailsFormik.errors[question.id]}
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
        1 to {questionListPartOne.length} statements (1 = completely disagree, 2
        = disagree, 3 = somewhat disagree, 4 = somewhat agree, 5 = agree, 6 =
        completely agree).
      </Typography>

      <FormControl>
        {questionListPartOne.map(
          (questionDetails: QuestionResponse, index: number) => (
            <CustomScale
              key={questionDetails.id}
              {...questionDetails}
              isDisabled={isLoading}
              updateAnswer={(answer: number) =>
                updateAnswerPartOne(questionDetails.id, answer)
              }
            />
          )
        )}
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
        1 to {questionListPartTwo.length} statements (1 = completely disagree, 2 = disagree, 3 = somewhat
        disagree, 4 = somewhat agree, 5 = agree, 6 = completely agree).
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

  const programAndSupervisorValidationSchema = yup
    .object()
    .shape(
      programAndSupervisorsQuestions.length > 0
        ? Object.fromEntries(
            programAndSupervisorsQuestions.map((field) => [
              field.id,
              yup.string().required(`Response is required`),
            ])
          )
        : {}
    );

  const programAndSupervisorsFormik = useFormik({
    initialValues: programAndSupervisorsQuestions
      ? Object.fromEntries(
          programAndSupervisorsQuestions.map((field) => [field.id, ""])
        )
      : {},
    validationSchema: programAndSupervisorValidationSchema,
    onSubmit: () => {},
  });

  const programAndSupervisorForm = (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {programAndSupervisorsQuestions &&
        programAndSupervisorsQuestions.map((question: QuestionResponse) => (
          <Grid
            item
            xs={12}
            md={question.fieldType === FieldType.Scale1to10 ? 12 : 6}
            key={question.id}
          >
            <FormControl fullWidth required>
              {(() => {
                switch (question.fieldType) {
                  case FieldType.DropDown:
                    return (
                      <>
                        <InputLabel>{question.questionText}</InputLabel>
                        <Select
                          MenuProps={{
                            autoFocus: false,
                            PaperProps: {
                              style: {
                                maxHeight: 200,
                              },
                            },
                          }}
                          labelId={`search-select-`}
                          id={String(question.id)}
                          name={String(question.id)}
                          value={
                            programAndSupervisorsFormik.values[question.id]
                          }
                          label={question.questionText}
                          onChange={programAndSupervisorsFormik.handleChange}
                          onClose={() =>
                            setSearchStrings({
                              ...searchStrings,
                              [question.id]: "",
                            })
                          }
                          renderValue={() =>
                            programAndSupervisorsFormik.values[question.id]
                          }
                          onBlur={programAndSupervisorsFormik.handleBlur}
                          error={
                            programAndSupervisorsFormik.touched[question.id] &&
                            Boolean(
                              programAndSupervisorsFormik.errors[question.id]
                            )
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
                    );
                  case FieldType.TextArea:
                    return (
                      <Input
                        aria-label={question.questionText}
                        multiline
                        placeholder={question.questionText}
                        id={String(question.id)}
                        name={String(question.id)}
                        value={programAndSupervisorsFormik.values[question.id]}
                        onChange={programAndSupervisorsFormik.handleChange}
                        onBlur={programAndSupervisorsFormik.handleBlur}
                        error={
                          programAndSupervisorsFormik.touched[question.id] &&
                          Boolean(
                            programAndSupervisorsFormik.errors[question.id]
                          )
                        }
                      />
                    );
                  case FieldType.Scale1to10:
                    return (
                      <CustomScale
                        {...question}
                        // updateAnswer={function (answer: number): void {
                        //   throw new Error("Function not implemented.");
                        // }}
                        updateAnswer={(answer: number) => {
                          programAndSupervisorsFormik.setFieldValue(
                            String(question.id),
                            answer
                          );
                        }}
                      />
                    );
                  default:
                    return (
                      <TextField
                        id={String(question.id)}
                        name={String(question.id)}
                        label={question.questionText}
                        value={programAndSupervisorsFormik.values[question.id]}
                        onChange={programAndSupervisorsFormik.handleChange}
                        onBlur={programAndSupervisorsFormik.handleBlur}
                        error={
                          programAndSupervisorsFormik.touched[question.id] &&
                          Boolean(
                            programAndSupervisorsFormik.errors[question.id]
                          )
                        }
                      />
                    );
                }
              })()}
              {programAndSupervisorsFormik.touched[question.id] && (
                <FormHelperText sx={{ color: "red", mb: -2.5 }}>
                  {programAndSupervisorsFormik.errors[question.id]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
    </Grid>
  );

  const finalQuestionsValidationSchema = yup
    .object()
    .shape(
      finalQuestions.length > 0
        ? Object.fromEntries(
            finalQuestions.map((field) => [
              field.id,
              yup.string().required(`Response is required`),
            ])
          )
        : {}
    );

  const finalQuestionsFormik = useFormik({
    initialValues: finalQuestions
      ? Object.fromEntries(finalQuestions.map((field) => [field.id, ""]))
      : {},
    validationSchema: finalQuestionsValidationSchema,
    onSubmit: () => {},
  });

  const finalContentForm = (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {finalQuestions &&
        finalQuestions.map((question: QuestionResponse) => (
          <Grid
            item
            xs={12}
            md={question.fieldType === FieldType.TextArea ? 12 : 6}
            key={question.id}
          >
            <FormControl fullWidth required>
              {question.fieldType === FieldType.DropDown ? (
                <>
                  <InputLabel>{question.questionText}</InputLabel>
                  <Select
                    MenuProps={{
                      autoFocus: false,
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    labelId={`search-select-`}
                    id={String(question.id)}
                    name={String(question.id)}
                    value={finalQuestionsFormik.values[question.id]}
                    label={question.questionText}
                    onChange={finalQuestionsFormik.handleChange}
                    onClose={() =>
                      setSearchStrings({
                        ...searchStrings,
                        [question.id]: "",
                      })
                    }
                    renderValue={() => finalQuestionsFormik.values[question.id]}
                    onBlur={finalQuestionsFormik.handleBlur}
                    error={
                      finalQuestionsFormik.touched[question.id] &&
                      Boolean(finalQuestionsFormik.errors[question.id])
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
                <Input
                  aria-label={question.questionText}
                  multiline
                  placeholder={question.questionText}
                  id={String(question.id)}
                  name={String(question.id)}
                  value={finalQuestionsFormik.values[question.id]}
                  onChange={finalQuestionsFormik.handleChange}
                  onBlur={finalQuestionsFormik.handleBlur}
                  error={
                    finalQuestionsFormik.touched[question.id] &&
                    Boolean(finalQuestionsFormik.errors[question.id])
                  }
                />
              )}
              {finalQuestionsFormik.touched[question.id] && (
                <FormHelperText sx={{ color: "red", mb: -2.5 }}>
                  {finalQuestionsFormik.errors[question.id]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
    </Grid>
  );

  const formContent = () => {
    switch (activeStep) {
      case 0:
        return personalDetailsForm;

      case 1:
        return questionPartOneForm;

      case 2:
        return questionPartTwoForm;

      case 3:
        return programAndSupervisorForm;

      case 4:
        return finalContentForm;

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

        const evaluationQuestions = await getAllEvaluationQuestions();

        const questionsWithAnswerValue = evaluationQuestions.map(
          (question: Question) => ({
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
      }
    };

    fetchQuestionnaireData();
  }, []);

  useMemo(() => {
    const fetchDataStudentInfo = async () => {
      try {
        setIsLoading(true);

        const studentFormInfoQuestions: QuestionResponse[] =
          await getStudentFormInfoByFormType(FormEvaluation.Evaluation);

        const studentFormInfoPersonal = studentFormInfoQuestions.filter(
          (item: QuestionResponse) =>
            item.sectionType === SectionType.PersonalDetails
        );

        const studentFormInfoProgram = studentFormInfoQuestions.filter(
          (item: QuestionResponse) =>
            item.sectionType === SectionType.ProgramAndSupervisor
        );

        const studentFormInfoFinal = studentFormInfoQuestions.filter(
          (item: QuestionResponse) => item.sectionType === SectionType.Final
        );

        setStudentFormInfo(studentFormInfoPersonal);
        setProgramAndSupervisorsQuestions(studentFormInfoProgram);
        setFinalQuestions(studentFormInfoFinal);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataStudentInfo();
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

  return (
    <Stack sx={customStyles.stack}>
      <Box sx={customStyles.titleBox}>
        <Typography variant="h5" sx={customStyles.title}>
          Evaluation
        </Typography>

        <Typography variant="body1" sx={customStyles.body}>
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

        {activeStep < 5 && (
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
            <CircularProgressWithLabel activeStep={activeStep} totalSteps={5} />
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
              {activeStep < 4 && (
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

        <Divider sx={{ py: 3, mb: 2 }} />

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
                    activeStep === 4 &&
                    !(
                      finalQuestionsFormik.isValid && finalQuestionsFormik.dirty
                    ) &&
                    isLoading
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
                      ? !(
                          personalDetailsFormik.isValid &&
                          personalDetailsFormik.dirty
                        )
                      : activeStep === 1
                      ? !allAnsweredPartOne
                      : activeStep === 2
                      ? !allAnsweredPartTwo
                      : !(
                          programAndSupervisorsFormik.isValid &&
                          programAndSupervisorsFormik.dirty
                        )
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

export default RemindEvaluationForm;
