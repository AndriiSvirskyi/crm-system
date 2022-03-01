import { useEffect, useState } from "react";
import styled from "styled-components";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import { ErrorText } from "components/form/ErrorText";
import Router from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";

const SignInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

type Errors = {
  [key: string]: string;
};

const SignIn = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);

  useEffect(() => {
    if (!users) {
      const response = fetch(`http://localhost:4200/users`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
  }, []);

  const checkUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (users.find(({ email }) => email === emailInput)) {
      if (
        users.find(({ email }) => email === emailInput).password !==
        passwordInput
      ) {
        setErrors({ invalidPassword: "Invalid password" });
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(users.find(({ email }) => email === emailInput))
        );
        Router.push("/employees/profile");
      }
    } else {
      setErrors({ invalidEmail: "Invalid email" });
    }
  };

  return (
    <SignInPage>
      <Form submit={checkUser} content="Log in">
        <Input
          outline="none"
          value={emailInput}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmailInput(e.target.value)
          }
          type="email"
          placeholder="Email"
          height="50px"
          error={errors?.invalidEmail}
        />
        <ErrorText
          background={errors?.invalidEmail ? "#ffe7e6" : "transparent"}
        >
          {errors?.invalidEmail}
        </ErrorText>
        <Input
          outline="none"
          value={passwordInput}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordInput(e.target.value)
          }
          type="password"
          placeholder="Password"
          height="50px"
          error={errors?.invalidPassword}
        />
        <ErrorText
          background={errors?.invalidPassword ? "#ffe7e6" : "transparent"}
        >
          {errors?.invalidPassword}
        </ErrorText>
        {/* <Button width="40%">Log in with Google</Button> */}
        <Button width={"30%"} margin=" 0 0 35px 0" height="50px">
          Log in
        </Button>
      </Form>
    </SignInPage>
  );
};

export default SignIn;
