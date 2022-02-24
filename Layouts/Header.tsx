import Link from "next/link";
import { useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import { Flex } from "components/User/Flex";
import { InputComponent } from "components/InputComponent";
import { UserText } from "components/User/UserForm";
import { AiFillBell } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";
import { FiAlignJustify } from "react-icons/fi";

type PropsHeader = {
  background?: string;
};
const HeaderStyles = styled.div<PropsHeader>`
  position: fixed;
  left: 0;
  width: 100%;
  height: 70px;
  background: ${(props) => props.background || props.theme.colors.background};
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
`;

export default function Header({ collapsed, setCollapsed }) {
  const [bellModalVisible, setBellModalVisible] = useState(false);
  const openCloseModalBells = () => {
    setBellModalVisible(!bellModalVisible);
  };
  return (
    <HeaderStyles>
      <Flex>
        <Flex width="350px" padding="10px 5px 0 15px">
          <ButtonStyled
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            height="50px"
          >
            <FiAlignJustify size="20" />
          </ButtonStyled>
        </Flex>
        <Flex
          width="100%"
          justify="space-between"
          align-items="center"
          padding="10px 15px 0 0"
        >
          <Link href={`/employees/`} passHref>
            <ButtonStyled height="50px">
              <VscAccount size="20" />
            </ButtonStyled>
          </Link>
          <Flex margin="0 10px">
            <CgAddR size="40" onClick={openCloseModalBells} />
            <InputComponent
              type="text"
              placeholder="Search"
              width="100%"
              height="40px"
              margin="0 30px"
            />
            <AiFillBell size="40" onClick={openCloseModalBells} />
          </Flex>
          <Modal
            top="90px"
            visibility={bellModalVisible}
            close={openCloseModalBells}
          >
            <UserText>Нових сповіщень немає!</UserText>
          </Modal>
          <Link href={"/employees/profile"} passHref>
            <ButtonStyled>Icon Profille</ButtonStyled>
          </Link>
        </Flex>
      </Flex>
    </HeaderStyles>
  );
}
