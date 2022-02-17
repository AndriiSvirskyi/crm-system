import Link from "next/link";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import { Message } from "components/Message";

const SignUpPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;
const Fullname = styled.div`
  width: 105%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media all and (max-width: 470px) {
    width: 87%;
  }
`;

type Errors = {
  [key: string]: string;
};

interface Users {
  users: object;
}

const SignUp: NextPage<Users> = ({ users }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [errors, setErrors] = useState<Errors | null>(null);
  const workPositions = {
    admin: "admin",
    manager: "manager",
    user: "user",
  };

  const getInformation = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (users[userEmail]) {
      // setIsUserExists(true);
      setErrors({ ...errors, userExist: "User exist" });
    } else {
      await fetch(`http://localhost:4200/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...users,
          [userEmail]: {
            email: userEmail,
            password: userPassword,
            name: name,
            surname: surname,
            role: role,
          },
        }),
      });
      setName("");
      setSurname("");
      setUserEmail("");
      setPhone("");
      setRole("");
      setUserPassword("");
      setCheckPassword("");
    }
  };
  console.log(errors);
  const EmailInput: JSX.Element = useMemo(
    () => (
      <Input
        height="40px"
        value={userEmail}
        setValue={setUserEmail}
        type="email"
        placeholder="Email"
        error={errors?.userExist}
      />
    ),
    [userEmail, errors?.userExist]
  );
  const NameInput: JSX.Element = useMemo(
    () => (
      <Input
        mediaMargin="0 10px 0 0"
        margin="0 25px 0 0"
        height="40px"
        value={name}
        setValue={setName}
        type="text"
        placeholder="Name"
      />
    ),
    [name]
  );
  const SurnameInput: JSX.Element = useMemo(
    () => (
      <Input
        height="40px"
        value={surname}
        setValue={setSurname}
        type="text"
        placeholder="Surname"
      />
    ),
    [surname]
  );
  const PhoneInput: JSX.Element = useMemo(
    () => (
      <Input
        height="40px"
        value={phone}
        setValue={setPhone}
        type="number"
        placeholder="Phone"
      />
    ),
    [phone]
  );
  const RoleInput: JSX.Element = useMemo(
    () => (
      <Input
        list="roles"
        height="40px"
        mediaMargin="10px"
        value={role}
        setValue={setRole}
        placeholder="Work position"
      />
    ),
    [role]
  );
  const PasswordInput: JSX.Element = useMemo(
    () => (
      <Input
        height="40px"
        value={userPassword}
        setValue={setUserPassword}
        type="password"
        placeholder="Password"
      />
    ),
    [userPassword]
  );
  const CheckPasswordInput: JSX.Element = useMemo(
    () => (
      <Input
        height="40px"
        value={checkPassword}
        setValue={setCheckPassword}
        type="password"
        placeholder="Repeat password"
      />
    ),
    [checkPassword]
  );

  return (
    <SignUpPage>
      <Form
        submit={getInformation}
        content="Create admin account"
        mediaPadding="5px"
      >
        <Fullname>
          {NameInput}
          {SurnameInput}
        </Fullname>
        {EmailInput}
        {PhoneInput}
        {RoleInput}
        <datalist id="roles">
          {Object.values(workPositions).map((position) => (
            <option key={position} value={position} />
          ))}
        </datalist>
        {PasswordInput}
        {CheckPasswordInput}
        {<Button width="30%">Create account</Button>}
        <Link href="/authorization/SignIn">
          <a>Sign In</a>
        </Link>
      </Form>
    </SignUpPage>
  );
};

SignUp.getInitialProps = async () => {
  const response = await fetch(`http://localhost:4200/users`);
  const users: NextApiResponse<Users> = await response.json();
  return {
    users,
  };
};

export default SignUp;
