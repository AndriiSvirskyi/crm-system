import InputSelect from "components/Inputs/InputSelect";
import React, { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";
import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";

const AddProjectContainer = styled.div`
  position: absolute;
  left: 0;
  top: 28px;
  background: #eeeeee;
  padding: 10px;
  width: calc(100% + 150px);
  height: fit-content;
  z-index: 1;
  .bUBunu {
    position: relative;
  }
`;
const Label = styled.label`
  cursor: pointer;
  display: flex;
  position: relative;
  span {
    margin: 0 0 0 5px;
    font-size: 16px;
  }
`;

const ProjectContainer = styled.div`
  position: relative;
`;

export default function AddProjectInputSelect({ project, setProjectCallback }) {
  const [isAddProjectActive, setProjectModalActive] = useState(false);

  const users = useRecoilValue(usersState);

  const setProject = (project) => {
    setProjectCallback(project);
    project && setProjectModalActive(false);
  };

  const AddProjectInputSelect = useMemo(() => {
    const uniqueProjectsName = users?.reduce(
      (acc, cur) => {
        for (let i = 0; i < cur.projects.length; i++) {
          {
            acc[cur.projects[i].name] = true;
          }
        }
        return acc;
      },
      { Other: true }
    );

    const projectsList = uniqueProjectsName
      ? Object.keys(uniqueProjectsName).map((projectName) => ({
          label: projectName,
          value: projectName,
          parts: projectName.toLowerCase().split(" "),
        }))
      : [{ label: "Other", value: "Other", parts: "other" }];
    return (
      <InputSelect
        callback={setProject}
        list={projectsList}
        placeholder="Find Project"
      />
    );
  }, [users]);
  return (
    <>
      <ProjectContainer>
        <Label
          onClick={() => {
            setProjectModalActive(!isAddProjectActive);
          }}
        >
          {!project ? (
            <>
              <BsPlusCircle size={18}></BsPlusCircle>
              <span>Project</span>
            </>
          ) : (
            <div>{project}</div>
          )}
        </Label>
        {isAddProjectActive && (
          <AddProjectContainer
            onMouseLeave={() => setProjectModalActive(false)}
          >
            {AddProjectInputSelect}
          </AddProjectContainer>
        )}
      </ProjectContainer>
    </>
  );
}
