import Link from "next/link";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { NextPage, NextApiResponse } from "next";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { Form } from "components/form/Form";
import { Message } from "components/Message";

const Fullname = styled.div`
  width: 105%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media all and (max-width: 470px) {
    width: 87%;
  }
`;

interface Users {
  users: object;
}

const SignUp: NextPage<Users> = ({ users }) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isUserExists, setIsUserExists] = useState<boolean>(false);

  const workPositions = {
    admin: 'admin',
    manager: 'manager',
    user: 'user'
}   
  useEffect(() => {
    setTimeout(() => {
      setIsUserCreated(false);
    }, 3000);
  }, [isUserCreated]);

  useEffect(() => {
    setTimeout(() => {
      setIsPasswordValid(false);
    }, 3000);
  }, [isPasswordValid]);

  useEffect(() => {
    setTimeout(() => {
      setIsUserExists(false);
    }, 3000);
  }, [isUserExists]);

  const getInformation = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (users[userEmail]) {
      setIsUserExists(true);
    } else {
      if (userPassword !== checkPassword) {
        setIsPasswordValid(false);
        setIsUserExists(false);
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
        setIsUserCreated(true);
        setIsPasswordValid(true);
        setIsUserExists(false);
        setName("");
        setSurname("");
        setUserEmail("");
        setPhone("");
        setRole("");
        setUserPassword("");
        setCheckPassword("");
      }
    }
  };

  const EmailInput: JSX.Element = useMemo(() => (<Input height={"40px"} value={userEmail} setValue={setUserEmail} type={"email"} placeholder={"Email"} />), [userEmail]);
  const NameInput: JSX.Element = useMemo(() => (<Input mediaMargin={"0 10px 0 0"} margin={"0 25px 0 0"} height={"40px"} value={name} setValue={setName} type={"text"}placeholder={"Name"}/>), [name]);
  const SurnameInput: JSX.Element = useMemo(() => (<Input height={"40px"} value={surname} setValue={setSurname} type={"text"} placeholder={"Surname"}/>), [surname]);
  const PhoneInput: JSX.Element = useMemo(() => (<Input height={"40px"} value={phone} setValue={setPhone} type={"number"} placeholder={"Phone"} />), [phone]);
  const RoleInput: JSX.Element = useMemo(() => (<Input list="roles" height={'40px'} margin={''} mediaMargin={'10px'} value={role} setValue={setRole} placeholder='Work position'/>), [role]);
  const PasswordInput: JSX.Element = useMemo(() => (<Input height={"40px"} value={userPassword} setValue={setUserPassword} type={"password"} placeholder={"Password"} />), [userPassword]);
  const CheckPasswordInput: JSX.Element = useMemo(() => (<Input height={"40px"} value={checkPassword} setValue={setCheckPassword} type={"password"} placeholder={"Repeat password"} />), [checkPassword]);

  return (
    <>
      <Form submit={getInformation} content={"Create admin account"} padding={"30px 57px 0 57px"} mediaPadding={"5px"}>
        <Fullname>
          {NameInput}
          {SurnameInput}
        </Fullname>
        {EmailInput}
        {PhoneInput}
        {RoleInput}
        <datalist id="roles">
            <option value={workPositions.admin}/>
            <option value={workPositions.manager}/>
            <option value={workPositions.user}/>
        </datalist> 
        {PasswordInput}
        {CheckPasswordInput}
        {<Button width={"30%"}>Create account</Button>}
        {<Message color={'red'} visibility={isPasswordValid ? 'hidden' : 'visible'}>Invalid password</Message>}
        {<Message color={'orange'} visibility={isUserExists ? 'visible' : 'hidden'}>User exists</Message>}
        {<Message color={'green'} visibility={isUserCreated ? 'visible' : 'hidden'}>Account created</Message>}
        <Link href={"/authorization/SignIn"}>
          <a>Sign In</a>
        </Link>
      </Form>
    </>
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