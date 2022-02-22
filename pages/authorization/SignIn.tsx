import { useState } from "react";
import styled from "styled-components";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import { ErrorText } from "components/form/ErrorText";
import Router from "next/router";

const SignInPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

type Users = {
  users: object;
};
type Errors = {
  [key: string]: string;
};

const SignIn = ({ users }) => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);

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
          setValue={(e) => setEmailInput(e.target.value)}
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
          setValue={(e) => setPasswordInput(e.target.value)}
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

SignIn.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4200/users`);
  const users: NextApiResponse<Users> = await response.json();
  return {
    users,
  };
};

export default SignIn;
