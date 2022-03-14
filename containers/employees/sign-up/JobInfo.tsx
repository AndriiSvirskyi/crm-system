import { Input } from "components/Input";
import { Flex } from "styled-components/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputContainer, StepButton } from "./EmployeeInfoStep";
import InputDropDown from "components/DropDown/InputDropDown";

const Label = styled.label`
  width: 50%;
  font-size: 15px;
  text-align: start;
  line-height: 40px;
`;

export default function JobInfo({
  goToThePreviousStep,
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
  const validateFields = useCallback(
    ({ position, department, reportsTo, division, startDate }) => {
      const MIN_LENGTH = 1;
      const MAX_LENGTH = 30;
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
          inputErrors[simpleData[i][0]] = `Emplty or not correct`;
          countErrors++;
        }
        if (simpleData[i][1].length > MAX_LENGTH) {
          inputErrors[simpleData[i][0]] = `Too many letters`;
          countErrors++;
        }
      }
      if (!startDate) {
        inputErrors.startDate = true;
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

  const PositionInput: JSX.Element = useMemo(() => {
    if (position) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: false };
      });
    }
    const positions = ["Team Lead", "Junior", "Midle", "Trainee", "Seniour"];

    const positionList = positions.reduce((acc, cur) => {
      acc.push({
        value: cur,
        label: cur,
        parts: cur.toLowerCase().split(" "),
      });
      return acc;
    }, []);
    return (
      <InputDropDown
        setState={setPosition}
        list={positionList}
        placeholder="Position"
        error={errors.position}
      />
    );
  }, [position, errors.position]);
  const DepartmentInput: JSX.Element = useMemo(() => {
    if (department) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: false };
      });
    }
    const departments = ["Design", "HR", "Marketing", "Tech", "Finance"];

    const departmentList = departments.reduce((acc, cur) => {
      acc.push({
        value: cur,
        label: cur,
        parts: cur.toLowerCase().split(" "),
      });
      return acc;
    }, []);
    return (
      <InputDropDown
        setState={setDepartment}
        list={departmentList}
        placeholder="Department"
        error={errors.department}
      />
    );
  }, [department, errors.department]);
  const ReportsToInput: JSX.Element = useMemo(() => {
    if (reportsTo) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: false };
      });
    }
    const reportToList = users.reduce((acc, cur) => {
      acc.push({
        value: cur.id,
        label: `${cur.name} ${cur.surname}`,
        parts: [cur.name.toLowerCase(), cur.surname.toLowerCase()],
      });
      return acc;
    }, []);
    return (
      <InputDropDown
        setState={setReportsTo}
        list={reportToList}
        placeholder="reportsTo"
        error={errors.reportsTo}
      />
    );
  }, [reportsTo, users, errors.reportsTo]);

  const DivisionInput: JSX.Element = useMemo(() => {
    if (division) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: false };
      });
    }
    const divisions = [
      "Backend",
      "DevOps",
      "Business Analysis",
      "Frontend",
      "FullStack",
      "Recruitment",
    ];
    const divisionList = divisions.reduce((acc, cur) => {
      acc.push({
        value: cur,
        label: cur,
        parts: cur.toLowerCase().split(" "),
      });
      return acc;
    }, []);
    return (
      <InputDropDown
        setState={setDivision}
        list={divisionList}
        placeholder="Division"
        error={errors.division}
      />
    );
  }, [division, errors.division]);

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
      {DepartmentInput}
      {ReportsToInput}
      {DivisionInput}
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
          Create
        </StepButton>
      </>
    </InputContainer>
  );
}
