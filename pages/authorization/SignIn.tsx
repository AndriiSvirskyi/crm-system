import { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "styled-components/Form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import router from "next/router";
import { Input } from "components/Input";
import { Button } from "components/Button";

const SignInPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const SignInPageWrap = styled.div`
  padding: 100px 40px;
  background: white;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
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
        router.push(
          `/employees/${users.find(({ email }) => email === emailInput).id}`
        );
      }
    } else {
      setErrors({ invalidEmail: "Invalid email" });
    }
  };

  return (
    <SignInPage>
      <SignInPageWrap>
        <Form submit={checkUser} content="Log in">
          <Input
            value={emailInput}
            width="100%"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmailInput(e.target.value)
            }
            type="email"
            margin="0 0 30px 0"
            placeholder="Email"
            height="50px"
            error={errors?.invalidEmail}
          />
          <Input
            value={passwordInput}
            width="100%"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordInput(e.target.value)
            }
            type="password"
            margin="0 0 30px 0"
            placeholder="Password"
            height="50px"
            error={errors?.invalidPassword}
          />
          {/* <Button width="40%">Log in with Google</Button> */}
          <Button width={"30%"} height="50px">
            Log in
          </Button>
        </Form>
      </SignInPageWrap>
    </SignInPage>
  );
};

export default SignIn;
