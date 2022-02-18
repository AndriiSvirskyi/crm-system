import { ButtonStyled } from "components/Styled/ButtonStyled";
import { Flex } from "components/Styled/Flex";
import Link from "next/link";

import styled from "styled-components";

export const SideBarStyles = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    margin: 0;
    background-color: ${props => props.background || props.theme.colors.primary};
    width: 280px;
    height: 100%;
    overflow: auto;
    color: ${props => props.background || props.theme.colors.text};
    font-size: 20px;
  `
  const Links = styled.a`
  text-decoration: none;
  padding: 10px;
  user-select: none;
  cursor:pointer;
  
  
  `

export default function SideBar(props) {
    return (
        <SideBarStyles {...props}>
      <aside>
        <ButtonStyled background='white'> Burger</ButtonStyled>
        <Flex direction='column' >
          <Link href={'/employees/me'}><Links> Me </Links></Link>
          <Link href={'/'}><Links> Main page </Links></Link>
          <Link href={'/tasks'}><Links> Tasks </Links></Link>
          <Link href={'/time-tracker'}><Links> Time tracker </Links></Link>
          </Flex >
          <h4> Company </h4>
          <Flex direction='column'>
          <Link href={'/calendar'}><Links> Calendar </Links></Link>
          <Link href={'/projects'}><Links> Projects </Links></Link>
          <Link href={'/employees'}><Links> Employees </Links></Link>
          <Link href={'/knowledge'}><Links> Knowledge base </Links></Link>
          <Link href={'/reports'}><Links> Reports </Links></Link>
          </Flex>
      </aside>
          </SideBarStyles>
    );
  }