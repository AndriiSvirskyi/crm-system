import { ButtonStyled } from "components/ButtonStyled";
import { Form } from "components/form/Form";
import { InputComponent } from "components/InputComponent";
import { Flex } from "components/User/Flex";
import React, { useCallback, useMemo, useState } from "react";
import { InputContainer, StepButton } from "./EmployeeInfoStep";

export default function JobInfo({
  data,
  setData,
  goToTheNextStep,
  goToThePreviousStep,
  currentStep,
  submit,
  closeModal,
}) {
  const [position, setPosition] = useState(data.position || "");
  const [departments, setDepartments] = useState(data.departments || "");
  const [reportsTo, setReportsTo] = useState(data.reportsTo || "");
  const [division, setDivision] = useState(data.division || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [errors, setErrors] = useState<any>({});

  const validateFields = useCallback(
    ({ position, departments, reportsTo, division, startDate }) => {
      const MIN_LENGTH = 3;
      const MAX_LENGTH = 15;
      let countErrors = 0;
      const inputErrors: any = {};
      const simpleData = [
        ["position", position],
        ["departments", departments],
        ["reportsTo", reportsTo],
        ["division", division],
      ];
      for (let i = 0; i < simpleData.length; i++) {
        if (simpleData[i][1].length < MIN_LENGTH) {
          inputErrors[
            simpleData[i][0]
          ] = `${simpleData[i][0]} should have more than ${MIN_LENGTH} symbols`;
          countErrors++;
        }
        if (simpleData[i][1].length > MAX_LENGTH) {
          inputErrors[
            simpleData[i][0]
          ] = `${simpleData[i][0]} should have less than ${MAX_LENGTH} symbols`;
          countErrors++;
        }
      }
      if (!startDate) {
        inputErrors.startDate = `please select a date`;
        countErrors++;
      }
      if (countErrors) {
        setErrors(inputErrors);
        return false;
      }
      return true;
    },
    []
  );

  const PositionInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={position}
        onChange={(e) => {
          if (errors.position) {
            setErrors((oldErrors) => {
              return { ...oldErrors, position: false };
            });
          }
          setPosition(e.target.value);
        }}
        type="text"
        placeholder="position"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.position}
      />
    ),
    [position, errors.position]
  );
  const DepartmentsInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={departments}
        onChange={(e) => {
          if (errors.departments) {
            setErrors((oldErrors) => {
              return { ...oldErrors, departments: false };
            });
          }
          setDepartments(e.target.value);
        }}
        type="text"
        placeholder="departments"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.departments}
      />
    ),
    [departments, errors.departments]
  );
  const ReportsToInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={reportsTo}
        onChange={(e) => {
          if (errors.reportsTo) {
            setErrors((oldErrors) => {
              return { ...oldErrors, reportsTo: false };
            });
          }
          setReportsTo(e.target.value);
        }}
        type="text"
        placeholder="Reports to"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.reportsTo}
      />
    ),
    [reportsTo, errors.reportsTo]
  );
  const DivisionInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={division}
        onChange={(e) => {
          if (errors.division) {
            setErrors((oldErrors) => {
              return { ...oldErrors, division: false };
            });
          }
          setDivision(e.target.value);
        }}
        type="text"
        placeholder="division"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.division}
      />
    ),
    [division, errors.division]
  );
  const StartDateInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={startDate}
        onChange={(e) => {
          if (errors.startDate) {
            setErrors((oldErrors) => {
              return { ...oldErrors, startDate: false };
            });
          }
          setStartDate(e.target.value);
        }}
        type="date"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.startDate}
      />
    ),
    [startDate, errors.startDate]
  );

  return (
    <InputContainer>
      {PositionInput}
      {DepartmentsInput}
      {ReportsToInput}
      {DivisionInput}
      {StartDateInput}
      {currentStep === 3 && (
        <>
          <StepButton onClick={goToThePreviousStep}>Previus</StepButton>
          <StepButton
            onClick={(e) => {
              e.preventDefault();
              if (
                validateFields({
                  position,
                  departments,
                  reportsTo,
                  division,
                  startDate,
                })
              ) {
                setData({
                  ...data,
                  position,
                  departments,
                  reportsTo,
                  division,
                  startDate,
                });
                goToTheNextStep();
              }
            }}
          >
            Finish
          </StepButton>
        </>
      )}
      {currentStep === 4 && (
        <>
          <StepButton
            onClick={(e) => {
              e.preventDefault();
              goToThePreviousStep();
            }}
          >
            Make Changes
          </StepButton>
          <StepButton
            onClick={(e) => {
              e.preventDefault();
              submit();
              closeModal();
            }}
          >
            Submit
          </StepButton>
        </>
      )}
    </InputContainer>
  );
}
