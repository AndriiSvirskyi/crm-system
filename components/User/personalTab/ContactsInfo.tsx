import { useEffect, useState } from "react";
import { Label } from "./Label";
import { UserBlockItem, UserTitle } from "../UserForm";
import { InputComponent } from "components/InputComponent";
import { Flex } from "../Flex";
import { ButtonStyled } from "components/ButtonStyled";

export const ContactsInfo = ({ user }) => {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const {
      mobile: mobileUser,
      username: usernameUser,
      address: addressUser,
    } = user;
    setMobile(mobileUser || "");
    setUsername(usernameUser || "");
    setAddress(addressUser || "");
  }, [user]);

  const [contactsInfoEdit, setContactsInfoEdit] = useState<any>();

  const updateContacts = async () => {
    setContactsInfoEdit(false);
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
        role: user.role,
        project: user.project,
        company: user.company,
        department: user.department,
        unit: user.unit,
        team: user.team,
        birth: user.birth,
        gender: user.gender,
        mobile: mobile,
        username: username,
        address: address,
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
        <UserTitle>Contact</UserTitle>
        <ButtonStyled
          height="25px"
          padding="5px 10px"
          margin=" 0 20px 0 0"
          onClick={() => {
            setContactsInfoEdit({
              mobile,
              username,
              address,
            });
          }}
        >
          EDIT
        </ButtonStyled>
      </Flex>
      <Flex>
        <Label htmlFor="number">Mobile number</Label>
        <InputComponent
          id="number"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMobile(e.target.value)
          }
          value={mobile}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={contactsInfoEdit ? false : true}
        />
      </Flex>
      <Flex>
        <Label htmlFor="username">Slack Username</Label>
        <InputComponent
          id="username"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          value={username}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={contactsInfoEdit ? false : true}
        />
      </Flex>
      <Flex margin="0 0 40px 0">
        <Label htmlFor="address">Address</Label>
        <InputComponent
          id="address"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
          value={address}
          type="text"
          background="transparent"
          width="100%"
          height="30px"
          readonly={contactsInfoEdit ? false : true}
        />
      </Flex>
      {contactsInfoEdit ? (
        <Flex padding="0 0 10px 0" justify="end">
          <ButtonStyled
            padding="5px 10px"
            margin="0 20px 0 0"
            onClick={() => {
              const { mobile, username, address } = contactsInfoEdit;
              setMobile(mobile);
              setUsername(username);
              setAddress(address);
              setContactsInfoEdit(null);
            }}
          >
            CANCEL
          </ButtonStyled>
          <ButtonStyled
            padding="5px 10px"
            margin=" 0 20px 0 0"
            onClick={updateContacts}
          >
            SAVE
          </ButtonStyled>
        </Flex>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
