import React from "react";
import styled from "styled-components";

const SelectStyled = styled.select`
height: 50px;
width: 100px;
margin:10px;
border:2px solid grey;
border-radius: 8px;
`

export default function Select({ options, stateOriginal, setFilteredState }) {
    const sort = (selectedOption) => {
        if(selectedOption !== 'All') {
            setFilteredState(stateOriginal.filter((request)=> request.type === selectedOption)  )
        } else {
            setFilteredState(stateOriginal)
        }
        }
  return (
    <SelectStyled onChange={(e) => sort(e.target.value)}>
      {options.map((option, i) => (
        <option key={option + i} value={option}>
          {option}
        </option>
      ))}
    </SelectStyled>
  );
}
