import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";
import { UserTitle } from "components/User/UserForm";
import Link from "next/link";

import styled from "styled-components";

type PropsSideBar = {
  background: string;
};
export const SideBarStyles = styled.div<PropsSideBar>`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  background-color: ${(props) =>
    props.background || props.theme.colors.primary};
  width: 280px;
  height: 100%;
  overflow: auto;
  color: ${(props) => props.background || props.theme.colors.text};
  font-size: 20px;
`;

export default function SideBar(props) {
  return (
    <SideBarStyles {...props}>
      <aside>
        <ButtonStyled background="white"> Burger</ButtonStyled>
        <Flex direction="column" margin="20px 0 0 0">
          <Link passHref href={"/employees/profile"}>
            <ButtonStyled> Me </ButtonStyled>
          </Link>
          <Link passHref href={"/"}>
            <ButtonStyled> Main page </ButtonStyled>
          </Link>
          <Link passHref href={"/tasks"}>
            <ButtonStyled> Tasks </ButtonStyled>
          </Link>
          <Link passHref href={"/time-tracker"}>
            <ButtonStyled> Time tracker </ButtonStyled>
          </Link>
        </Flex>
        <UserTitle size="16px" margin="15px 0 10px 90px">
          {" "}
          Company{" "}
        </UserTitle>
        <Flex direction="column" content="start">
          <Link passHref href={"/calendar"}>
            <ButtonStyled> Calendar </ButtonStyled>
          </Link>
          <Link passHref href={"/projects"}>
            <ButtonStyled> Projects </ButtonStyled>
          </Link>
          <Link passHref href={"/employees"}>
            <ButtonStyled> Employees </ButtonStyled>
          </Link>
          <Link passHref href={"/knowledge"}>
            <ButtonStyled> Knowledge base </ButtonStyled>
          </Link>
          <Link passHref href={"/reports"}>
            <ButtonStyled> Reports </ButtonStyled>
          </Link>
        </Flex>
      </aside>
    </SideBarStyles>
  );
}
