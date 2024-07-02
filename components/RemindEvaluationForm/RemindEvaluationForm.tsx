import React, { Fragment, useEffect, useMemo, useState } from "react";
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
import SnackbarComponent from "../../shared/Snackbar";

import {
  FieldType,
  FormEvaluation,
  QuestionSetType,
  SectionType,
} from "../../utils/enum";
import {
  CreateStudentResponse,
  DropDownOptions,
  EvaluationQuestion,
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

export const questionSetTabs = {
  personalDetails: 0,
  quesitonSetOne: 1,
  personalDetailsPartTwo: 2,
};

const steps = ["Personal Details", "Part 01 Questions", "Part 02 Questions"];

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

  const [questionListPartOne, setQuestionListPartOne] = useState<
    EvaluationQuestion[]
  >([]);
  const [personalDetailsPartTwo, setPersonalDetailsPartTwo] = useState<
    QuestionResponse[]
  >([]);

  const [answersPartOne, setAnswersPartOne] = useState<QuestionniareAnswer[]>(
    []
  );

  const [allAnsweredPartOne, setAllAnsweredPartOne] = useState<boolean>(false);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [searchStrings, setSearchStrings] = useState<{ [key: string]: string }>(
    {}
  );

  const [seasonalSchoolSelected, setSeasonalSchoolSelected] =
    useState<boolean>(false);

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

    const personalDetailsPartTwoList: StudentDetailsAnswer[] =
      generateStudentDetails(
        personalDetailsPartTwoFormik.values,
        personalDetailsPartTwo
      );

    const requestBody: CreateStudentResponse = {
      formType: FormEvaluation.Evaluation,
      studentDetails: [...personDetailsInfo, ...personalDetailsPartTwoList],
      responses: [...answersPartOne],
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

  // can be exported
  const formSelect = (question: QuestionResponse) => (
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
        renderValue={() => personalDetailsFormik.values[question.id]}
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
            containsText(option.item, searchStrings[question.id] || "")
          )
          .map((item: DropDownOptions, index: number) => (
            <MenuItem value={item.item} key={index}>
              {item.item}
            </MenuItem>
          ))}
      </Select>
    </>
  );

  // can be exported and used in common
  const formTextField = (question: QuestionResponse) => (
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
  );

  const formTextArea = (question: QuestionResponse) => (
    <Input
      aria-label={question.questionText}
      multiline
      placeholder={question.questionText}
      id={String(question.id)}
      name={String(question.id)}
      value={personalDetailsPartTwoFormik.values[question.id]}
      onChange={personalDetailsPartTwoFormik.handleChange}
      onBlur={personalDetailsPartTwoFormik.handleBlur}
      error={
        personalDetailsPartTwoFormik.touched[question.id] &&
        Boolean(personalDetailsPartTwoFormik.errors[question.id])
      }
    />
  );

  const formCustomScale = (question: QuestionResponse) => (
    <CustomScale
      {...question}
      updateAnswer={(answer: number) => {
        personalDetailsPartTwoFormik.setFieldValue(String(question.id), answer);
      }}
      evaluationQuestionnaire={true}
    />
  );

  const getInputType = (question: QuestionResponse) => {
    switch (question.fieldType) {
      case FieldType.DropDown:
        return formSelect(question);
      case FieldType.TextArea:
        return formTextArea(question);
      case FieldType.Scale1to10:
        return formCustomScale(question);
      case FieldType.TextField:
        return formTextField(question);
      default:
        return null;
    }
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
    initialValues: Object.fromEntries(
      studentFormInfo.map((field) => [field.id, ""])
    ),
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
              {getInputType(question)}
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
      {/* <Typography variant="subtitle2" fontWeight={500}>
        Below are a number of statements. You can answer these statements on a
        scale from 1 to 6
      </Typography>

      <Typography variant="subtitle2" fontWeight={500}>
        1 to {questionListPartOne.length} statements (1 = totally disagree, 2 =
        disagree, 3 = somewhat disagree, 4 = somewhat agree, 5 = agree, 6 =
        totally agree).
      </Typography> */}

      <FormControl>
        {questionListPartOne
          .filter((question) =>
            !seasonalSchoolSelected
              ? question.questionSetType !== QuestionSetType.onlySeasonalSchools
              : true
          )
          .map((questionDetails: EvaluationQuestion) => (
            <CustomScale
              key={questionDetails.id}
              questionText={questionDetails.questionText}
              fieldType={questionDetails.fieldType}
              positionOrderId={questionDetails.positionOrderId}
              isDisabled={isLoading}
              updateAnswer={
                (answer: number) =>
                  updateAnswerPartOne(questionDetails.id ?? 0, answer) // address this issue/temp fix
              }
              evaluationQuestionnaire
            />
          ))}
      </FormControl>
    </>
  );

  const personalDetailsPartTwoValidationSchema = yup
    .object()
    .shape(
      personalDetailsPartTwo.length > 0
        ? Object.fromEntries(
            personalDetailsPartTwo.map((field) => [
              field.id,
              yup.string().required(`Response is required`),
            ])
          )
        : {}
    );

  const personalDetailsPartTwoFormik = useFormik({
    initialValues: personalDetailsPartTwo
      ? Object.fromEntries(
          personalDetailsPartTwo.map((field) => [field.id, ""])
        )
      : {},
    validationSchema: personalDetailsPartTwoValidationSchema,
    onSubmit: () => {},
  });

  const evaluationPartTwo = (
    <Grid container rowSpacing={4} columnSpacing={4}>
      {personalDetailsPartTwo &&
        personalDetailsPartTwo.map((question: QuestionResponse) => (
          <Grid
            item
            xs={12}
            // md={question.fieldType === FieldType.Scale1to10 ? 12 : 6}
            key={question.id}
          >
            <FormControl fullWidth required>
              {getInputType(question)}
              {personalDetailsPartTwoFormik.touched[question.id] && (
                <FormHelperText sx={{ color: "red", mb: -2.5 }}>
                  {personalDetailsPartTwoFormik.errors[question.id]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
    </Grid>
  );

  const formContent = () => {
    switch (activeStep) {
      case questionSetTabs.personalDetails:
        return personalDetailsForm;

      case questionSetTabs.quesitonSetOne:
        return questionPartOneForm;

      case questionSetTabs.personalDetailsPartTwo:
        return evaluationPartTwo;

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchDataStudentInfo = async () => {
      try {
        setIsLoading(true);

        const studentFormInfoQuestions: QuestionResponse[] =
          await getStudentFormInfoByFormType(FormEvaluation.Evaluation);

        const studentFormInfoPersonal = studentFormInfoQuestions.filter(
          (item: QuestionResponse) =>
            item.sectionType === SectionType.PersonalDetails
        );

        const evaluationPartTwo = studentFormInfoQuestions.filter(
          (item: QuestionResponse) =>
            item.sectionType === SectionType.EvaluationPartTwo
        );

        setStudentFormInfo(studentFormInfoPersonal);
        setPersonalDetailsPartTwo(evaluationPartTwo);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchQuestionnaireData = async () => {
      try {
        setIsLoading(true);

        const evaluationQuestions: EvaluationQuestion[] =
          await getAllEvaluationQuestions();

        const questionsWithAnswerValue = evaluationQuestions.map(
          (question: EvaluationQuestion) => ({
            ...question,
            answerValue: 0,
          })
        );

        const questionSetOne = questionsWithAnswerValue;

        setQuestionListPartOne(questionSetOne);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataStudentInfo();
    fetchQuestionnaireData();
  }, []);

  useEffect(() => {
    const partOneAllAnswered = () => {
      if (
        answersPartOne.length !==
        questionListPartOne.filter((question) =>
          !seasonalSchoolSelected
            ? question.questionSetType !== QuestionSetType.onlySeasonalSchools
            : true
        ).length
      ) {
        return false;
      }

      return true;
    };

    setAllAnsweredPartOne(partOneAllAnswered());
  }, [answersPartOne, questionListPartOne]);

  useEffect(() => {
    if (
      personalDetailsFormik.values?.["53"] ===
      "Zomerschool, herfstschool of lenteschool"
    ) {
      setSeasonalSchoolSelected(true);
    } else {
      setSeasonalSchoolSelected(false);
    }
  }, [personalDetailsFormik.values]);

  return (
    <Stack sx={customStyles.stack}>
      <Box sx={customStyles.titleBox}>
        <Typography variant="h5" sx={customStyles.title}>
          Evaluation
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

        {activeStep < totalSteps() && (
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
            <CircularProgressWithLabel
              activeStep={activeStep}
              totalSteps={totalSteps()}
            />
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
              {activeStep < totalSteps() - 1 && (
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
              {activeStep === questionSetTabs.personalDetails ? (
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
                    allStepsCompleted() &&
                    !(
                      personalDetailsPartTwoFormik.isValid &&
                      personalDetailsPartTwoFormik.dirty
                    ) &&
                    !isLoading
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
                    activeStep === questionSetTabs.personalDetails
                      ? !(
                          personalDetailsFormik.isValid &&
                          personalDetailsFormik.dirty
                        )
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

      <SnackbarComponent
        displaySnackbarMsg={displaySnackbarMsg}
        setDisplaySnackbarMsg={setDisplaySnackbarMsg}
        notificationMsg={notificationMsg}
        isError={isError}
      />
    </Stack>
  );
};

export default RemindEvaluationForm;
