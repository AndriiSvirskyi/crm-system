import React from "react";
import styled from "styled-components";
import { AiFillFileText } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

export default function FileView({ file, files, setFiles, editable = false }) {
  const handleDelete = () => {
    setFiles(files.filter((item) => item.name !== file.name));
  };
  return (
    <StyledContainer>
      <StyledFileAnchor href={file.src} key={file.name} download>
        <StyledFileImage>
          {file.type.startsWith("image") ? (
            <img src={file.src} alt={file.name} />
          ) : (
            <AiFillFileText size='40' fill='grey' />
          )}
        </StyledFileImage>
        <StyledFileName>{file.name}</StyledFileName>
      </StyledFileAnchor>{" "}
      {editable ? (
        <StyledDelete onClick={handleDelete}>
          <TiDelete fill='grey' />
        </StyledDelete>
      ) : (
        <></>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;
const StyledFileAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  background: #e9e9e9;
  border-radius: 8px;
  margin-top: 5px;
  text-decoration: none;
  &:hover,
  &:active {
    opacity: 0.7;
  }
`;
const StyledFileImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  margin-right: 15px;
  svg {
    width: 59px;
  }
  img {
    width: 45px !important;
    height: 45px !important;
    object-fit: cover;
    opacity: 0.85;
  }
`;
const StyledFileName = styled.div`
  margin-right: 130px;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDelete = styled.div`
  font-size: 30px;
  position: absolute;
  top: 20px;
  right: 30px;
  svg {
    cursor: pointer;
    &:hover {
      fill: black;
    }
  }
`;
