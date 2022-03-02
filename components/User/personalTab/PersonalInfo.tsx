import { useEffect, useState } from "react";
import { Button } from "components/Button";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Input } from "components/form/Input";
import { Label, FlexContainer } from "./Label&FlexContainer";

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
        project: user.project,
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
      }),
    });
  };

  return (
    <UserBlockItem >
      <FlexContainer justify="space-between">
        <UserTitle>Personal</UserTitle>
        {
          <Button
            height="25px"
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
        }
      </FlexContainer>
      <FlexContainer justify="space-between">
        <Label htmlFor="employee_id">Employee ID</Label>
        <Input
          value=""
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          type="text"
          id="employee_id"
          background="transparent"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </FlexContainer>
      <FlexContainer justify="space-between">
        <FlexContainer>
          <Label htmlFor="last_name">First name</Label>
          <Input
            outline={personalInfoEdit ? "1px solid grey" : "none"}
            setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            type="text"
            id="last_name"
            background="transparent"
            margin="0 30px 0 0"
            width="auto"
            height="30px"
            readonly={personalInfoEdit ? false : true}
          />
        </FlexContainer>
        <FlexContainer>
          <Label htmlFor="first_name">Last name</Label>
          <Input
            outline={personalInfoEdit ? "1px solid grey" : "none"}
            setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSurname(e.target.value)
            }
            value={surname}
            type="text"
            id="first_name"
            background="transparent"
            width="auto"
            height="30px"
            readonly={personalInfoEdit ? false : true}
          />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer justify="space-between">
        <Label htmlFor="email">Email</Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
          type="text"
          id="email"
          background="transparent"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </FlexContainer>
      <FlexContainer justify="space-between">
        <Label htmlFor="birthday">Date of birth</Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirth(e.target.value)
          }
          value={birth}
          type="text"
          id="birthday"
          background="transparent"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </FlexContainer>
      <FlexContainer justify="space-between" margin="0 0 40px 0">
        <Label htmlFor="gender">Gender</Label>
        <Input
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          setValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGender(e.target.value)
          }
          value={gender}
          type="text"
          id="gender"
          background="transparent"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </FlexContainer>
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
