import styled from "styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { ButtonStyled } from "components/ButtonStyled";
import { Flex } from "components/User/Flex";

type ModalProps = {
  top: string;
  right: string;
  left: string;
  bottom: string;
  visibility: string;
  width: string;
  height: string;
  padding?: string;
};

const ModalContainer = styled.div<ModalProps>`
  position: absolute;
  width: ${({ width }) => width || ""};
  height: ${({ height }) => height || ""};
  top: ${(props) => props.top || ""};
  right: ${({ right }) => right || ""};
  left: ${({ left }) => left || ""};
  bottom: ${({ bottom }) => bottom || ""};
  padding: ${({ padding }) => padding || ""};
  text-align: center;
  color: #666666;
  border: 2px solid #d0d0d0;
  background-color: #ffffff;
  box-shadow: 0px 4px 41px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  visibility: ${({ visibility }) => visibility};
`;

export default function Modal(props) {
  return (
    <ModalContainer
      {...props}
      visibility={props.visibility ? "visible" : "hidden"}
    >
      <Flex justify="end">
        <ButtonStyled
          margin="5px"
          padding="2px 5px"
          background="transparent"
          onClick={props.close}
        >
          <VscChromeClose />
        </ButtonStyled>
      </Flex>
      {props.children}
    </ModalContainer>
  );
}
