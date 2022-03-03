import styled, { keyframes } from "styled-components";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Form } from "components/form/Form";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import router from "next/router";
import { UserText } from "components/User/UserForm";
import { InputComponent } from "components/InputComponent";
import { Flex } from "components/User/Flex";
import Modal from "./Modal";

type Errors = {
  [key: string]: string;
};

export const SignUpModal = ({ users, closeModal }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const workPositions = {
    admin: "admin",
    manager: "manager",
    user: "user",
  };

  useEffect(() => {
    if (!localStorage.user) {
      router.push("/forbidden");
    }
  }, [router]);

  const getInformation = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (users.find(({ email }) => email === userEmail)) {
      setErrors({ userExist: "User exists" });
    } else {
      if (userPassword !== confirmPassword) {
        setErrors({ invalidPassword: "Invalid password" });
      } else {
        await fetch(`http://localhost:4200/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: "",
            email: userEmail,
            password: userPassword,
            name: name,
            surname: surname,
            role: role,
            startDate: startDate,
            project: "",
            company: "",
            department: "",
            unit: "",
            team: "",
            birth: "",
            gender: "",
            mobile: phone,
            username: "",
            address: "",
            links: {
              facebook: "",
              linkedin: "",
              twitter: "",
            },
          }),
        });
        setName("");
        setSurname("");
        setUserEmail("");
        setPhone("");
        setRole("");
        setStartDate(moment().format("YYYY-MM-DD"));
        setUserPassword("");
        setConfirmPassword("");
        setErrors(null);
      }
    }
  };

  const EmailInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={userEmail}
        width="100%"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserEmail(e.target.value)
        }
        type="email"
        margin="0 0 10px 0"
        placeholder="Email"
        height="40px"
        error={errors?.userExist}
      />
    ),
    [userEmail, errors?.userExist]
  );
  const NameInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={name}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        type="text"
        placeholder="Name"
        height="40px"
        margin="0 10px 10px 0"
      />
    ),
    [name]
  );
  const SurnameInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={surname}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSurname(e.target.value)
        }
        type="text"
        placeholder="Surname"
        height="40px"
        margin="0 0 10px 0"
      />
    ),
    [surname]
  );
  const PhoneInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={phone}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhone(e.target.value)
        }
        type="number"
        placeholder="Phone"
        height="40px"
        margin="0 0 10px 0"
      />
    ),
    [phone]
  );
  const RoleInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={role}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRole(e.target.value)
        }
        type="text"
        placeholder="Work position"
        height="40px"
        list="roles"
        margin="0 0 10px 0"
      />
    ),
    [role]
  );
  const StartDateInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={startDate}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
        type="date"
        width="60%"
        height="40px"
        margin="0 0 10px 0"
      />
    ),
    [startDate]
  );
  const PasswordInput: JSX.Element = useMemo(
    () => (
      <Input
        outline="none"
        value={userPassword}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserPassword(e.target.value)
        }
        type="password"
        placeholder="Password"
        height="40px"
        margin="0 0 10px 0"
      />
    ),
    [userPassword]
  );

  const CheckPasswordInput: JSX.Element = useMemo(
    () => (
      <InputComponent
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        type="password"
        placeholder="Repeat password"
        height="40px"
        width="100%"
        error={errors?.invalidPassword}
        margin="0 0 30px 0"
      />
    ),
    [confirmPassword, errors?.invalidPassword]
  );

  return (
    <Modal close={closeModal}>
      <Form
        
        submit={getInformation}
        content="Create account"
      >
        <Flex justify="space-between" width="100%">
          {NameInput}
          {SurnameInput}
        </Flex>
        {PhoneInput}
        {RoleInput}
        <datalist id="roles">
          {Object.values(workPositions).map((position) => (
            <option key={position} value={position} />
          ))}
        </datalist>
        <Flex justify="space-between" width="100%">
          <UserText size="15px">Start work since: </UserText>
          {StartDateInput}
        </Flex>
        {EmailInput}
        {PasswordInput}
        {CheckPasswordInput}
        <Button width="30%" height="50px">
          Create account
        </Button>
      </Form>
    </Modal>
  );
};
