import React from "react";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";

const CircleStyled = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #ddd;
  border-radius: 20px;
  line-height: 30px;
  margin: auto;
`;

const ActiveCircleStyled = styled(CircleStyled)`
  border-color: green;
`;

const DoneStep = styled(ActiveCircleStyled)`
  cursor: pointer;
  background-color: green;
  border-radius: 20px;
  line-height: 40px;
`;
const StepBlock = styled.div`
  user-select: none;
`;

export default function Step({ label, index, goToStep, currentStep }) {
  const stepNumber = index + 1;
  const previousStep = stepNumber < currentStep;
  const selectedStep = currentStep === stepNumber;
  const nextStep = stepNumber > currentStep;

  return (
    <StepBlock>
      {!selectedStep && nextStep && (
        <label>
          <CircleStyled>{stepNumber}</CircleStyled>
          {label}
        </label>
      )}
      {selectedStep && (
        <label>
          <ActiveCircleStyled>{stepNumber}</ActiveCircleStyled>
          {label}
        </label>
      )}
      {previousStep && (
        <label>
          <DoneStep
            onClick={() => {
              if (currentStep !== 4) goToStep(index + 1);
            }}
          >
            <AiOutlineCheck size={20} color="white"></AiOutlineCheck>
          </DoneStep>
          {label}
        </label>
      )}
    </StepBlock>
  );
}
// <>
{
  /* // <StepBlock> */
}
{
  /* <CircleWrapper onClick={()=> goToStep(index+1)}> */
}
// <Circle selected={selected}>{label}</Circle>

{
  /* </CircleWrapper>  */
}
{
  /* <span>{label}</span>  */
}
{
  /* </StepBlock>  */
}
// </>
