import React, { PureComponent } from "react";
import styled, { keyframes } from "styled-components";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { ImNotification } from "react-icons/im";

type SnackbarProps = {
  message: string;
  type: string;
};

const backgrounds = {
  info: "#333333cf",
  success: "#0ca83bd4",
  warning: "#c9bb01e0",
  error: "#be0707d1",
};

const MovementSnackBar = keyframes`

0% {
    left:-300px;
    bottom:25px;
  }

  100% {
    left:25px;
    bottom:25px;
  }

`;
const StylesSnackBar = styled.div`
  min-width: 250px;
  color: #fff;
  border-radius: 4px;
  padding: 16px;
  position: fixed;
  display: flex;
  justify-content: space-around;
  z-index: 3;
  background: ${(props: { type: string }) => backgrounds[props.type]};
  font-size: 1rem;
  animation: ${MovementSnackBar};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  span {
    font-size: 16px;
    margin: 4px 0 0 16px;
    text-align: center;
  }
`;

export const Snackbar = (props: SnackbarProps) => {
  const { message, type } = props;
  const icons = {
    info: "",
    success: <FiCheckCircle size={25} />,
    warning: <ImNotification size={25} />,
    error: <FiXCircle size={30} />,
  };
  return (
    <>
      <StylesSnackBar type={type}>
        {icons[type]}
        <span>{message}</span>
      </StylesSnackBar>
    </>
  );
};
