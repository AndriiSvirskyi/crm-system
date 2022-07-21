import { Input } from "Components/Inputs/Input";
import React from "react";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import { Label } from "styled-components/Label";
import { BiDownArrow } from "react-icons/bi";

export default function Phase({
  title,
  setVisible,
  isVisible,
  setModalOpen,
  team,
  setTeam,
  start,
  setStart,
  end,
  setEnd,
}) {
  return (
    <StyledPhase>
      <h4 onClick={() => setVisible(!isVisible)}>
        {title}
        <StyledArrow visible={isVisible}>
          <BiDownArrow />
        </StyledArrow>
      </h4>
      <StyledPhaseInfo visible={isVisible}>
        <Label htmlFor='#' required={false}>
          Team
        </Label>
        <StyledAddBtn onClick={() => setModalOpen(true)}>+ Add Team Member</StyledAddBtn>
        <StyledMembers>
          {team?.map((item) => (
            <StyledMember key={Object.keys(item)[0]}>
              {`${Object.keys(item)[0]}, ${Object.values(item)[0]}`}
              <StyledCross
                onClick={() => setTeam(team?.filter((user) => Object.keys(user)[0] !== Object.keys(item)[0]))}
              >
                x
              </StyledCross>
            </StyledMember>
          ))}
        </StyledMembers>
        <Flex margin='0 0 10px 0' width='100%'>
          <Flex margin='0 70px 10px 0' direction='column'>
            <Label htmlFor='startPresale' required={false}>
              Start
            </Label>
            <Input
              type='date'
              id='startPresale'
              value={start}
              onChange={(e) => setStart(e.target.value)}
              width='100%'
              height='40px'
              outline='1px solid #d0d0d0'
              background='none'
            />
          </Flex>
          <Flex margin='0 0px 10px 0' direction='column'>
            <Label htmlFor='presaleEnd' required={false}>
              End
            </Label>
            <Input
              type='date'
              id='presaleEnd'
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              width='100%'
              height='40px'
              outline='1px solid #d0d0d0'
              background='none'
            />
          </Flex>
        </Flex>
      </StyledPhaseInfo>
    </StyledPhase>
  );
}
const StyledPhase = styled.div`
  width: 100%;
  h4 {
    width: 100%;
    text-align: left;
    background-color: #e4e4e4;
    cursor: pointer;
    padding: 15px 20px;
    margin: 5px 0;
    box-sizing: border-box;
  }
`;
const StyledPhaseInfo = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "block" : "none")};
  padding: 10px 0 0 20px;
  border: 1px solid #e4e4e4;
  margin-top: -5px;
`;
const StyledMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;
const StyledMember = styled.div`
  border: 1px solid grey;
  padding: 5px 10px;
  margin: 5px 10px 5px 0;
  display: flex;
`;
const StyledCross = styled.div`
  padding-left: 10px;
  cursor: pointer;
`;
const StyledAddBtn = styled.div`
  cursor: pointer;
  padding: 10px;
  background: #a1a1a1;
  color: #ffffff;
  width: fit-content;
  margin: 10px 0;
`;
const StyledArrow = styled.div<{ visible: boolean }>`
  float: right;
  svg {
    position: relative;
    top: 1px;
    width: 12px;
    height: 12px;
    transform: ${({ visible }) => (visible ? "scaleY(-1)" : "none")};
    transition: all 0.3s linear;
  }
`;
