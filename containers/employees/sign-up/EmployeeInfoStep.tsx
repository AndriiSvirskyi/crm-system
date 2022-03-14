import { Input } from "components/Inputs/Input";
import { Flex } from "styled-components/Flex";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

export const InputContainer = styled.div`
  width: 450px;
  margin: 20px;
`;
export const StepButton = styled.button`
  cursor: pointer;
  user-select: none;
  border: none;
  width: 120px;
  height: 40px;
  margin: 10px;
  background-color: #dbd1d1;
`;

export default function EmployeeInfoStep({ data, setData, goToTheNextStep }) {
  const [email, setEmail] = useState(data.email || "");
  const [name, setName] = useState(data.name || "");
  const [surname, setSurname] = useState(data.surname || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [password, setPassword] = useState(data.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    data.confirmPassword || ""
  );
  const [errors, setErrors] = useState<any>({});

  const workPositions = {
    admin: "admin",
    manager: "manager",
    user: "user",
  };

  const validateFields = useCallback(
    ({ name, surname, phone, email, password, confirmPassword }) => {
      const MIN_LENGTH = 2;
      const MAX_LENGTH = 25;
      let countErrors = 0;
      const inputErrors: any = {};
      const simpleData = [
        ["email", email],
        ["name", name],
        ["surname", surname],
        ["phone", phone],
      ];
      for (let i = 0; i < simpleData.length; i++) {
        if (simpleData[i][1].length < MIN_LENGTH) {
          inputErrors[
            simpleData[i][0]
          ] = `Too short or empty`;
          countErrors++;
        }
        if (simpleData[i][1].length > MAX_LENGTH) {
          inputErrors[
            simpleData[i][0]
          ] = `Too many letters`;
          countErrors++;
        }
      }
      if (password !== confirmPassword) {
        inputErrors.password = "Passwords should be equel";
        inputErrors.confirmPassword = "Passwords should be equel";
        countErrors++;
      }
      if (!password) {
        inputErrors.password = "Password can not be empty";
      }
      if (!confirmPassword) {
        inputErrors.confirmPassword = "Password can not be empty";
      }

      if (countErrors) {
        setErrors(inputErrors);
        return false;
      }
      return true;
    },
    []
  );

  const EmailInput: JSX.Element = useMemo(
    () => (
      <Input
        value={email}
        onChange={(e) => {
          if (errors.email) {
            setErrors((oldErrors) => {
              return { ...oldErrors, email: false };
            });
          }
          setEmail(e.target.value);
        }}
        width="100%"
        error={errors.email}
        type="text"
        margin="0 0 10px 0"
        placeholder="Email"
        height="40px"
      />
    ),
    [email, errors.email]
  );
  const NameInput: JSX.Element = useMemo(
    () => (
      <Input
        value={name}
        onChange={(e) => {
          if (errors.name) {
            setErrors((oldErrors) => {
              return { ...oldErrors, name: false };
            });
          }
          setName(e.target.value);
        }}
        error={errors.name}
        type="text"
        placeholder="Name"
        height="40px"
        width="100%"
        margin="0 10px 10px 0"
      />
    ),
    [errors.name, name]
  );
  const SurnameInput: JSX.Element = useMemo(
    () => (
      <Input
        value={surname}
        onChange={(e) => {
          if (errors.surname) {
            setErrors((oldErrors) => {
              return { ...oldErrors, surname: false };
            });
          }
          setSurname(e.target.value);
        }}
        type="text"
        error={errors.surname}
        placeholder="Surname"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
      />
    ),
    [errors.surname, surname]
  );
  const PhoneInput: JSX.Element = useMemo(
    () => (
      <Input
        value={phone}
        onChange={(e) => {
          if (errors.phone) {
            setErrors((oldErrors) => {
              return { ...oldErrors, phone: false };
            });
          }
          setPhone(e.target.value);
        }}
        type="number"
        error={errors.phone}
        placeholder="Phone"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
      />
    ),
    [errors.phone, phone]
  );

  const PasswordInput: JSX.Element = useMemo(
    () => (
      <Input
        value={password}
        onChange={(e) => {
          if (errors.password) {
            setErrors((oldErrors) => {
              return { ...oldErrors, password: false };
            });
          }
          setPassword(e.target.value);
        }}
        type="password"
        error={errors.password}
        placeholder="Password"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
      />
    ),
    [errors.password, password]
  );

  const CheckPasswordInput: JSX.Element = useMemo(
    () => (
      <Input
        value={confirmPassword}
        onChange={(e) => {
          if (errors.confirmPassword) {
            setErrors((oldErrors) => {
              return { ...oldErrors, confirmPassword: false };
            });
          }
          setConfirmPassword(e.target.value);
        }}
        error={errors.confirmPassword}
        type="password"
        placeholder="Repeat password"
        height="40px"
        width="100%"
        margin="0 0 10px 0"
      />
    ),
    [confirmPassword, errors.confirmPassword]
  );

  return (
    <InputContainer>
      <Flex justify="space-between" width="100%">
        {NameInput}
        {SurnameInput}
      </Flex>
      {PhoneInput}
      <datalist id="roles">
        {Object.values(workPositions).map((position) => (
          <option key={position} value={position} />
        ))}
      </datalist>
      {EmailInput}
      {PasswordInput}
      {CheckPasswordInput}
      <StepButton
        onClick={(e) => {
          e.preventDefault();
          if (
            validateFields({
              name,
              surname,
              phone,
              email,
              password,
              confirmPassword,
            })
          ) {
            setData({
              ...data,
              name,
              surname,
              phone,
              email,
              password,
              confirmPassword,
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
