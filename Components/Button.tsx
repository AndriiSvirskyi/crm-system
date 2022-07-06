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
  border?: string;
  radius?: string;
  shadow?: string;
  flex?: string;
};

const StyledButton = styled.button<ButtonProps>`
  position: ${({ position }) => position};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  cursor: pointer;
  border: ${({ border }) => border || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  user-select: none;
  padding: ${(props) => props.padding || ""};
  margin: ${(props) => props.margin || ""};
  border-radius: ${({ radius }) => radius || "8px"};
  align-self: ${(props) => props.align || ""};
  color: ${(props) => props.color || props.theme.colors.text};
  background: ${(props) => props.background || props.theme.colors.primary};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  display: ${({ flex }) => (flex ? "flex" : "")};
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${(props) => props.hoverBack || "#eeeeee"};
  }
`;

export const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
