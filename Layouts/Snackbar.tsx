import React, { PureComponent } from "react";
import styled, { keyframes } from "styled-components";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

type SnackbarProps = {
  message: string;
  type: string;
};

const backgrounds = {
  info: "#333",
  success: "#14973b",
  warning: "#e0d31ab9",
  error: "#d60909",
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
  text-align: center;
  border-radius: 4px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  background: ${(props: { type: string }) => backgrounds[props.type]};
  font-size: 1rem;
  animation: ${MovementSnackBar};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

export const Snackbar = (props: SnackbarProps) => {
  const { message, type } = props;

  return (
    <>
      <StylesSnackBar type={type}>{message}</StylesSnackBar>
    </>
  );
};
