import { useMemo } from "react";
import { UserBlockItem, UserTitle } from "../UserForm";
import { ContactsInfo } from "./ContactsInfo";
import { SocialInfo } from "./SocialInfo";
import { PersonalInfo } from "./PersonalInfo";
import { Flex } from "../Flex";
import { ButtonStyled } from "components/ButtonStyled";

export const Personal = ({ user }) => {
  const PersonalInfoMemo = useMemo(() => <PersonalInfo user={user} />, [user]);
  const ContactsInfoMemo = useMemo(() => <ContactsInfo user={user} />, [user]);
  const SocialInfoMemo = useMemo(() => <SocialInfo user={user} />, [user]);

  return (
    <>
      {PersonalInfoMemo}
      {ContactsInfoMemo}
      {SocialInfoMemo}
      <UserBlockItem>
        <Flex justify="space-between" align="center">
          <UserTitle>Skills</UserTitle>
          <ButtonStyled padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </ButtonStyled>
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Flex justify="space-between" align="center">
          <UserTitle>Education</UserTitle>
          <ButtonStyled padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </ButtonStyled>
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Flex justify="space-between" align="center">
          <UserTitle>Licenses and certificates</UserTitle>
          <ButtonStyled padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </ButtonStyled>
        </Flex>
      </UserBlockItem>
    </>
  );
};
