import { useState } from "react";
import { ButtonStyled } from "components/ButtonStyled";
import styled from "styled-components";
import Modal from "components/Modal/Modal";
import { InputComponent } from "components/InputComponent";
import { UserText } from "components/User/UserForm";
import { AiFillBell } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";
import { FiAlignJustify } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { hamburgerState } from "state/atoms";
import { Flex } from "components/User/Flex";

type PropsHeader = {
  background?: string;
};

const HeaderStyles = styled.div<PropsHeader>`
  position: fixed;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 70px;
  background: ${(props) => props.background || props.theme.colors.background};
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
`;

export default function Header() {
  const [bellModalVisible, setBellModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const openCloseModalBells = () => {
    setBellModalVisible(!bellModalVisible);
  };
  const setHamburger = useSetRecoilState(hamburgerState);
  return (
    <HeaderStyles>
      <Flex>
        <Flex width="350px" padding="10px 5px 0 15px">
          <ButtonStyled
            onClick={() => {
              setHamburger((oldHamburger) => !oldHamburger);
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
          <ButtonStyled height="50px">
            <VscAccount size="20" />
          </ButtonStyled>
          <Flex margin="0 10px">
            <CgAddR size="40" onClick={openCloseModalBells} />
            <InputComponent
              type="text"
              placeholder="Search"
              width="100%"
              height="40px"
              margin="0 30px"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
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
          <ButtonStyled>Icon Profille</ButtonStyled>
        </Flex>
      </Flex>
    </HeaderStyles>
  );
}
