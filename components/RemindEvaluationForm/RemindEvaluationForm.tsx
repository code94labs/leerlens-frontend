import {
  Box,
  Button,
  FormControl,
  InputLabel,
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
import { FormEvaluation } from "../../utils/enum";
import { Question } from "../PostInterventionForm/PostInterventionForm";
import CustomScale from "../../shared/CustomScale/CustomScale";
import { getAllEvaluationQuestions } from "../../services/questionnaire.service";
import { champBlackFontFamily } from "../../shared/typography";
import { CircularProgressWithLabel } from "../../shared/CircularProgress/CircularProgress";

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

const steps = [
  "Personal Details",
  "Part 01 Questions",
  "Part 02 Questions",
  "Program and the supervisors",
  "Final",
];

const RemindEvaluationForm = () => {
  const router = useRouter();

  const [school, setSchool] = useState("");
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
      formType: FormEvaluation.Evaluation,
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
    <>
      <Stack sx={customStyles.selectStack}>
        <FormControl fullWidth required>
          <InputLabel>What school are you at?</InputLabel>

          <Select
            value={school}
            label="What school are you at?"
            onChange={handleChangeSchool}
          >
            {schoolList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.schoolName}
              </MenuItem>
            ))}
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

  const programAndSupervisorForm = <></>;

  const finalContentForm = <></>;

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

  useMemo(() => {
    const fetchData = async () => {
      try {
        const evaluationQuestions = await getAllEvaluationQuestions();

        const questionsWithAnswerValue = evaluationQuestions.map(
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
          Evaluation
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

        <Box>
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
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                {formContent()}
              </Typography>

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

                <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
              </Box>
            </Fragment>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default RemindEvaluationForm;
