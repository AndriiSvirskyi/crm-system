import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserBlockItem, UserTitle } from "../../../styled-components/UserForm";
import { Label } from "../../../styled-components/Label";
import router from "next/router";
import { Input } from "components/Input";
import { Flex } from "../../../styled-components/Flex";
import { Button } from "components/Button";

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
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [socialInfoEdit, setSocialInfoEdit] = useState<any>();

  useEffect(() => {
    const {
      facebook: facebookUser,
      linkedin: linkedinUser,
      twitter: twitterUser,
    } = user.links;
    setFacebook(facebookUser || "");
    setLinkedin(linkedinUser || "");
    setTwitter(twitterUser || "");
  }, [user]);

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
        division: user.division,
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
        <Button
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
        </Button>
      </Flex>
      <Flex>
        <Label width="130px" htmlFor="facebook">
          Facebook URL
        </Label>
        {socialInfoEdit ? (
          <Input
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
        <Label width="130px" htmlFor="linkedin">
          LinkedIn URL
        </Label>
        {socialInfoEdit ? (
          <Input
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
        <Label width="130px" htmlFor="twitter">
          Twitter Username
        </Label>
        {socialInfoEdit ? (
          <Input
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
          <Button
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
          </Button>
          <Button
            padding="5px 10px"
            margin=" 0 20px 0 0"
            onClick={updateSocial}
          >
            SAVE
          </Button>
        </Flex>
      ) : (
        ""
      )}
    </UserBlockItem>
  );
};
