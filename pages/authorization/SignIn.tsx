import { useState } from "react";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import Link from "next/link";
import styled from "styled-components";
import { ErrorText } from "components/form/ErrorText";


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

const SignIn: NextPage<Users> = ({ users }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors | null>(null);

  const checkUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(email, users[email]);

    if(users[email]){
     if((users[email].password !== password)){
      setErrors({invalidPassword: "Invalid password"})
      }else {
        alert("You signed in");
        setEmail("");
        setPassword("");
        setErrors(null);
      }
    }else {
      setErrors({invalidEmail: "Invalid email"})
    }
  };

  return (
    <SignInPage>
      <Form
        submit={checkUser}
        content="Log in"
      >
        <Input
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="Email"
          height="50px"
          error={errors?.invalidEmail}
        />
        <ErrorText background={errors?.invalidEmail? "#ffe7e6" : "transparent"}>{errors?.invalidEmail}</ErrorText>
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
          height="50px"
          error={errors?.invalidPassword}
        />
        <ErrorText background={errors?.invalidPassword ? "#ffe7e6" : "transparent"}>{errors?.invalidPassword}</ErrorText>
        {/* <Button width="40%">Log in with Google</Button> */}
        <Button width={"30%"}>Log in</Button>
        <Link href="/authorization/SignUp">
          <a>Sign Up</a>
        </Link>
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