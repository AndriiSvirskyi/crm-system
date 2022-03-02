import styled from "styled-components";

type ButtonProps = {
  margin: string;
  align: string;
  background: string;
  color: string;
  width: string;
  height: string;
  padding: string;
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  cursor: pointer;
  align-self: center;
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || ""};
  border-radius: 8px;
  align-self: ${(props) => props.align || ""};
  color: ${(props) => props.color || props.theme.colors.text};
  background: ${(props) => props.background || props.theme.colors.primary};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  &:hover {
    background: #eeeeee;
  }
`;

export const ButtonStyled = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
