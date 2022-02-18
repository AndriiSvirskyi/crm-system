import Link from "next/link";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";

const SignUpPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const ErrorText = styled.p`
  width: 100%;
  height: 19px;
  margin:  0 0 1px;
  padding: 4px 0 0 10px;
  font-size: 12px;
  border-radius: 3px;
  color: red;
  background: ${(props: {background: string}) => props.background}
`;

const Fullname = styled.div`
  width: 100%;
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

type Users = {
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
      // setErrors({ ...errors, userExist: "User exist" });
      setErrors({userExist: "User exists" });

    } else {
      if(userPassword !== checkPassword){
        // setErrors({ ...errors, invalidPassword: "Invalid password" });
        setErrors({invalidPassword: "Invalid password" });

      } else{
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
      setErrors(null);
      }
    }
  };
  console.log(errors);
  const EmailInput: JSX.Element = useMemo(
    () => (
      <Input
        marginBottom="0"
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
        marginBottom="25px"
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
        marginBottom="25px"
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
        marginBottom="25px"
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
        marginBottom="25px"
        list="roles"
        type="text"
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
      marginBottom="25px"
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
        marginBottom="0"
        height="40px"
        value={checkPassword}
        setValue={setCheckPassword}
        type="password"
        placeholder="Repeat password"
        error={errors?.invalidPassword}
      />
    ),
    [checkPassword, errors?.invalidPassword]
  );

  return (
    <SignUpPage>
      <Form
        submit={getInformation}
        content="Create admin account"
      >
        <Fullname>
          {NameInput}
          {SurnameInput}
        </Fullname>
        {EmailInput}
        <ErrorText background={errors?.userExist ? "#ffe7e6" : "transparent"}>{errors?.userExist}</ErrorText>
        {PhoneInput}
        {RoleInput}
        <datalist id="roles">
          {Object.values(workPositions).map((position) => (
            <option key={position} value={position} />
          ))}
        </datalist>
        {PasswordInput}
        {CheckPasswordInput}
        <ErrorText  background={errors?.invalidPassword ? "#ffe7e6" : "transparent"}>{errors?.invalidPassword}</ErrorText>
        <Button width="30%">Create account</Button>
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