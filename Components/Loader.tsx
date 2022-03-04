import React from "react";
import styled, { keyframes } from "styled-components";
import { Flex } from "./User/Flex";

const RotateAnimation = keyframes`
    0% {
       transform: rotateZ(0deg) 
    }
    100% {
        transform: rotateZ(360deg);
    }

`;

const LoaderContainer = styled.div`
  width: 14px;
  height: 14px;
  border: 5px solid #0072ff;
  border-bottom-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: ${RotateAnimation} 1s infinite linear;
`;

export default function Loader() {
  return (
    <Flex justify="center" align="center" height='100px'>
      <LoaderContainer />
    </Flex>
  );
}
