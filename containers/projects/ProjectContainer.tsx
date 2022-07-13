import { Button } from "Components/Button";
import router from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { projectState } from "state/atoms";
import styled from "styled-components";
import { Description } from "./description/Description";
import Health from "./description/Health";
import { Team } from "./Team";

export function ProjectContainer() {
  const project = useRecoilValue(projectState);
  const [active, setActive] = useState("Description");
  const tabs = {
    Description: <Description />,
    Team: <Team />,
    Health: <Health />,
  };

  return (
    <StyledContainer>
      <span>
        <Anchor onClick={() => router.push("/projects")}>
          <a>Teams </a>
        </Anchor>
        / {project?.name}
      </span>
      <h1>{project?.name}</h1>
      <StyledBtnContainer>
        {Object.keys(tabs).map((tab) => (
          <Button
            className={active === tab ? "active" : ""}
            key={tab}
            onClick={(e) => {
              e.preventDefault();
              setActive(tab);
            }}
          >
            {tab}
          </Button>
        ))}
      </StyledBtnContainer>
      <StyledLine></StyledLine>
      {tabs[active]}
    </StyledContainer>
  );
}

const Anchor = styled.span`
  cursor: pointer;
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
  }
`;
const StyledBtnContainer = styled.div`
  margin-left: -5px;
  button {
    font-family: "Kanit";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 5px 10px;
    background: none;
    margin-right: 20px;
  }
  .active {
    background: #0029ff;
    color: #ffffff;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 45px;
  max-width: 1050px;
`;
const StyledLine = styled.div`
  width: 200%;
  position: relative;
  left: -45px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  margin-top: 14px;
`;
