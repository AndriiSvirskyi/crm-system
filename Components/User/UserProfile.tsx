import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import Tabs from "components/User/TabsUser";
import {
  MainUserInformationMenu,
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "./UserForm";

export default function UserProfile({ user }) {
  return (
    <UserWindow>
      <MainUserInformationMenu>
        <Flex justify="end" padding="10px" wrap="wrap">
          <ButtonStyled>Edit Profile</ButtonStyled>
        </Flex>
        <ButtonStyled margin="10px">Icon Image</ButtonStyled>
        <UserTitle size="37px" margin="0 0 0 5em">
          {user.name}
        </UserTitle>
        <Flex>
          <Flex
            wrap="wrap"
            direction="column"
            content="space-around"
            width="100%"
          >
            <UserText>Work position: {user.company}</UserText>
            <UserText>Location: {user.address}</UserText>
          </Flex>
          <Flex
            wrap="wrap"
            direction="column"
            content="space-around"
            width="100%"
          >
            <UserText>Email: {user.email}</UserText>
            <UserText>Phone: {user.mobile}</UserText>
          </Flex>
        </Flex>
      </MainUserInformationMenu>
      <Flex>
        <UserBlockItem width="50%">
          <UserTitle padding="10px">Info about User</UserTitle>
          <UserText>Username:{user.username}</UserText>
          <UserText>Address: {user.address}</UserText>
          <UserText>
            {user.address}
            {user.address}
          </UserText>
        </UserBlockItem>
        <Tabs user={user} />
      </Flex>
      <Flex>
        <UserBlockItem width="40%">
          <UserTitle>Employee manager</UserTitle>
        </UserBlockItem>
      </Flex>
      <Flex>
        <UserBlockItem width="20%">
          <UserTitle>Employee subordinate</UserTitle>
        </UserBlockItem>
      </Flex>
      <Flex>
        <UserBlockItem>
          <UserTitle width="100%">Teams</UserTitle>
        </UserBlockItem>
        <UserBlockItem></UserBlockItem>
        <ButtonStyled>Look at organizational structure</ButtonStyled>
      </Flex>
    </UserWindow>
  );
}
