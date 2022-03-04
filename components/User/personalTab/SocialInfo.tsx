import { useState } from "react";
import styled from "styled-components";
import { UserBlockItem, UserTitle } from "../UserForm";
import { Label } from "./Label";
import router from "next/router";
import { InputComponent } from "components/InputComponent";
import { Flex } from "../Flex";
import { ButtonStyled } from "components/ButtonStyled";

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
        project: user.project,
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
      <Flex justify="space-between" align="center">
        <UserTitle>Social</UserTitle>
        <ButtonStyled
          padding="5px 10px"
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
        </ButtonStyled>
      </Flex>
      <Flex>
        <Label htmlFor="facebook">Facebook URL</Label>
        {socialInfoEdit ? (
          <InputComponent
            id="facebook"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFacebook(e.target.value)
            }
            value={facebook}
            type="text"
            background="transparent"
            width="100%"
            height="30px"
            readonly={false}
          />
        ) : (
          <div onClick={() => router.push(facebook)}>
            <Anchor>{facebook}</Anchor>
          </div>
        )}
      </Flex>
      <Flex>
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        {socialInfoEdit ? (
          <InputComponent
            id="linkedin"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLinkedin(e.target.value)
            }
            value={linkedin}
            type="text"
            background="transparent"
            width="100%"
            height="30px"
            readonly={false}
          />
        ) : (
          <div onClick={() => router.push(linkedin)}>
            <Anchor target="_blank">{linkedin}</Anchor>
          </div>
        )}
      </Flex>
      <Flex margin="0 0 40px 0">
        <Label htmlFor="twitter">Twitter Username</Label>
        {socialInfoEdit ? (
          <InputComponent
            id="twitter"
            outline={socialInfoEdit ? "1px solid grey" : "none"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTwitter(e.target.value)
            }
            value={twitter}
            type="text"
            background="transparent"
            width="100%"
            height="30px"
            readonly={false}
          />
        ) : (
          <div onClick={() => router.push(twitter)}>
            <Anchor target="_blank">{twitter}</Anchor>
          </div>
        )}
      </Flex>
      {socialInfoEdit ? (
        <Flex padding="0 0 10px 0" justify="end">
          <ButtonStyled
            padding="5px 10px"
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
          </ButtonStyled>
          <ButtonStyled
            padding="5px 10px"
            margin=" 0 20px 0 0"
            onClick={updateSocial}
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
