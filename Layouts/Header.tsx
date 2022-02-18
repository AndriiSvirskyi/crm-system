import Link from "next/link";
import { useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";

import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import { Flex } from "components/User/Flex";
import { InputComponent } from "components/InputComponent";
import { UserText } from "components/User/UserForm";

type PropsHeader = {
  background: string;
};
export const HeaderStyles = styled.div<PropsHeader>`
  position: fixed;
  max-width: 100%;
  height: 100px;
  left: 280px;
  top: 0;
  right: 0;
  background: ${(props) => props.background || props.theme.colors.background};
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
`;

export default function Header() {
  const [searchUser, setSearchUser] = useState("");
  const [bellModalVisible, setBellModalVisible] = useState("hidden");
  const openModal = () => {
    setBellModalVisible("visible");
  };
  const closeModal = () => {
    setBellModalVisible("hidden");
  };
  return (
    <HeaderStyles>
      <Flex justify="end" margin="15px">
        <Link href={"/employees/me"}>
          <Flex right="auto">
            <ButtonStyled width="187px" height="66px" margin="">
              Logo
            </ButtonStyled>
          </Flex>
        </Link>
        <Flex>
          <ButtonStyled
            height="40px"
            width="40px"
            margin="10px"
            onClick={openModal}
          >
            +
          </ButtonStyled>
        </Flex>
        <InputComponent
          type={"text"}
          placeholder={"Search"}
          width="405px;"
          height="60px"
        ></InputComponent>
        <ButtonStyled margin="10px" onClick={openModal}>
          Bells
        </ButtonStyled>
        <Modal top="90px" visibility={bellModalVisible}>
          <ButtonStyled onClick={(e) => closeModal(e)}> Close</ButtonStyled>
          <UserText>Нових сповіщень немає!</UserText>
        </Modal>
        <Link href={"/employees/me"}>
          <ButtonStyled margin="10px">Icon Profille</ButtonStyled>
        </Link>
      </Flex>
    </HeaderStyles>
  );
}
