import Stages from "containers/projects/description/Stages";
import React from "react";
import styled from "styled-components";
import { Flex } from "styled-components/Flex";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { projectState } from "state/atoms";
import gearIcon from "../../../resources/images/gearIcon.png";
import { stackIcons } from "constants/projectStack";
import DeadLine from "./DeadLine";
import useUserRole from "hooks/useUserRole";
import { Button } from "Components/Button";
import router from "next/router";

export const Description = () => {
  const project = useRecoilValue(projectState);
  const userRole = useUserRole();
  const stack = project?.description?.stack;
  const rating = project?.rating;
  const findAverage = (votes, voted) => votes && voted && votes.reduce((prev, curr) => prev + curr) / voted;
  const fullAvarage =
    rating &&
    rating.map((item) => findAverage(item.votes, item.voted)).reduce((prev, curr) => prev + curr) / rating.length;
  const handleEdit = (e) => {
    e.preventDefault();
    router.push(`/projects/${project.id}/edit`);
  };
  return (
    <Flex margin='0' justify='space-between' width='100%'>
      <Flex direction='column'>
        <StyledH2>DESCRIPTION</StyledH2>
        <StyledDescription>{project?.description?.description}</StyledDescription>
        <Stages />
        <StyledH2>DEADLINE</StyledH2>
        <DeadLine />
      </Flex>
      <Flex direction='column'>
        {userRole === "admin" && <StyledBtn onClick={handleEdit}>Edit</StyledBtn>}
        <StyledStatus status={project?.description?.status} health={(fullAvarage / 5 / 10) * 1100}>
          <span>status</span> <div></div>
          {rating ? (
            <>
              <span>health</span> <div></div>
            </>
          ) : (
            <>
              <span></span>
              <div></div>
            </>
          )}
        </StyledStatus>
        <StyledImg>
          {project?.description?.img ? (
            <img src={project?.description?.img} alt='project logo' width='225px' />
          ) : (
            <StyledDefaultImg length={project?.name?.length}>{project?.name}</StyledDefaultImg>
          )}
          <StyledStack>
            <StyledH2>Project Stack</StyledH2>
            <ul>
              {stack?.map((item) => {
                return (
                  <li key={item}>
                    {stackIcons[item.toLowerCase()] ? (
                      <Image src={stackIcons[item.toLowerCase()]?.src} width='24px' height='24px'></Image>
                    ) : (
                      <Image src={gearIcon} width='24px' height='24px'></Image>
                    )}
                    {item}
                  </li>
                );
              })}
            </ul>
          </StyledStack>
        </StyledImg>
      </Flex>
    </Flex>
  );
};
const StyledStack = styled.div`
  h2 {
    text-align: center;
  }
  ul {
    font-family: "KoHo";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: #66667d;
    list-style-type: none;
    line-height: 42px;
    li {
      img {
        padding-right: 12px !important;
      }
      display: flex;
      align-items: center;
    }
  }
`;
const StyledH2 = styled.h2`
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #0038ff;
  margin-top: 40px;
`;
const StyledDescription = styled.div`
  width: 500px;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #66667d;
  margin-bottom: 100px;
`;
const StyledImg = styled.div`
  width: 225px;
`;
const StyledDefaultImg = styled.div<{ length: number }>`
  width: 225px;
  height: 225px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #dfdfdf;
  color: white;
  font-style: normal;
  font-weight: 700;
  font-size: ${({ length }) => `${350 / length}px`};
  line-height: 62px;
`;
const StyledStatus = styled.div<{ status: string; health: number }>`
  display: flex;
  justify-content: space-evenly;
  font-family: "Kanit";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #66667d;
  margin: 15px;
  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &:nth-child(2) {
      background: ${({ status }) => (status === "in progress" ? "#32FC00" : "red")};
    }
    &:nth-child(4) {
      background: ${({ health }) => `hsl(${health},100%,50%)`};
    }
  }
  span + div {
    margin-left: -17px;
  }
`;
const StyledBtn = styled(Button)`
  width: fit-content;
  margin-left: 180px;
  margin-top: 20px;
  padding: 5px 10px;
`;
