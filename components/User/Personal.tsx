import { UserBlockItem, UserTitle } from "./UserForm";
import { Button } from "components/Button";
import { PersonalInfo, FlexContainer } from "./personalTab/PersonalInfo";
import { ContactsInfo } from "./personalTab/ContactsInfo";
import { SocialInfo } from "./personalTab/SocialInfo";

export const Personal = ({ user, users }) => {
  return (
    <>
      <PersonalInfo user={user} users={users}/>
      <ContactsInfo user={user} />
      <SocialInfo user={user} />
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
