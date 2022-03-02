import styled, { keyframes } from "styled-components";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Form } from "components/form/Form";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import router from "next/router";
import { UserText } from "components/User/UserForm";

const SignUpAnimation = keyframes`
  from {
    left: -100px;
  }

  to {
    left: 50%;
  }
`;
const SignUpPage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${SignUpAnimation} 0.6s ease-in-out;
  z-index: 1;
`;
const Fullname = styled.div`
  width: 101%;
  display: flex;
  justify-content: space-between;
`;
const StartDateContainer = styled.div`
  width: 101%;
  display: flex;
  justify-content: space-between;
`;
const ErrorInputContainer = styled.div`
  position: relative;
  width: 100%;
  left: -3px;
`;
const ErrorText = styled.p`
  position: absolute;
  font-size: 12px;
  top: 2px;
  right: 0;
  color: red;
`;
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
  const [checkPassword, setCheckPassword] = useState("");
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
      if (userPassword !== checkPassword) {
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
        setCheckPassword("");
        setErrors(null);
      }
    }
  };

  const EmailInput: JSX.Element = useMemo(
    () => (
      <ErrorInputContainer>
        <Input
          outline="none"
          value={userEmail}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserEmail(e.target.value)
          }
          type="email"
          placeholder="Email"
          height="40px"
          marginBottom="10px"
          error={errors?.userExist}
        />
        <ErrorText>{errors?.userExist}</ErrorText>
      </ErrorInputContainer>
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
      <ErrorInputContainer>
        <Input
          outline="none"
          value={checkPassword}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCheckPassword(e.target.value)
          }
          type="password"
          placeholder="Repeat password"
          height="40px"
          error={errors?.invalidPassword}
          margin="0 0 30px 0"
        />
        <ErrorText>{errors?.invalidPassword}</ErrorText>
      </ErrorInputContainer>
    ),
    [checkPassword, errors?.invalidPassword]
  );

  return (
    <SignUpPage>
      <Form
        closeModal={closeModal}
        submit={getInformation}
        content="Create account"
      >
        <Fullname>
          {NameInput}
          {SurnameInput}
        </Fullname>
        {PhoneInput}
        {RoleInput}
        <datalist id="roles">
          {Object.values(workPositions).map((position) => (
            <option key={position} value={position} />
          ))}
        </datalist>
        <StartDateContainer>
          <UserText size="15px">Start work since: </UserText>
          {StartDateInput}
        </StartDateContainer>
        {EmailInput}
        {PasswordInput}
        {CheckPasswordInput}
        <Button width="30%" height="50px">
          Create account
        </Button>
      </Form>
    </SignUpPage>
  );
};
