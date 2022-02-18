import styled, { keyframes } from "styled-components";

type MessageProps = {
  type: string;
  text: string;
};

type ContainerProps = {
  color: string;
};

const colors = {
  error: "red",
  warning: "yellow",
  success: "green",
};

const show = keyframes`
  from {
    top: -100px;
  }

  to {
    top: 30px;
  }
`;

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 30px;
  padding: 10px 15px;
  text-align: center;
  color: ${({ color }) => color};
  background-color: #f5f5f5;
  animation-iteration-count: 1;
  animation: ${show} 0.5s linear;
  border-radius: 3px;
`;

export const Message = ({ type, text }: MessageProps) => {
  return <Container color={colors[type]}>{text}</Container>;
};
