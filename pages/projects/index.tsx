import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import MainLayout from "Layouts/MainLayout";
import { InputComponent } from "components/InputComponent";
import { Flex } from "components/User/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "components/User/UserForm";
import router from "next/router";

type projectsProps = {
  [key: string]: {
    id: string;
    members: string;
    lead: string;
  };
};

export const Anchor = styled.span`
  cursor: pointer;
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
    display: block;
  }
  :hover {
    a {
      color: rgb(96, 139, 238);
    }
  }
`;

const Projects = () => {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const [searchProject, setSearchProject] = useState("");

  useEffect(() => {
    if (!users) {
      const response = fetch(`http://localhost:4200/users`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setUsersToRecoil(res);
        });
    }
  }, []);

  const projects: projectsProps = users
    ? users.reduce((acc, cur) => {
        if (acc[cur.project.name]) {
          acc[cur.project.name].members.push(cur.name + " " + cur.surname);
        } else {
          acc[cur.project.name] = { id: cur.project.id, members: [] };
          acc[cur.project.name].members.push(cur.name + " " + cur.surname);
        }
        if (cur.project.role === "Team Lead") {
          acc[cur.project.name].lead = cur.name + " " + cur.surname;
        }
        return acc;
      }, {})
    : [];

  return (
    <MainLayout>
      <UserWindow>
        <Flex justify="left" align="center" margin="100px 0 60px 0">
          <UserTitle size="40px" margin="0 60px 0 0">
            Teams
          </UserTitle>
          <InputComponent
            height="50px"
            placeholder="Search team"
            type="search"
            onChange={(e) => setSearchProject(e.target.value)}
          />
        </Flex>
        <Flex wrap="wrap">
          {Object.entries(projects)
            .filter((project) => {
              if (
                project[0].toLowerCase().includes(searchProject.toLowerCase())
              ) {
                return project;
              }
            })
            .map((project) => (
              <UserBlockItem
                key={project[1].id}
                padding="0 0 20px 15px"
                width="30%"
              >
                <UserTitle
                  onClick={() => router.push(`/projects/${project[1].id}`)}
                  padding="0"
                  color="rgb(25, 118, 186)"
                >
                  {" "}
                  {project[0]}
                </UserTitle>
                <UserText size="16px">
                  Members({project[1].members.length})
                </UserText>
                <UserText>Team Lead:</UserText>
                <hr />
                <Anchor
                  onClick={() =>
                    router.push(
                      `/employees/${
                        users.find(
                          (user) =>
                            user.name + " " + user.surname === project[1].lead
                        ).id
                      }`
                    )
                  }
                >
                  <a>{project[1].lead}</a>
                </Anchor>
              </UserBlockItem>
            ))}
        </Flex>
      </UserWindow>
    </MainLayout>
  );
};

export default Projects;
