import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import styled from "styled-components";
import { ButtonStyled } from "./ButtonStyled";
import { Flex } from "./User/Flex";
const OptionsWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  background-color: aliceblue;
  border: 0.5px solid #0d74bc;
  border-radius: 3px;
`;
export const Options = ({ editTask, askToRemove }) => {
  return (
    <OptionsWrapper>
      <Flex width="180px" direction="column">
        <ButtonStyled
          background="transparent"
          onClick={editTask}
          padding="5px 10px"
          hoverBack="#cdffb049"
        >
          <Flex width="160px" align="center" justify="space-between">
            <b>Edit</b>
            <FaEdit fill="#0d74bc" />
          </Flex>
        </ButtonStyled>
        <ButtonStyled
          background="transparent"
          onClick={askToRemove}
          padding="5px 10px"
          hoverBack="#cdffb049"
        >
          <Flex width="160px" align="center" justify="space-between">
            <b>Remove</b>
            <RiDeleteBack2Line fill="#0d74bc" />
          </Flex>
        </ButtonStyled>
      </Flex>
    </OptionsWrapper>
  );
};
