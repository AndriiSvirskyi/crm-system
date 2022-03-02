import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import Tabs from "components/User/TabsUser";
import { UserBlockItem, UserText, UserTitle } from "./UserForm";
import { RemoveUserModal } from "components/Modal/RemoveUserModal";

const IconContainer = styled.div`
  width: 235px;
  height: 235px;
  border-radius: 50%;
  background: #d0d0d0;
  margin: 0 80px 0 0;
`;

export default function UserProfile({ user }) {
  const [askToRemove, setAskToRemove] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    setUserRole(JSON.parse(currentUser).role);
  }, [currentUser]);

  const removeUser = async () => {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    router.push("/employees");
  };

  return (
    <Flex direction="column" padding="0 20px 0 0">
      <UserBlockItem>
        <Flex height="300px" align="center" justify="space-between">
          <Flex>
            <IconContainer></IconContainer>
            <div>
              <UserTitle margin="0" padding="0" size="37px">
                {user.name} {user.surname}
              </UserTitle>
              <UserText>Work position: {user.company}</UserText>
              <UserText>Location: {user.address}</UserText>
              <UserText>Email: {user.email}</UserText>
              <UserText>Phone: {user.mobile}</UserText>
            </div>
          </Flex>
          {userRole === "admin" && (
            <ButtonStyled height="40px" onClick={() => setAskToRemove(true)}>
              Remove
            </ButtonStyled>
          )}
        </Flex>
      </UserBlockItem>
      {askToRemove && (
        <RemoveUserModal
          yes={() => removeUser()}
          no={() => setAskToRemove(false)}
        ></RemoveUserModal>
      )}
      <Flex>
        <UserBlockItem width="50%">
          <UserTitle margin="0" padding="0">
            Info about User
          </UserTitle>
          <UserText>Username: {user.username}</UserText>
          <UserText>Address: {user.address}</UserText>
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
