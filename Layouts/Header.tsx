import Link from "next/link";
import { useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import { Flex } from "components/User/Flex";
import { InputComponent } from "components/InputComponent";
import { UserText } from "components/User/UserForm";
import { AiFillBell  } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { IconContext } from "react-icons";
import { VscAccount } from "react-icons/vsc";

type PropsHeader = {
  background?: string;
};
const HeaderStyles = styled.div<PropsHeader>`
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

  const [bellModalVisible, setBellModalVisible] = useState(false);
  const openCloseModalBells = () => {
    setBellModalVisible(!bellModalVisible);
  };
  return (
    <HeaderStyles>
      <IconContext.Provider value={{color:"#9C9C9C", size:'38px' }}>
      <Flex justify="end" margin="15px 15px 0 15px">
        <Link href={`/employees/`} passHref>
          <Flex right="auto">
            <ButtonStyled><VscAccount size='60' /></ButtonStyled>
          </Flex>
        </Link>
          <CgAddR  onClick={openCloseModalBells} />
        <InputComponent
          type={"text"}
          placeholder={"Search"}
          width="405px"
          height="60px"
        ></InputComponent>
        <AiFillBell  onClick={openCloseModalBells} />
        <Modal top="90px" visibility={bellModalVisible} close={openCloseModalBells}>
          <UserText>Нових сповіщень немає!</UserText>
        </Modal>
        <Link href={"/employees/profile"} passHref>
          <ButtonStyled margin="10px">Icon Profille</ButtonStyled>
        </Link>
      </Flex>
      </IconContext.Provider>
    </HeaderStyles>
  );
}
 