import { useState } from "react";
import { Button } from "components/Button";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Label } from "./Label";
import { InputComponent } from "components/InputComponent";
import { Flex } from "../Flex";

export const PersonalInfo = ({ user }) => {
  const {
    id: idUser,
    name: nameUser,
    surname: surnameUser,
    email: emailUser,
    birth: birthUser,
    gender: genderUser,
  } = user;
  const [id, setId] = useState(idUser);
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
    <UserBlockItem>
      <Flex justify="space-between" align="center">
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
      </Flex>
      <Flex justify="space-between">
        <Label htmlFor="employee_id">Employee ID</Label>
        <InputComponent
          id="employee_id"
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setId(e.target.value)
          }
          value={id}
          type="text"
          background="transparent"
          height="30px"
          width="100%"
          readonly={personalInfoEdit ? false : true}
        />
      </Flex>
      <Flex justify="space-between" >
        <Flex align="center">
          <Label htmlFor="last_name">First name</Label>
          <InputComponent
            id="last_name"
            outline={personalInfoEdit ? "1px solid grey" : "none"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            type="text"
            background="transparent"
            margin="0 30px 0 0"
            width="100%"
            height="30px"
            readonly={personalInfoEdit ? false : true}
          />
        </Flex>
        <Flex align="center">
          <Label htmlFor="first_name">Last name</Label>
          <InputComponent
            id="first_name"
            outline={personalInfoEdit ? "1px solid grey" : "none"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSurname(e.target.value)
            }
            value={surname}
            type="text"
            background="transparent"
            width="100%"
            height="30px"
            readonly={personalInfoEdit ? false : true}
          />
        </Flex>
      </Flex>
      <Flex justify="space-between">
        <Label htmlFor="email">Email</Label>
        <InputComponent
          id="email"
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </Flex>
      <Flex justify="space-between">
        <Label htmlFor="birthday">Date of birth</Label>
        <InputComponent
          id="birthday"
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirth(e.target.value)
          }
          value={birth}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </Flex>
      <Flex justify="space-between" margin="0 0 40px 0">
        <Label htmlFor="gender">Gender</Label>
        <InputComponent
          id="gender"
          outline={personalInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGender(e.target.value)
          }
          value={gender}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={personalInfoEdit ? false : true}
        />
      </Flex>
      {personalInfoEdit ? (
        <Flex padding="0 0 10px 0" justify="end">
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
        </Flex>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
