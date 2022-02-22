import { useState } from "react";
import styled from "styled-components";
import { Button } from "components/Button";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Input } from "components/form/Input";

type FlexContainerProps = {
  padding?: string;
  justify: string;
};
export const FlexContainer = styled.div<FlexContainerProps>`
  padding: ${({ padding }) => padding};
  display: inline-block;
  width: 100%;
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: center;
`;
export const Label = styled.label`
  cursor: pointer;
  width: ${(props: { width?: string }) => props.width};
  padding: 10px;
  margin: 0 5px 1px 10px;
  color: #6b7280;
  display: inline-block;
`;

export const PersonalInfo = ({ user }) => {
  const {
    name: nameUser,
    surname: surnameUser,
    email: emailUser,
    birth: birthUser,
    gender: genderUser,
  } = user;
  const [name, setName] = useState(nameUser);
  const [surname, setSurname] = useState(surnameUser);
  const [email, setEmail] = useState(emailUser);
  const [birth, setBirth] = useState(birthUser);
  const [gender, setGender] = useState(genderUser);
  const [personalInfoEdit, setPersonalInfoEdit] = useState<any>();
  const updatePersonal = async () => {
    setPersonalInfoEdit(false);
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: email,
        password: user.password,
        name: name,
        surname: surname,
        role: user.role,
        company: user.company,
        department: user.department,
        unit: user.unit,
        team: user.team,
        birth: birth,
        gender: gender,
        mobile: user.mobile,
        username: user.username,
        address: user.address,
        links: {
          facebook: user.links.facebook,
          linkedin: user.links.linkedin,
          twitter: user.links.twitter,
        },
      }
    ),
    });
  };

  return (
    <UserBlockItem>
      <FlexContainer justify="space-between">
        <UserTitle>Personal</UserTitle>
        <Button
          height="25px"
          margin=" 0 20px 0 0"
          onClick={() => {
            setPersonalInfoEdit({
              name,
              surname,
              birth,
              email,
              gender,
            });
          }}
        >
          EDIT
        </Button>
      </FlexContainer>
      <div>
        <Label htmlFor="id" width="15%">
          Employee ID
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          type="text"
          id="id"
          background="transparent"
          width="70%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </div>
      <FlexContainer justify="space-between">
        <Label htmlFor="last_name" width="14%">
          First name
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="last_name"
          background="transparent"
          width="auto"
          height="30px"
          margin="0 20px 0 0"
          readonly={personalInfoEdit ? false : true}
        />
        <Label htmlFor="first_name" width="15%">
          Last name
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setSurname(e.target.value)}
          value={surname}
          type="text"
          id="first_name"
          background="transparent"
          margin="0 40px 0 0"
          width="auto"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </FlexContainer>
      <div>
        <Label htmlFor="email" width="15%">
          Email
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          id="email"
          background="transparent"
          width="70%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </div>
      <div>
        <Label htmlFor="birthday" width="15%">
          Date of birth
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setBirth(e.target.value)}
          value={birth}
          type="text"
          id="birthday"
          background="transparent"
          width="70%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </div>
      <div>
        <Label htmlFor="gender" width="15%">
          Gender
        </Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setGender(e.target.value)}
          value={gender}
          type="text"
          id="gender"
          background="transparent"
          width="70%"
          height="30px"
          marginBottom="40px"
          readonly={personalInfoEdit ? false : true}
        />
      </div>
      {personalInfoEdit ? (
        <FlexContainer padding="0 0 10px 0" justify="end">
          <Button
            margin=" 0 20px 0 0"
            onClick={() => {
              const { name, surname, birth, email, gender } = personalInfoEdit;
              setName(name);
              setSurname(surname);
              setBirth(birth);
              setEmail(email);
              setGender(gender);
              setPersonalInfoEdit(null);
            }}
          >
            CANCEL
          </Button>
          <Button margin=" 0 20px 0 0" onClick={updatePersonal}>
            SAVE
          </Button>
        </FlexContainer>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
