import { useMemo } from "react";
import { UserBlockItem, UserTitle } from "../../../styled-components/UserForm";
import { ContactsInfo } from "./ContactsInfo";
import { SocialInfo } from "./SocialInfo";
import { PersonalInfo } from "./PersonalInfo";
import { Flex } from "../../../styled-components/Flex";
import { Button } from "components/Button";

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
          <Button padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Flex justify="space-between" align="center">
          <UserTitle>Education</UserTitle>
          <Button padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </Flex>
      </UserBlockItem>
      <UserBlockItem>
        <Flex justify="space-between" align="center">
          <UserTitle>Licenses and certificates</UserTitle>
          <Button padding="5px 10px" height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </Flex>
      </UserBlockItem>
    </>
  );
};
