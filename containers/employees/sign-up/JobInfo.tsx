import { Input } from "components/Input";
import { Flex } from "styled-components/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputContainer, StepButton } from "./EmployeeInfoStep";

const Label = styled.label`
  width: 50%;
  font-size: 15px;
  text-align: start;
  line-height: 40px;
`;

export default function JobInfo({
  goToThePreviousStep,
  currentStep,
  submit,
  closeModal,
  users,
}) {
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [division, setDivision] = useState("");
  const [startDate, setStartDate] = useState("");
  const [errors, setErrors] = useState<any>({});
  const positionsList = ["Team Lead", "Junior", "Midle", "Trainee", "Seniour"];
  const departmentsList = ["Design", "HR", "Marketing", "Tech", "Finance"];
  const divisionsList = [
    "Backend",
    "DevOps",
    "Business Analysis",
    "Frontend",
    "FullStack",
    "Recruitment",
  ];
  const validateFields = useCallback(
    ({ position, department, reportsTo, division, startDate }) => {
      const MIN_LENGTH = 3;
      const MAX_LENGTH = 15;
      let countErrors = 0;
      const inputErrors: any = {};
      const simpleData = [
        ["position", position],
        ["department", department],
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
      <Input
        value={position}
        onChange={(e) => {
          if (errors.position) {
            setErrors((oldErrors) => {
              return { ...oldErrors, position: false };
            });
          }
          setPosition(e.target.value);
        }}
        type="select"
        placeholder="Position"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        list="positions"
        error={errors.position}
      />
    ),
    [position, errors.position]
  );
  const DepartmentInput: JSX.Element = useMemo(
    () => (
      <Input
        value={department}
        onChange={(e) => {
          if (errors.department) {
            setErrors((oldErrors) => {
              return { ...oldErrors, department: false };
            });
          }
          setDepartment(e.target.value);
        }}
        type="text"
        placeholder="Department"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        list="departments"
        error={errors.department}
      />
    ),
    [department, errors.department]
  );
  const ReportsToInput: JSX.Element = useMemo(
    () => (
      <Input
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
        list="reportsTo"
        error={errors.reportsTo}
      />
    ),
    [reportsTo, errors.reportsTo]
  );
  const DivisionInput: JSX.Element = useMemo(
    () => (
      <Input
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
        placeholder="Division"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        list="divisions"
        error={errors.division}
      />
    ),
    [division, errors.division]
  );
  const StartDateInput: JSX.Element = useMemo(
    () => (
      <Input
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
      <datalist id="positions">
        {positionsList.map((position) => (
          <option key={position} value={position} />
        ))}
      </datalist>
      {DepartmentInput}
      <datalist id="departments">
        {departmentsList.map((department) => (
          <option key={department} value={department} />
        ))}
      </datalist>
      {ReportsToInput}
      <datalist id="reportsTo">
        {Object.values(users).map((user: any) => {
          return (
            <option key={user.id} value={`${user.name} ${user.surname}`} />
          );
        })}
      </datalist>
      {DivisionInput}
      <datalist id="divisions">
        {divisionsList.map((division) => (
          <option key={division} value={division} />
        ))}
      </datalist>
      <Flex>
        <Label>Start work since:</Label>
        {StartDateInput}
      </Flex>
      <>
        <StepButton onClick={goToThePreviousStep}>Previus</StepButton>
        <StepButton
          onClick={(e) => {
            e.preventDefault();
            if (
              validateFields({
                position,
                department,
                reportsTo,
                division,
                startDate,
              })
            ) {
              submit({
                position,
                department,
                reportsTo,
                division,
                startDate,
              });
              closeModal();
            }
          }}
        >
          Submit
        </StepButton>
      </>
    </InputContainer>
  );
}
