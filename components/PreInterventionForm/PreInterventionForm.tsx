import {
  Box,
  Button,
  FormControl,
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
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React, { ChangeEvent, Fragment, useMemo, useState } from "react";
import {
  ageList,
  completeSentenceList,
  gradeList,
  remindProgramList,
  schoolList,
  studyFieldList,
} from "../../utils/constant";
import { useRouter } from "next/router";

import { champBlackFontFamily } from "../../shared/typography";
import CustomScale from "../../shared/CustomScale/CustomScale";
import { getAllPreInterventionQuestions } from "../../services/questionnaire.service";
import { FormEvaluation } from "../../utils/enum";

export type Question = {
  id: number;
  questionText: string;
  positionOrderId: number;
  minValue: number;
  maxValue: number;
  isDelete: boolean;
};

const customStyles = {
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

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedSchoolOptions = useMemo(
    () =>
      schoolList.filter((option) =>
        containsText(option.schoolName, searchTextSchool)
      ),
    [searchTextSchool]
  );

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

  function CircularProgressWithLabel(
    props: CircularProgressProps & { completedStep: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={64}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#A879FF" : "#A879FF",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            // [`& .${circularProgressClasses.circle}`]: {
            //   strokeLinecap: "round",
            // },
          }}
          size={64}
          thickness={4}
          value={((activeStep + 1) / 3) * 100}
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ fontSize: 16, color: "#A879FF", fontWeight: 600 }}
          >{`${activeStep + 1} of 3`}</Typography>
        </Box>
      </Box>
    );
  }

  const personalDetailsForm = (
    <>
      <Stack sx={customStyles.selectStack}>
        <FormControl fullWidth required>
          <InputLabel>What school are you at?</InputLabel>
          <Select
            MenuProps={{ autoFocus: false }}
            labelId="search-select-school"
            id="search-select"
            value={school}
            label="What school are you at?"
            onChange={handleChangeSchool}
            onClose={() => setSearchTextSchool("")}
            renderValue={() => school}
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
              {displayedSchoolOptions.map((school: any, index: number) => (
                <MenuItem value={school.id} key={index}>
                  {school.schoolName}
                </MenuItem>
              ))}
            </Box>
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>What do you study?</InputLabel>

          <Select
            value={studyField}
            label="What do you study?"
            onChange={handleChangeStudyField}
          >
            {studyFieldList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.studyField}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack sx={customStyles.selectStack}>
        <FormControl fullWidth required>
          <InputLabel>What grade are you in?</InputLabel>

          <Select
            value={grade}
            label="What grade are you in?"
            onChange={handleChangeGrade}
          >
            {gradeList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <TextField
            label="In which class are you?"
            value={studentClass}
            onChange={handleChangeClass}
          />
        </FormControl>
      </Stack>

      <Stack sx={customStyles.selectStack}>
        <FormControl fullWidth required>
          <InputLabel>Complete the sentence: I am...</InputLabel>

          <Select
            value={completeSentence}
            label="Complete the sentence: I am..."
            onChange={handleChangeCompleteSentence}
          >
            {completeSentenceList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.sentence}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>How old are you?</InputLabel>

          <Select
            value={age}
            label="How old are you?"
            onChange={handleChangeAge}
          >
            {ageList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack sx={customStyles.selectStack}>
        <FormControl
          sx={{
            width: {
              xs: "100%",
              md: "49.5%",
            },
          }}
          required
        >
          <InputLabel>Which Remind program are you following?</InputLabel>

          <Select
            value={remindProgram}
            label="Which Remind program are you following?"
            onChange={handleChangeRemindProgram}
          >
            {remindProgramList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.sentence}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
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

  const getStepName = (step: number) => {
    switch (step) {
      case 0:
        return "Personal Details";

      case 1:
        return "Questions | Part 01";

      case 2:
        return "Questions | Part 02";

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

        <Typography variant="body1" sx={customStyles.body}>
          Here are some general questions about you?
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
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
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

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
            <CircularProgressWithLabel completedStep={activeStep} />
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
                {getStepName(activeStep)}
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
                  Next : {getStepName(activeStep + 1)}
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
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />

                {isLastStep() ? (
                  <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    sx={{ mr: 1 }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
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
