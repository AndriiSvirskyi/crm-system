import Link from "next/link";
import { useState } from "react";
import { ButtonStyled } from "components/Styled/ButtonStyled";

import styled from "styled-components";
import Modal from "./Modal";
import { Flex } from "components/Styled/Flex";
import { InputComponent } from "components/Styled/InputComponent";

export const HeaderStyles = styled.div`
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
  const closeModal = (event) => {
    setBellModalVisible("hidden");
  };
  return (
    <HeaderStyles>
      <Flex justify="end" margin="30px">
        <Link href={"/employees/me"}>
          <Flex right="auto">
            <ButtonStyled margin="10px">Logo</ButtonStyled>
          </Flex>
        </Link>
        <Flex>
          <ButtonStyled margin="10px" onClick={openModal}>
            Plus
          </ButtonStyled>
        </Flex>
        <InputComponent
          type={"text"}
          placeholder={"Search"}
          width="400px"
          height="40px"
        ></InputComponent>
        <ButtonStyled margin="10px" onClick={openModal}>
          Bells
        </ButtonStyled>
        <Modal top="90px" visibility={bellModalVisible}>
          <ButtonStyled onClick={(e) => closeModal(e)}> Close</ButtonStyled>
          <p>Нових сповіщень немає!</p>
        </Modal>
        <Link href={"/employees/me"}>
          <ButtonStyled margin="10px">Icon Profille</ButtonStyled>
        </Link>
      </Flex>
    </HeaderStyles>
  );
}
