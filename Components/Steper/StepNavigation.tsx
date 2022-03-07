import { Flex } from "components/User/Flex";
import React from "react";
import styled from "styled-components";
import Step from "./Step";

const StepNavigationContainer = styled.div`
  width: 100%;
`;

export default function StepNavigation({ labelArray, currentStep, goToStep }) {
  return (
    <StepNavigationContainer>
      <Flex justify="space-around">
        {labelArray.map((label, i) => (
          <Step
            key={i}
            index={i}
            label={label}
            goToStep={goToStep}
            currentStep={currentStep}
          />
        ))}
      </Flex>
    </StepNavigationContainer>
  );
}
