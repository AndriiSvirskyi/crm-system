import { Input } from "components/Inputs/Input";
import { Flex } from "styled-components/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputContainer, StepButton } from "./EmployeeInfoStep";
import InputSelect from "components/Inputs/InputSelect";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
const Label = styled.label`
  width: 220px;
  font-size: 12px;
`;
type StylesPtops = {
  error: boolean;
};
const CountrySelector = styled(CountryDropdown)`
  width: 100%;
  height: 40px;
  outline: none;
  background-color: #d0d0d0;
  border: ${({ error }: StylesPtops) =>
    error ? "1px solid #fe5959c9" : "1px solid transparent"};
  border-radius: 8px;
  option {
    background: #ffffff;
  }
`;
const CitySelector = styled(RegionDropdown)`
  height: 40px;
  width: 100%;
  outline: none;
  background-color: #d0d0d0;
  border: 1px solid transparent;
  border: ${({ error }: StylesPtops) =>
    error ? "1px solid #fe5959c9" : "1px solid transparent"};
  border-radius: 8px;
  option {
    background: #ffffff;
  }
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
        countErrors++;
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
        height="40px"
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
        height="40px"
        width="100%"
        error={errors.gender}
      />
    ),
    [gender, errors.gender]
  );
  const LocationSelect: JSX.Element = useMemo(
    () => (
      <Flex margin="0 0 10px 0" gap="10px">
        <CountrySelector
          value={country}
          onChange={(country) => setCountry(country)}
          error={errors.country}
        />
        <CitySelector
          country={country}
          disabled={!country}
          value={city}
          error={errors.city}
          onChange={(city) => setCity(city)}
          defaultOptionLabel="Select City"
        />
      </Flex>
    ),
    [country, city, errors.country, errors.city]
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
      <InputSelect
        callback={setRole}
        list={roleList}
        placeholder="Role"
        error={errors.role}
        value={role}
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
      {LocationSelect}
      <Flex justify="" width="100%"></Flex>
      {IndexInput}
      {RoleInput}
      <Flex justify="center" margin="50px 0 0 0">
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
      </Flex>
    </InputContainer>
  );
}
