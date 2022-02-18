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
  console.log("asda", user);
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
            <UserText>Work position: {user.company.bs}</UserText>
            <UserText>Location: {user.address.city}</UserText>
          </Flex>
          <Flex
            wrap="wrap"
            direction="column"
            content="space-around"
            width="100%"
          >
            <UserText>Email: {user.email}</UserText>
            <UserText>Phone: {user.phone}</UserText>
          </Flex>
        </Flex>
      </MainUserInformationMenu>

      <Flex>
        <UserBlockItem width="50%">
          <UserTitle padding="10px">Info about User</UserTitle>
          <UserText>Username:{user.username}</UserText>
          <UserText>Address: {user.address.street}</UserText>
          <UserText>
            {user.address.suite}
            {user.address.city}
          </UserText>
        </UserBlockItem>

        <UserBlockItem width="100%">
          <Tabs />
        </UserBlockItem>
      </Flex>
      <Flex>
        <UserBlockItem width="40%">
          <UserTitle>Employee manager</UserTitle>
        </UserBlockItem>
        <UserBlockItem width="80%">
          <UserTitle>Contact</UserTitle>
          <UserText>Phone: {user.phone}</UserText>
          <UserText>Adress:</UserText>
          <UserText>street:{user.address.street}</UserText>
          <UserText>suite: {user.address.suite}</UserText>
          <UserText>city: {user.address.city}</UserText>
        </UserBlockItem>
      </Flex>
      <Flex>
        <UserBlockItem width="20%">
          <UserTitle>Employee subordinate</UserTitle>
        </UserBlockItem>
        <UserBlockItem width="80%">
          <UserTitle>Social</UserTitle>
        </UserBlockItem>
      </Flex>
      <Flex>
        <UserBlockItem>
          <UserTitle width="100%">Teams</UserTitle>
        </UserBlockItem>
        <UserBlockItem>
          <UserTitle width="">Skills</UserTitle>
        </UserBlockItem>
        <UserBlockItem></UserBlockItem>
        <ButtonStyled>Look at organizational structure</ButtonStyled>
      </Flex>
    </UserWindow>
  );
}
