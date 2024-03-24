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
  import React, { ChangeEvent, Fragment, useState } from "react";
  import {
    ageList,
    completeSentenceList,
    gradeList,
    remindProgramList,
    schoolList,
    studyFieldList,
  } from "../../utils/constant";
  import { useRouter } from "next/router";
  import CustomScale from "../../shared/CustomScale/CustomScale";
  
  const customStyles = {
    stack: {
      width: "90%",
      maxWidth: 1200,
      margin: "0 auto",
      mb: 10,
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
  
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
      [k: number]: boolean;
    }>({});
  
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
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
    // End of form step creation
  
    const personalDetailsForm = (
      <>
        <Stack flexDirection="row" mb={4} mt={2}>
          <FormControl fullWidth sx={{ mr: 1 }}>
            <InputLabel>What school are you at?</InputLabel>
  
            <Select
              value={school}
              label="What school are you at?"
              onChange={handleChangeSchool}
            >
              {schoolList.map((school) => (
                <MenuItem value={school}>{school}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth sx={{ ml: 1 }}>
            <InputLabel>What do you study?</InputLabel>
  
            <Select
              value={studyField}
              label="What do you study?"
              onChange={handleChangeStudyField}
            >
              {studyFieldList.map((field) => (
                <MenuItem value={field}>{field}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
  
        <Stack flexDirection="row" mb={4} mt={2}>
          <FormControl fullWidth sx={{ mr: 1 }}>
            <InputLabel>What grade are you in?</InputLabel>
  
            <Select
              value={grade}
              label="What grade are you in?"
              onChange={handleChangeGrade}
            >
              {gradeList.map((gradeItem) => (
                <MenuItem value={gradeItem}>{gradeItem}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth sx={{ ml: 1 }}>
            <TextField
              label="In which class are you?"
              value={studentClass}
              onChange={handleChangeClass}
            />
          </FormControl>
        </Stack>
  
        <Stack flexDirection="row" mb={4} mt={2}>
          <FormControl fullWidth sx={{ mr: 1 }}>
            <InputLabel>Complete the sentence: I am...</InputLabel>
  
            <Select
              value={completeSentence}
              label="Complete the sentence: I am..."
              onChange={handleChangeCompleteSentence}
            >
              {completeSentenceList.map((sent) => (
                <MenuItem value={sent}>{sent}</MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth sx={{ ml: 1 }}>
            <InputLabel>How old are you?</InputLabel>
  
            <Select
              value={age}
              label="How old are you?"
              onChange={handleChangeAge}
            >
              {ageList.map((age_) => (
                <MenuItem value={age_}>{age_}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
  
        <Stack flexDirection="row" mb={10} mt={2}>
          <FormControl sx={{ width: "49.5%" }}>
            <InputLabel>Which Remind program are you following?</InputLabel>
  
            <Select
              value={remindProgram}
              label="Which Remind program are you following?"
              onChange={handleChangeRemindProgram}
            >
              {remindProgramList.map((program) => (
                <MenuItem value={program}>{program}</MenuItem>
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
          {/* <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale /> */}
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
          {/* <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale />
          <CustomScale /> */}
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
  
    return (
      <Stack sx={customStyles.stack}>
        <Box py={4}>
          <Typography
            variant="h5"
            fontWeight={1000}
            mb={1}
            textTransform="uppercase"
          >
            Pre-Intervention Measurement
          </Typography>
  
          <Typography variant="body1" mb={1}>
            Here are some general questions about you?
          </Typography>
        </Box>
  
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
  
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
  
  export default PostInterventionForm;
  