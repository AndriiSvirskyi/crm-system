import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import Tabs from "components/User/TabsUser";
import { UserBlockItem, UserText, UserTitle } from "./UserForm";
import { RemoveUserModal } from "components/modal/RemoveUserModal";
import { FaSitemap, FaUserCheck, FaUsers, FaUserTie } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";
import { Anchor } from "pages/projects";

const IconContainer = styled.div`
  width: 235px;
  height: 235px;
  border-radius: 50%;
  background: #d0d0d0;
  margin: 0 80px 0 0;
`;
const ReportsContainer = styled.div`
  cursor: pointer;
  padding: 0 0 10px 0;
  display: flex;
  align-items: center;
  list-style: none;
  align-self: stretch;
  span {
    margin: 0 0 0 20px;
  }
  border-bottom: 1px solid #d5d6d6;
`;
const GeneralInfoTitle = styled.p`
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 5px;
  padding: 0;
`;
const GeneralInfoP = styled.p`
  padding: 0;
  margin: 0;
`;
const UnitContainer = styled.p`
  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #d5d6d699;
`;

export default function UserProfile({ user }) {
  const [askToRemove, setAskToRemove] = useState(false);
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [userRole, setUserRole] = useState();
  const users = useRecoilValue(usersState);

  useEffect(() => {
    setUserRole(JSON.parse(currentUser).role);
  }, [currentUser]);

  useEffect(() => {
    if (!users) {
      const response = fetch(`http://localhost:4200/users`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
  }, []);

  const removeUser = async () => {
    await fetch(`http://localhost:4200/users/${user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    router.push("/employees");
  };

  const superintendent = users
    ? users.find((person) => person.id === user.superintendent)
    : [];

  const subordinates = users
    ? users.reduce((acc, cur) => {
        if (user.id === cur.superintendent) {
          if (acc.members) {
            acc.members.push(cur);
          } else {
            acc.members = [cur];
          }
        }
        return acc;
      }, {})
    : [];

  return (
    <Flex direction="column" padding="0 20px 0 0">
      <Flex width="100%">
        <UserBlockItem>
          <Flex height="300px" justify="space-between">
            <Flex align="center">
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
              <ButtonStyled
                align="initial"
                width="100px"
                height="40px"
                onClick={() => setAskToRemove(true)}
              >
                Remove
              </ButtonStyled>
            )}
          </Flex>
          {askToRemove && (
            <RemoveUserModal
              yes={() => removeUser()}
              no={() => setAskToRemove(false)}
            ></RemoveUserModal>
          )}
        </UserBlockItem>
      </Flex>
      <Flex>
        <Flex direction="column" width="30%" margin="0 10px 0 0">
          <UserBlockItem>
            <ReportsContainer>
              <FaUserCheck size="25" />
              <span>General information</span>
            </ReportsContainer>
            <GeneralInfoTitle>Hired on</GeneralInfoTitle>
            <GeneralInfoP>{user?.startDate || "2021-03-11"}</GeneralInfoP>
            <GeneralInfoTitle>Employment type</GeneralInfoTitle>
            <GeneralInfoP>Fulltime</GeneralInfoP>
            <GeneralInfoTitle>Position</GeneralInfoTitle>
            <GeneralInfoP>{user?.typeOfWork || "Developer"}</GeneralInfoP>
            <GeneralInfoTitle>Department</GeneralInfoTitle>
            <GeneralInfoP>{user.department}</GeneralInfoP>
            <GeneralInfoTitle>Division</GeneralInfoTitle>
            <GeneralInfoP>{user.unit}</GeneralInfoP>
            <GeneralInfoTitle>Location</GeneralInfoTitle>
            <GeneralInfoP>{user.address}</GeneralInfoP>
          </UserBlockItem>
          <UserBlockItem>
            <ReportsContainer>
              <FaUserTie size="25" /> <span>Reports to</span>
            </ReportsContainer>
            <Anchor
              onClick={() => router.push(`/employees/${superintendent.id}`)}
            >
              <UserText padding="0">
                <a>{`${superintendent.name} ${superintendent.surname}`}</a>
              </UserText>
              <UnitContainer>{superintendent.unit}</UnitContainer>
            </Anchor>
          </UserBlockItem>
          <UserBlockItem>
            <ReportsContainer>
              <FaUsers size="25" />
              <span>Direct reports</span>
            </ReportsContainer>
            {subordinates?.members &&
              subordinates.members.map(({ name, surname, id, unit }) => {
                return (
                  <Anchor
                    key={id}
                    onClick={() => router.push(`/employees/${id}`)}
                  >
                    <UserText padding="0">
                      <a>{`${name} ${surname}`}</a>
                    </UserText>
                    <UnitContainer>{unit}</UnitContainer>
                  </Anchor>
                );
              })}
          </UserBlockItem>
          <UserBlockItem>
            <ReportsContainer>
              <FaSitemap size="25" />
              <span>Teams</span>
            </ReportsContainer>
            {subordinates?.members &&
              user.projects.map(({ name, role, id }) => {
                return (
                  <Anchor
                    key={id}
                    onClick={() => router.push(`/projects/${id}`)}
                  >
                    <UserText padding="0">
                      <a>{name}</a>
                    </UserText>
                    <UnitContainer>{role}</UnitContainer>
                  </Anchor>
                );
              })}
          </UserBlockItem>
        </Flex>
        <Flex width="70%">
          <Tabs user={user} />
        </Flex>
      </Flex>
    </Flex>
  );
}
function setUsersToRecoil(res: any) {
  throw new Error("Function not implemented.");
}
