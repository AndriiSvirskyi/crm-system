import { ButtonStyled } from "components/ButtonStyled";
import { Form } from "components/form/Form";
import { InputComponent } from "components/InputComponent";
import { Flex } from "components/User/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputContainer, StepButton } from "./EmployeeInfoStep";

const Select = styled.select`
  height: 40px;
  width: 40%;
  margin: 10px;
`;
const Label = styled.label`
  width: 196px;
  height: 42px;
  font-size: 12px;
  margin: 0 0 10px 0;
`;

export default function LocationInfo({
  data,
  setData,
  goToThePreviousStep,
  goToTheNextStep,
}) {
  const [birthday, setBirthday] = useState(data.birthday || "");
  const [gender, setGender] = useState(data.gender || "");
  const [country, setCountry] = useState(data.country || "");
  const [city, setCity] = useState(data.city || "");
  const [index, setIndex] = useState(data.index || "");
  const [role, setRole] = useState(data.role || "");
  const [errors, setErrors] = useState<any>({});

  const roles = ["admin", "manager", "user"];

  const validateFields = useCallback(
    ({ gender, country, city, role, index, birthday }) => {
      const MIN_LENGTH = 3;
      const MAX_LENGTH = 15;
      let countErrors = 0;
      const inputErrors: any = {};
      const simpleData = [
        ["gender", gender],
        ["country", country],
        ["city", city],
        ["index", index],
        ["role", role],
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
      if (!birthday) {
        inputErrors.birthday = `please select a date`;
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

  const BirthInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        width="100%"
        type="date"
        value={birthday}
        onChange={(e) => {
          if (errors.birthday) {
            setErrors((oldErrors) => {
              return { ...oldErrors, birthday: false };
            });
          }
          setBirthday(e.target.value);
        }}
        placeholder="Date"
        height="26px"
        error={errors.birthday}
      />
    ),
    [birthday, errors.birthday]
  );
  const GenderInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        list="gender"
        value={gender}
        onChange={(e) => {
          if (errors.gender) {
            setErrors((oldErrors) => {
              return { ...oldErrors, gender: false };
            });
          }
          setGender(e.target.value);
        }}
        type="text"
        placeholder="Gender"
        height="26px"
        width="100%"
        error={errors.gender}
      />
    ),
    [gender, errors.gender]
  );
  const CountryInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={country}
        onChange={(e) => {
          if (errors.country) {
            setErrors((oldErrors) => {
              return { ...oldErrors, country: false };
            });
          }
          setCountry(e.target.value);
        }}
        type="text"
        placeholder="Country"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.country}
      />
    ),
    [country, errors.country]
  );
  const CityInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={city}
        onChange={(e) => {
          if (errors.city) {
            setErrors((oldErrors) => {
              return { ...oldErrors, city: false };
            });
          }
          setCity(e.target.value);
        }}
        type="text"
        placeholder="City"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.city}
      />
    ),
    [city, errors.city]
  );
  const IndexInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={index}
        onChange={(e) => {
          if (errors.index) {
            setErrors((oldErrors) => {
              return { ...oldErrors, index: false };
            });
          }
          setIndex(e.target.value);
        }}
        type="number"
        placeholder="Index"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        error={errors.index}
      />
    ),
    [index, errors.index]
  );
  const RoleInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={role}
        onChange={(e) => {
          if (errors.role) {
            setErrors((oldErrors) => {
              return { ...oldErrors, role: false };
            });
          }
          setRole(e.target.value);
        }}
        type="text"
        placeholder="Role"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
        list="role"
        error={errors.role}
      />
    ),
    [role, errors.role]
  );

  return (
    <InputContainer>
      <Flex justify="space-between" width="100%">
        <Label>
          Birthday
          {BirthInput}
        </Label>
        <Label>Gender{GenderInput}</Label>
        <datalist id="gender">
          <option value="Male" />
          <option value="Female" />
        </datalist>
      </Flex>
      {CountryInput}
      {CityInput}
      <Flex justify="" width="100%"></Flex>
      {IndexInput}
      {RoleInput}
      <datalist id="role">
        {roles.map((role) => (
          <option key={role} value={role} />
        ))}
      </datalist>
      <StepButton onClick={goToThePreviousStep}>Previus</StepButton>
      <StepButton
        onClick={(e) => {
          e.preventDefault();
          if (
            validateFields({
              birthday,
              gender,
              country,
              city,
              index,
              role,
            })
          ) {
            setData({
              ...data,
              birthday,
              gender,
              country,
              city,
              index,
              role,
            });
            goToTheNextStep();
          }
        }}
      >
        Go Next
      </StepButton>
    </InputContainer>
  );
}
