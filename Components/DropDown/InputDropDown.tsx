import { Input } from "components/Input";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 0 10px 0;
`;
const OptionsContainer = styled.div`
  position: absolute;
  background-color: white;
  overflow-y: auto;
  max-height: 230px;
  width: 180px;
  text-align: left;
  z-index: 1;
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
let tagName;
type DropDownProps = {
  setState: any;
  list: any;
  placeholder: string;
  error?: any;
};
export default function InputDropDown({
  setState,
  list,
  placeholder,
  error,
}: DropDownProps) {
  const [isDropBox, setDropBox] = useState(false);
  const [valueInput, setValueInput] = useState("");
  function setCurrentValue(name) {
    for (let i = 0; i < list.length; i++) {
      if (name === list[i].label) {
        setValueInput(name);
        setState(list[i].value);
        setDropBox(false);
        return;
      }
    }
  }
  return (
    <Container>
      <Input
        type="text"
        placeholder={placeholder}
        height="40px"
        width="100%"
        error={error}
        value={valueInput}
        onChange={(e) => {
          setState("");
          setDropBox(true);
          setValueInput(e.target.value);
        }}
        onClick={() => setDropBox(!isDropBox)}
      />
      {isDropBox && (
        <OptionsContainer
          onClick={(e: any) => {
            tagName = e.target.textContent;
            setCurrentValue(tagName);
          }}
        >
          {list
            .filter((el) => {
              for (let i = 0; i < el.parts.length; i++) {
                if (el.parts[i].startsWith(valueInput.toLowerCase())) {
                  return true;
                }
              }
            })
            .map((el) => (
              <Option
                // data-atribute={el.label}
                key={el.value}
              >
                {el.label}
              </Option>
            ))}
        </OptionsContainer>
      )}
    </Container>
  );
}
