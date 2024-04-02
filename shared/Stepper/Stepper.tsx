import {
  Box,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  StepperProps,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const customStyles = {
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
};

type customStepperProps = {
  activeStep: number;
  steps: string[];
  completed: {
    [k: number]: boolean;
  };
  handleStep: (step: number) => void;
};

const ArrowIcon = () => {
  return (
    <StepLabel sx={customStyles.customArrow} icon={<span />}>
      <ArrowForwardIosIcon fontSize="small" />
    </StepLabel>
  );
};

export function CustomStepper({
  activeStep,
  steps,
  completed,
  handleStep,
}: customStepperProps) {
  return (
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
        <Step key={label} completed={completed[index]} sx={customStyles.step}>
          <StepButton color="inherit" onClick={() => handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  );
}
