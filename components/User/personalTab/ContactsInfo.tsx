import { useState } from "react";
import { Button } from "components/Button";
import { FlexContainer, Label } from "./PersonalInfo";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Input } from "components/form/Input";

export const ContactsInfo = ({ user }) => {
  const {
    mobile: mobileUser,
    username: usernameUser,
    address: addressUser,
  } = user;
  const [mobile, setMobile] = useState(mobileUser);
  const [username, setUsername] = useState(usernameUser);
  const [address, setAddress] = useState(addressUser);
  
  const [contactsInfoEdit, setContactsInfoEdit] = useState<any>();

  const updateContacts = async () => {
    setContactsInfoEdit(false);
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname,
        role: user.role,
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
      <FlexContainer justify="space-between">
        <UserTitle>Contact</UserTitle>
        <Button
          height="25px"
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
        </Button>
      </FlexContainer>
      <div>
        <Label htmlFor="number" width="20%">
          Mobile number
        </Label>
        <Input
          id="number"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setMobile(e.target.value)}
          value={mobile}
          type="text"
          background="transparent"
          width="60%"
          height="30px"
          readonly={contactsInfoEdit ? false : true}
        />
      </div>
      <div>
        <Label htmlFor="username" width="20%">
          Slack Username
        </Label>
        <Input
          id="username"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          background="transparent"
          width="60%"
          height="30px"
          readonly={contactsInfoEdit ? false : true}
        />
      </div>
      <div>
        <Label htmlFor="address" width="20%">
          Address
        </Label>
        <Input
          id="address"
          outline={contactsInfoEdit ? "1px solid grey" : "none"}
          setValue={(e) => setAddress(e.target.value)}
          value={address}
          type="text"
          background="transparent"
          width="60%"
          height="30px"
          marginBottom="40px"
          readonly={contactsInfoEdit ? false : true}
        />
      </div>
      {contactsInfoEdit ? (
        <FlexContainer padding="0 0 10px 0" justify="end">
          <Button
            margin=" 0 20px 0 0"
            onClick={() => {
              const { mobile, username, address } = contactsInfoEdit;
              setMobile(mobile);
              setUsername(username);
              setAddress(address);
              setContactsInfoEdit(null);
            }}
          >
            CANCEL
          </Button>
          <Button margin=" 0 20px 0 0" onClick={updateContacts}>
            SAVE
          </Button>
        </FlexContainer>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
