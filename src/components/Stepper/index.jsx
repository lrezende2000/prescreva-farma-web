import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";

import { StyledStepConnector, StyledStepIcon } from "./styles";

const Stepper = ({ activeStep, steps }) => {
  const StepIcon = (props) => {
    const { active, completed, stepIndex } = props;

    return (
      <StyledStepIcon completed={completed} active={active}>
        {steps?.[stepIndex]?.icon}
      </StyledStepIcon>
    );
  };

  return (
    <MUIStepper
      alternativeLabel
      activeStep={activeStep}
      connector={<StyledStepConnector />}
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={(props) => (
              <StepIcon {...props} stepIndex={index} />
            )}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </MUIStepper>
  );
};

Stepper.defaultProps = {
  activeStep: 0,
  steps: [],
};

export default Stepper;
