import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;

  justify-content: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalBody = styled.div`
  position: relative;
  padding: 40px;
  background: white;
  border-radius: 10px;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default function Modal({ close, children }) {
  return (
    <ModalContainer>
      <ModalBody>
        <CloseIcon>
          <AiFillCloseCircle size='30' onClick={close} />
        </CloseIcon>
        {children}
      </ModalBody>
    </ModalContainer>
  );
}
