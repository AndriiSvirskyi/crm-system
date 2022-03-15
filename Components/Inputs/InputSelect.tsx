import { Input } from "components/Inputs/Input";
import React, { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
  margin: 0 0 10px 0;
  width: 100%;
`;
type ArrowProps = {
  active:boolean;
}
const Arrow = styled.label<ArrowProps>`
  position: absolute;
  cursor: text;
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  z-index: 1;
  right: 67px;
  margin-top: 15px;
  transform: ${({active})=> active ? `rotate(135deg)` : `rotate(-45deg)`}; 
`;

const OptionsContainer = styled.div`
  position: absolute;
  background-color: white;
  overflow-y: auto;
  max-height: 230px;
  width: 79%;
  text-align: left;
  z-index: 2;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
const Option = styled.div`
  font-size: 12px;
  padding: 10px;
  &:hover {
    background-color: #ddd;
  }
`;
type DropDownProps = {
  callback: any;
  list: any;
  placeholder: string;
  error?: any;
};
export default function InputSelect({
  callback,
  list,
  placeholder,
  error,
}: DropDownProps) {
  const [isDropBox, setDropBox] = useState(false);
  const [valueInput, setValueInput] = useState("");
  function setCurrentValue(selectedTagContent) {
    for (let i = 0; i < list.length; i++) {
      if (selectedTagContent === list[i].label) {
        setValueInput(selectedTagContent);
        callback(list[i].value);
        setDropBox(false);
        return;
      }
    }
  }
  const filteredOptions = (listOfItem) => {
    return listOfItem.filter((el) => {
      for (let i = 0; i < el.parts.length; i++) {
        if (el.parts[i].startsWith(valueInput.toLowerCase()) || (el.label.startsWith(valueInput))) {
          return true;
        }
      }
    });
  };
  const renderOptions = (filteredArrayOfOptions) => {
    return filteredArrayOfOptions.map((el) => (
      <Option key={el.value}>{el.label}</Option>
    ));
  };

  return (
    <Container>
      <Arrow active={isDropBox} />
      <Input
        type="text"
        placeholder={placeholder}
        height="40px"
        width="100%"
        error={error}
        value={valueInput}
        onChange={(e) => {
          callback("");
          setDropBox(true);
          setValueInput(e.target.value);
        }}
        onClick={() => setDropBox(!isDropBox)}
      />
      {isDropBox && (
        <OptionsContainer
          onClick={(e: any) => {
            let tagName = e.target.textContent;
            setCurrentValue(tagName);
          }}
        >
          {renderOptions(filteredOptions(list))}
        </OptionsContainer>
      )}
    </Container>
  );
}
