import { Input } from "components/Input";
import { Flex } from "styled-components/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputContainer, StepButton } from "./EmployeeInfoStep";
import InputDropDown from "components/DropDown/InputDropDown";

const Label = styled.label`
  width: 220px;
  height: 42px;
  font-size: 12px;
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

  const validateFields = useCallback(
    ({ gender, country, city, role, index, birthday }) => {
      const MIN_LENGTH = 2;
      const MAX_LENGTH = 15;
      let countErrors = 0;
      const inputErrors: any = {};
      const simpleData = [
        ["gender", gender],
        ["country", country],
        ["city", city],
        ["index", index],
      ];
      for (let i = 0; i < simpleData.length; i++) {
        if (simpleData[i][1].length < MIN_LENGTH) {
          inputErrors[simpleData[i][0]] = `Too short or empty`;
          countErrors++;
        }
        if (simpleData[i][1].length > MAX_LENGTH) {
          inputErrors[simpleData[i][0]] = `Too many letters`;
          countErrors++;
        }
      }
      if (!role) {
        inputErrors.role = `Empty or not correct`;
      }
      if (!birthday) {
        inputErrors.birthday = true;
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
      <Input
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
      <Input
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
      <Input
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
      <Input
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
      <Input
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
  const RoleInput: JSX.Element = useMemo(() => {
    if (role) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: false };
      });
    }
    const roles = ["admin", "manager", "user"];
    const roleList = roles.reduce((acc, cur) => {
      acc.push({
        value: cur,
        label: cur,
        parts: cur.toLowerCase().split(" "),
      });
      return acc;
    }, []);
    return (
      <InputDropDown
        setState={setRole}
        list={roleList}
        placeholder="Role"
        error={errors.role}
      />
    );
  }, [role, errors.role]);

  return (
    <InputContainer>
      <Flex justify="space-between" width="100%" margin="0 0 10px 0">
        <Label>
          Birthday
          {BirthInput}
        </Label>
        <Label>Gender{GenderInput}</Label>
        <datalist id="gender">
          <option value="Man" />
          <option value="Woman" />
        </datalist>
      </Flex>
      {CountryInput}
      {CityInput}
      <Flex justify="" width="100%"></Flex>
      {IndexInput}
      {RoleInput}

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
