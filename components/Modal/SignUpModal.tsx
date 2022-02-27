import styled, { keyframes } from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { Form } from "components/form/Form";
import { Input } from "components/form/Input";
import { Button } from "components/Button";
import { ErrorText } from "components/form/ErrorText";
import { useRouter } from "next/router";
import { UserText } from "components/User/UserForm";
import moment from "moment";

const SignUpAnimation = keyframes`
  from {
    left: -100px;
  }

  to {
    left: 50%;
  }
`;
const SignUpPage = styled.div`
  display: ${(props: {display: string}) => props.display};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${SignUpAnimation}  0.6s ease-in-out ;
  z-index: 99;
`;
const Fullname = styled.div`
  width: 102%;
  display: flex;
  justify-content: space-between;
`;
const RoleContainer = styled.div`
  width: 100%;
  height: 67px;
  margin: 0;
  padding: 0;
  :hover div {
    transform: rotate(0);
  }
`;
const RoleArrow = styled.div`
  margin: 0;
  width: 20px;
  height: 40px;
  background: #d0d0d0;
  position: relative;
  top: -41px;
  left: 96%;
  transform: rotate(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartDateContainer = styled.div`
  width: 102%;
  display: flex;
  justify-content: space-between;
`;

type Errors = {
  [key: string]: string;
};

export const SignUpModal = ({ users, display }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [userPassword, setUserPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errors, setErrors] = useState<Errors | null>(null);
  const router = useRouter();
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
      <Input
        outline="none"
        value={userEmail}
        setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUserEmail(e.target.value)
        }
        type="email"
        placeholder="Email"
        height="40px"
        marginBottom="0"
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
        margin="0 25px 0 0"
        marginBottom="25px"
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
        marginBottom="25px"
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
        marginBottom="25px"
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
        placeholder="222"
        marginBottom="25px"
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
        marginBottom="25px"
      />
    ),
    [userPassword]
  );

  const CheckPasswordInput: JSX.Element = useMemo(
    () => (
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
        marginBottom="0"
      />
    ),
    [checkPassword, errors?.invalidPassword]
  );

  return (
    <SignUpPage display={display}>
      <Form submit={getInformation} content="Create admin account">
        <div>
          <Fullname>
            {NameInput}
            {SurnameInput}
          </Fullname>
          {PhoneInput}
          <RoleContainer>
            {RoleInput}
            <datalist id="roles">
              {Object.values(workPositions).map((position) => (
                <option key={position} value={position} />
              ))}
            </datalist>
            <RoleArrow>
              <span>▲</span>
            </RoleArrow>
          </RoleContainer>
          <StartDateContainer>
            <UserText size="15px">Start work since: </UserText>
            {StartDateInput}
          </StartDateContainer>

          {EmailInput}
          <ErrorText background={errors?.userExist ? "#ffe7e6" : "transparent"}>
            {errors?.userExist}
          </ErrorText>
          {PasswordInput}
          {CheckPasswordInput}
          <ErrorText
            background={errors?.invalidPassword ? "#ffe7e6" : "transparent"}
          >
            {errors?.invalidPassword}
          </ErrorText>
        </div>
        <Button width="30%" margin=" 0 0 35px 0" height="50px">
          Create account
        </Button>
      </Form>
    </SignUpPage>
  );
};
