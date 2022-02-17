import { useState } from "react";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import Link from "next/link";
import styled from "styled-components";

const SignInPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;
interface Users {
  users: object;
}

const SignIn: NextPage<Users> = ({ users }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const checkUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (users[email] && users[email].password === password) {
      alert("True");
    } else {
      alert("False");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <SignInPage>
      <Form
        submit={checkUser}
        content={"Log in"}
        mediaPadding={"15px"}
      >
        <Input
          height={"50px"}
          mediaMargin={"0 0 10px 0"}
          margin={"0 0 20px 0"}
          value={email}
          setValue={setEmail}
          type="email"
          placeholder="Email"
        />
        <Input
          height={"50px"}
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Password"
        />
        {/* <Button width={'40%'}>Log in with Google</Button> */}
        <Button width={"30%"}>Log in</Button>
        <Link href={"/authorization/SignUp"}>
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
