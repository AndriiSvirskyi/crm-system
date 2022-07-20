import { Input } from "components/Inputs/Input";
import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 0 0 10px 0;
  width: 100%;
`;

const IconWrap = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  right: 10px;
  cursor: pointer;
  z-index: 1;
`;

const OptionsContainer = styled.div`
  position: absolute;
  background-color: white;
  overflow-y: auto;
  max-height: 230px;
  width: 100%;
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
  value?:string;
};

export default function InputSelect({
  callback,
  list,
  placeholder,
  error,
  value
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
        if (
          el.parts[i].startsWith(valueInput.toLowerCase()) ||
          el.label.startsWith(valueInput)
        ) {
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
      <IconWrap onClick={() => setDropBox(!isDropBox)}>
        {isDropBox ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </IconWrap>
      <Input
        type="text"
        placeholder={placeholder}
        height="40px"
        width="100%"
        error={error}
        value={valueInput || value}
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
