import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import Tabs from "components/User/TabsUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MainUserInformationMenu,
  UserBlockItem,
  UserText,
  UserTitle,
} from "./UserForm";

export default function UserProfile({ user }) {
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();
  const router = useRouter();

  useEffect(() => {
    setUserRole(JSON.parse(currentUser).role);
  }, [currentUser]);

  const deleteUser = async () => {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    router.push("/employees");
  };

  return (
    <Flex direction="column" padding=" 0 10px 0 0">
      <MainUserInformationMenu>
        {userRole === "admin" && (
          <Flex justify="end" padding="10px" wrap="wrap">
            <ButtonStyled onClick={() => deleteUser()}>Remove</ButtonStyled>
          </Flex>
        )}
        <ButtonStyled margin="10px">Icon Image</ButtonStyled>
        <UserTitle size="37px" margin="0 0 0 5em">
          {user.name} {user.surname}
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
    </Flex>
  );
}
