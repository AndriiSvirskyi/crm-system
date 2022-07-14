import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { projectState } from "state/atoms";
import styled from "styled-components";
import Image from "next/image";
import emj1 from "../../../resources/images/emj1.png";
import emj2 from "../../../resources/images/emj2.png";
import emj3 from "../../../resources/images/emj3.png";
import emj4 from "../../../resources/images/emj4.png";
import emj5 from "../../../resources/images/emj5.png";
import { BiDownArrow } from "react-icons/bi";

export default function RatingBar() {
  const project = useRecoilValue(projectState);
  const [visible, setVisible] = useState(false);
  const team = project?.team?.length;
  const rating = project?.rating;
  const findAverage = (votes, voted) => votes && voted && votes.reduce((prev, curr) => prev + curr) / voted;
  const fullAvarage =
    rating &&
    rating.map((item) => findAverage(item.votes, item.voted)).reduce((prev, curr) => prev + curr) / rating.length;
  const width = (avarage) => 100 - (avarage * 100) / 5;
  return (
    <div>
      <StyledContainer>
        <StyledEmodji average={Math.ceil(fullAvarage)}>
          <Image src={emj1} />
          <Image src={emj2} />
          <Image src={emj3} />
          <Image src={emj4} />
          <Image src={emj5} />
        </StyledEmodji>
        <StyledBar width={width(fullAvarage)}>
          <div></div>
        </StyledBar>
        <StyledBtn onClick={() => setVisible(!visible)} visible={visible}>
          <BiDownArrow color='grey' />
        </StyledBtn>
      </StyledContainer>

      <StyledHistory visible={visible} count={rating.length}>
        {rating.map((item, i) => {
          const average = findAverage(item.votes, item.voted);
          return (
            <StyledContainer key={i}>
              <StyledWeek>Week {i + 1}</StyledWeek>
              <StyledEmodji average={Math.ceil(average)}>
                <Image src={emj1} />
                <Image src={emj2} />
                <Image src={emj3} />
                <Image src={emj4} />
                <Image src={emj5} />
              </StyledEmodji>
              <StyledBar width={width(average)}>
                <div></div>
              </StyledBar>
              <StyledVotes>
                Voted {item.voted}/{team}
              </StyledVotes>
            </StyledContainer>
          );
        })}
      </StyledHistory>
    </div>
  );
}
const StyledBtn = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: -48px;
  top: 35px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #efefef;
  svg {
    transform: ${({ visible }) => (visible ? "scaleY(-1)" : "none")};
    transition: all 0.3s linear;
  }
`;
const StyledHistory = styled.div<{ visible: boolean; count: number }>`
  height: ${({ visible, count }) => (visible ? count * 163 + "px" : "0")};
  opacity: ${({ visible }) => (visible ? "1" : "0.3")};
  overflow-y: hidden;
  transition: all 0.6s ease-in-out;
`;
const StyledEmodji = styled.div<{ average: number }>`
  display: flex;
  justify-content: space-between;
  margin: 15px 0 10px;
  span {
    opacity: 0.4 !important;
  }
  span:nth-child(${({ average }) => average}) {
    opacity: 1 !important;
  }
`;
const StyledBar = styled.div<{ width: number }>`
  position: relative;
  width: 99%;
  height: 17px;
  mix-blend-mode: normal;
  box-shadow: 1px 3px 5px rgba(65, 65, 65, 0.25), 2px -1px 3px rgba(107, 107, 107, 0.25);
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    #ffa800 15.51%,
    #faff04 55.2%,
    #aeff02 69.26%,
    #8fff01 82.49%,
    #00ff00 100%
  );
  div {
    position: absolute;
    right: 0;
    background: white;
    height: 100%;
    width: ${({ width }) => width + "%"};
    border-radius: 0 4px 4px 0;
  }
`;
const StyledContainer = styled.div`
  width: 285px;
  margin-bottom: 35px;
  position: relative;
`;
const StyledVotes = styled.div`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #66667d;
  margin: 10px 0;
`;
const StyledWeek = styled.div`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #66667d;
`;
