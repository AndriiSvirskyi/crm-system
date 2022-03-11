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
  max-height: 250px;
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
          setDropBox(true);
          setValueInput(e.target.value);
        }}
        onClick={() => setDropBox(!isDropBox)}
      />
      {isDropBox && (
        <OptionsContainer>
          {list
            .filter((el) =>
              el.value.toLowerCase().includes(valueInput.toLocaleLowerCase())
            )
            .map((el) => (
              <Option
                onClick={() => {
                  setValueInput(el.value);
                  setState(el);
                  setDropBox(false);
                }}
                key={el.id}
              >
                {el.value}
              </Option>
            ))}
        </OptionsContainer>
      )}
    </Container>
  );
}
