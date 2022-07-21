import { useEffect, useState } from "react";
import { Button } from "components/Button";
import styled from "styled-components";
import Modal from "components/Modal";
import { Input } from "components/Inputs/Input";
import { UserText } from "styled-components/UserForm";
import { AiFillBell } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import { VscAccount } from "react-icons/vsc";
import { FiAlignJustify } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { hamburgerState } from "state/atoms";
import { Flex } from "styled-components/Flex";
import { ImageContainer } from "styled-components/ImageContainer";
type PropsHeader = {
  background?: string;
};

const HeaderStyles = styled.div<PropsHeader>`
  position: fixed;
  left: 0;
  z-index: 5;
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);
  return (
    <HeaderStyles>
      <Flex>
        <Flex width='350px' padding='10px 5px 0 15px'>
          <Button
            onClick={() => {
              setHamburger((oldHamburger) => !oldHamburger);
            }}
            height='50px'
            width='50px'
          >
            <FiAlignJustify size='20' />
          </Button>
        </Flex>
        <Flex width='100%' justify='space-between' align-items='center' padding='10px 15px 0 0'>
          <Button height='50px' width='50px'>
            <VscAccount size='20' />
          </Button>
          <Flex margin='0 10px'>
            <CgAddR size='40' onClick={openCloseModalBells} />
            <Input
              type='text'
              placeholder='Search'
              width='100%'
              height='40px'
              margin='0 30px'
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <AiFillBell size='40' onClick={openCloseModalBells} />
          </Flex>
          {bellModalVisible && (
            <Modal close={openCloseModalBells}>
              <UserText>Нових сповіщень немає!</UserText>
            </Modal>
          )}
          <ImageContainer image={user && user.image} width='50px' height='50px' margin='0' />
        </Flex>
      </Flex>
    </HeaderStyles>
  );
}
