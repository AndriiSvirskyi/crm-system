import styled from "styled-components";

type ButtonProps = {
  margin: string;
  align: string;
  background: string;
  color: string;
  width: string;
  height: string;
  padding: string;
  position?: string;
  right?: string;
  bottom?: string;
  hoverBack?: string;
};

const StyledButton = styled.button<ButtonProps>`
  position: ${({ position }) => position};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  cursor: pointer;
  border: none;
  user-select: none;
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || ""};
  border-radius: 8px;
  align-self: ${(props) => props.align || ""};
  color: ${(props) => props.color || props.theme.colors.text};
  background: ${(props) => props.background || props.theme.colors.primary};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  &:hover {
    background: ${(props) => props.hoverBack || "#eeeeee"};
  }
`;

export const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
