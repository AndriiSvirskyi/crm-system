import router from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Rectangle from "resources/images/Rectangle";
import { projectState, usersState } from "state/atoms";
import styled, { keyframes } from "styled-components";
import { ImageContainer } from "styled-components/ImageContainer";
import { calculateDateDiff } from "utils/dateDifference";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function Stages() {
  const project = useRecoilValue(projectState);
  const [stage, setStage] = useState(0);
  const [page, setPage] = useState(1);
  const maxPage1 = project?.description?.stages?.presale?.team
    ? Math.ceil(Object.entries(project.description.stages.presale.team).length / 3)
    : 1;
  const maxPage2 = project?.description?.stages?.discovery?.team
    ? Math.ceil(Object.entries(project.description.stages.discovery.team).length / 3)
    : 1;
  const maxPage3 = project?.description?.stages?.delivery?.team
    ? Math.ceil(Object.entries(project.description.stages.delivery.team).length / 3)
    : 1;
  const users = useRecoilValue(usersState);
  const stageDate = (stage) => project?.description?.stages?.[stage];
  const getDateDiff = (stage) =>
    stageDate(stage)?.start && stageDate(stage)?.end
      ? calculateDateDiff(stageDate(stage).start, stageDate(stage).end)
      : stageDate(stage)?.start
      ? "in progress"
      : "not started";
  const getDates = (stage) =>
    stageDate(stage)?.start &&
    `${stageDate(stage).start.replaceAll("-", ".")} - ${
      stageDate(stage).end ? stageDate(stage).end.replaceAll("-", ".") : "now"
    }`;

  const handleClick = (stage: number) => {
    setStage(stage);
    setPage(1);
  };
  const renderTeam = (stage: "presale" | "delivery" | "discovery") => {
    return (
      project?.description &&
      users &&
      Object.entries(project.description.stages[stage].team).map((item) => {
        const user = users.find((user) => user.id === item[0]);
        return (
          <StyledUser key={user.id}>
            <StyledName>
              <ImageContainer
                onClick={() => router.push(`/employees/${user.id}`)}
                image={user.image}
                width='30px'
                height='30px'
                margin='0'
              />
              <div onClick={() => router.push(`/employees/${user.id}`)}>{`${user.name} ${user.surname}`}</div>
            </StyledName>
            <StyledPosition>{item[1]}</StyledPosition>
          </StyledUser>
        );
      })
    );
  };
  return (
    <>
      <StyledWrapper>
        <StyledContainerLeft>
          <StyledRectangle active={stage === 0 ? true : false} onClick={() => handleClick(0)}>
            <span>PRESALE</span>
            <Rectangle />
          </StyledRectangle>
          <StyledRectangle active={stage === 1 ? true : false} onClick={() => handleClick(1)}>
            <span>DISCOVERY</span>
            <Rectangle />
          </StyledRectangle>
          <StyledRectangle active={stage === 2 ? true : false} onClick={() => handleClick(2)}>
            <span>DELIVERY</span>
            <Rectangle />
          </StyledRectangle>
        </StyledContainerLeft>
        <StyledContainerRight>
          <StyledDiv className={stage === 0 ? "active" : ""} z={stage === 0 ? 3 : 2}>
            <StyledHeader>
              <h2>PRESALE</h2>
              <StyledDates>
                <StyledDiff>{getDateDiff("presale")}</StyledDiff>
                <StyledPeriod>{getDates("presale")}</StyledPeriod>
              </StyledDates>
            </StyledHeader>
            <StyledTeam>
              <StyledTeamWrapper page={page}>{renderTeam("presale")}</StyledTeamWrapper>
            </StyledTeam>{" "}
            {maxPage1 > 1 && page !== 1 && (
              <StyledArrowUp onClick={() => setPage((prevState) => --prevState)}>
                <AiOutlineArrowUp />
              </StyledArrowUp>
            )}
            {page !== maxPage1 && maxPage1 > 1 && (
              <StyledArrowDown onClick={() => setPage((prevState) => ++prevState)}>
                <AiOutlineArrowDown />
              </StyledArrowDown>
            )}
          </StyledDiv>
          <StyledDiv className={stage === 1 ? "active" : ""} z={stage === 1 ? 3 : 1}>
            <StyledHeader>
              <h2>DISCOVERY</h2>
              <StyledDates>
                <StyledDiff>{getDateDiff("discovery")}</StyledDiff>
                <StyledPeriod>{getDates("discovery")}</StyledPeriod>
              </StyledDates>
            </StyledHeader>
            <StyledTeam>
              <StyledTeamWrapper page={page}>{renderTeam("discovery")}</StyledTeamWrapper>
            </StyledTeam>
            {maxPage2 > 1 && page !== 1 && (
              <StyledArrowUp onClick={() => setPage((prevState) => --prevState)}>
                <AiOutlineArrowUp />
              </StyledArrowUp>
            )}
            {page !== maxPage2 && maxPage2 > 1 && (
              <StyledArrowDown onClick={() => setPage((prevState) => ++prevState)}>
                <AiOutlineArrowDown />
              </StyledArrowDown>
            )}
          </StyledDiv>
          <StyledDiv className={stage === 2 ? "active" : ""} z={stage === 2 ? 3 : 0}>
            <StyledHeader>
              <h2>DELIVERY</h2>
              <StyledDates>
                <StyledDiff>{getDateDiff("delivery")}</StyledDiff>
                <StyledPeriod>{getDates("delivery")}</StyledPeriod>
              </StyledDates>
            </StyledHeader>
            <StyledTeam>
              <StyledTeamWrapper page={page}> {renderTeam("delivery")}</StyledTeamWrapper>
            </StyledTeam>
            {maxPage3 > 1 && page !== 1 && (
              <StyledArrowUp onClick={() => setPage((prevState) => --prevState)}>
                <AiOutlineArrowUp />
              </StyledArrowUp>
            )}
            {page !== maxPage3 && maxPage3 > 1 && (
              <StyledArrowDown onClick={() => setPage((prevState) => ++prevState)}>
                <AiOutlineArrowDown />
              </StyledArrowDown>
            )}
          </StyledDiv>
        </StyledContainerRight>
      </StyledWrapper>
    </>
  );
}
const StyledArrowDown = styled.span`
  position: absolute;
  right: 8px;
  bottom: 5px;
  cursor: pointer;
`;
const StyledArrowUp = styled.span`
  position: absolute;
  right: 8px;
  bottom: 25px;
  cursor: pointer;
`;

const StyledTeamWrapper = styled.div<{ page: number }>`
  position: relative;
  top: ${({ page }) => -((page - 1) * 189) + "px"};
  transition: all 0.4s ease-out;
`;
const StyledTeam = styled.div`
  position: relative;
  bottom: 0px;
  height: 189px;
  overflow-y: hidden;
`;
const StyledRectangle = styled.div<{ active }>`
  position: relative;
  cursor: pointer;
  svg {
    filter: ${({ active }) =>
      active
        ? "drop-shadow(-2px 4px 10px rgba(0, 0, 0, 0.25)) drop-shadow(1px -1px 10px rgba(0, 0, 0, 0.25));"
        : "drop-shadow(1px -1px 15px rgba(166, 166, 166, 0.25)) drop-shadow(0px 4px 15px rgba(203, 205, 203, 0.25));"};
  }
  span {
    font-weight: ${({ active }) => (active ? 500 : 400)};
    font-family: "KoHo";
    font-style: normal;
    font-size: 18px;
    line-height: 23px;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
  }
`;
const StyledContainerLeft = styled.div`
  div + div {
    margin-top: -23px;
  }
`;
const StyledWrapper = styled.div`
  position: relative;
  width: 590px;
  height: 255px;
  display: flex;
  margin: 40px 0;
`;
const slideUp = keyframes`
  0% {
    bottom: -225px;
  }
  100% {
    bottom: 0px;
  }
`;
const StyledContainerRight = styled.div`
  position: absolute;
  overflow: hidden;
  right: 0;
  width: 415px;
  height: 254px;
  box-shadow: 2px 5px 13px rgba(171, 171, 171, 0.25), -1px -3px 20px rgba(164, 164, 164, 0.25);
  .active {
    animation-name: ${slideUp};
    animation-duration: 0.5s;
    animation-timing-function: ease;
  }
`;

const StyledDiv = styled.div<{ z: number }>`
  z-index: ${({ z }) => z};
  box-shadow: 2px 5px 13px rgba(171, 171, 171, 0.25), -1px -3px 20px rgba(164, 164, 164, 0.25);
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 40px 20px 20px;
  h2 {
    margin: 0;
    font-family: "Kanit";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 33px;
    color: #0038ff;
  }
`;
const StyledUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "KoHo";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #000000;
  margin-top: 17px;
  height: 46px;
`;
const StyledPosition = styled.div`
  max-width: 150px;
  text-align: right;
`;
const StyledName = styled.div`
  display: flex;
  align-items: center;
  div {
    max-width: 130px;
    cursor: pointer;
  }
  div + div {
    margin-left: 20px;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const StyledDates = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const StyledDiff = styled.div`
  font-family: "KoHo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  color: #66667d;
`;
const StyledPeriod = styled.div`
  font-family: "KoHo";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  color: #66667d;
`;
