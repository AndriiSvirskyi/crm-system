import { UserBlockItem, UserTitle } from "./UserForm";
import { Button } from "components/Button";
import { PersonalInfo, FlexContainer } from "./personalTab/PersonalInfo";
import { ContactsInfo } from "./personalTab/ContactsInfo";
import { SocialInfo } from "./personalTab/SocialInfo";
import { useMemo } from "react";

export const Personal = ({ user }) => {
  const PersonalInfoMemo = useMemo(() => <PersonalInfo user={user}/>, [user]);
  const ContactsInfoMemo = useMemo(() => <ContactsInfo user={user}/>, [user]);
  const SocialInfoMemo = useMemo(() => <SocialInfo user={user}/>, [user]);

  return (
    <>
      {PersonalInfoMemo}
      {ContactsInfoMemo}
      {SocialInfoMemo}
      <UserBlockItem>
        <FlexContainer justify="space-between">
          <UserTitle>Skills</UserTitle>
          <Button height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </FlexContainer>
      </UserBlockItem>
      <UserBlockItem>
        <FlexContainer justify="space-between">
          <UserTitle>Education</UserTitle>
          <Button height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </FlexContainer>
      </UserBlockItem>
      <UserBlockItem>
        <FlexContainer justify="space-between">
          <UserTitle>Licenses and certificates</UserTitle>
          <Button height="25px" margin=" 0 20px 0 0">
            ADD
          </Button>
        </FlexContainer>
      </UserBlockItem>
    </>
  );
};
