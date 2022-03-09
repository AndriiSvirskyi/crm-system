import React, { useEffect } from "react";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";

const SnackBarContainer = styled.div`
  position: absolute;
  width: 200px;
  border: 1px solid green;
  border-radius: 8px;
  margin: 0 ;
  padding:0;
  bottom: 20px;
  left: 20px;
  background-color: green;
  color: white;
  padding: 10px;
`;

export default function SnackBar({ setShowSnackbar }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <SnackBarContainer>
      {" "}
      <FiCheckCircle color="white" /> User was created
    </SnackBarContainer>
  );
}
