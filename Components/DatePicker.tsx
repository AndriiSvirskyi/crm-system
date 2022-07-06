import React from "react";
import { DateLabel } from "styled-components/Label";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";

interface IProps {
  startDate: any;
  endDate: any;
  setDateRange: any;
}

export default function CustomDatePicker({ startDate, endDate, setDateRange }: IProps) {
  return (
    <StyledContainer>
      <DateLabel>
        <StyledDatePicker
          id='date'
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          placeholderText='DD.MM.YY-DD.MM.YY'
        />
        <FaCalendarAlt color='black' />
      </DateLabel>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  border: 1px solid #d0d0d0;
  width: 250px;
  position: relative;
  height: 30px;
  border-radius: 5px;
`;

const StyledDatePicker = styled(DatePicker)`
  font-size: 16px;
  padding: 0 0 0 25px;
  float: left;
  height: 30px;
  border: none;
  outline: none;
  background: none;
  margin: 0 0 10px 0;
`;
