import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "components/Button";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Input } from "components/form/Input";
import { Label, FlexContainer } from "./Label&FlexContainer";

const Anchor = styled.a`
  text-decoration: none;
  color: black;
  font-size: 13px;
  padding: 0 0 0 25px;
  &:hover {
    color: #413b3b92;
  }
`;

export const SocialInfo = ({ user }) => {
  const {
    facebook: facebookUser,
    linkedin: linkedinUser,
    twitter: twitterUser,
  } = user.links;
  const [facebook, setFacebook] = useState(facebookUser);
  const [linkedin, setLinkedin] = useState(linkedinUser);
  const [twitter, setTwitter] = useState(twitterUser);

  const [socialInfoEdit, setSocialInfoEdit] = useState<any>();

  const updateSocial = async () => {
    setSocialInfoEdit(false);
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
        company: user.company,
        department: user.department,
        unit: user.unit,
        team: user.team,
        birth: user.birth,
        gender: user.gender,
        mobile: user.mobile,
        username: user.username,
        address: user.address,
        links: {
          facebook: facebook,
          linkedin: linkedin,
          twitter: twitter,
        },
      }),
    });
  };

  return (
    <UserBlockItem>
      <FlexContainer justify="space-between">
        <UserTitle>Social</UserTitle>
        <Button
          height="25px"
          margin=" 0 20px 0 0"
          onClick={() => {
            setSocialInfoEdit({
              facebook,
              linkedin,
              twitter,
            });
          }}
        >
          ADD
        </Button>
      </FlexContainer>
      <FlexContainer>
        <Label htmlFor="facebook">
          Facebook URL
        </Label>
        {socialInfoEdit ? (
          <Input
            id="facebook"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            setValue={(e) => setFacebook(e.target.value)}
            value={facebook}
            type="text"
            background="transparent"
            height="30px"
            readonly={false}
          />
        ) : (
          <Link href={facebook} passHref={true}>
            <Anchor target="_blank">{facebook}</Anchor>
          </Link>
        )}
      </FlexContainer>
      <FlexContainer>
        <Label htmlFor="linkedin">
          LinkedIn URL
        </Label>
        {socialInfoEdit ? (
          <Input
            id="linkedin"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            setValue={(e) => setLinkedin(e.target.value)}
            value={linkedin}
            type="text"
            background="transparent"
            height="30px"
            readonly={false}
          />
        ) : (
          <Link href={linkedin} passHref={true}>
            <Anchor target="_blank">{linkedin}</Anchor>
          </Link>
        )}
      </FlexContainer>
      <FlexContainer margin="0 0 40px 0">
        <Label htmlFor="twitter">
          Twitter Username
        </Label>
        {socialInfoEdit ? (
          <Input
            id="twitter"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            setValue={(e) => setTwitter(e.target.value)}
            value={twitter}
            type="text"
            background="transparent"
            height="30px"
            readonly={false}
          />
        ) : (
          <Link href={twitter} passHref={true}>
            <Anchor target="_blank">{twitter}</Anchor>
          </Link>
        )}
      </FlexContainer>
      {socialInfoEdit ? (
        <FlexContainer padding="0 0 10px 0" justify="end">
          <Button
            margin=" 0 20px 0 0"
            onClick={() => {
              const { facebook, linkedin, twitter } = socialInfoEdit;
              setFacebook(facebook);
              setLinkedin(linkedin);
              setTwitter(twitter);
              setSocialInfoEdit(null);
            }}
          >
            CANCEL
          </Button>
          <Button margin=" 0 20px 0 0" onClick={updateSocial}>
            SAVE
          </Button>
        </FlexContainer>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
