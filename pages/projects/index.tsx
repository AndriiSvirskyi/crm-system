import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import MainLayout from "layouts/MainLayout";
import { Input } from "components/Input";
import { Flex } from "styled-components/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "styled-components/UserForm";
import router from "next/router";
import Loader from "styled-components/Loader";
import { ImageContainer } from "styled-components/ImageContainer";

type projectsProps = {
  [key: string]: {
    id: string;
    members: string;
    lead: string;
  };
};

export const Anchor = styled.span`
  a {
    cursor: pointer;
    color: rgb(25, 118, 186);
    text-decoration: none;
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
        for (let i = 0; i < cur.projects.length; i++) {
          if (acc[cur.projects[i].name]) {
            acc[cur.projects[i].name].members.push(
              cur.name + " " + cur.surname
            );
          } else {
            acc[cur.projects[i].name] = { id: cur.projects[i].id, members: [] };
            acc[cur.projects[i].name].members.push(
              cur.name + " " + cur.surname
            );
          }
          if (cur.projects[i].role === "Team Lead") {
            acc[cur.projects[i].name].lead = cur.name + " " + cur.surname;
          }
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
          <Input
            height="50px"
            placeholder="Search team"
            type="search"
            onChange={(e) => setSearchProject(e.target.value)}
          />
        </Flex>
        {!users ? (
          <Loader />
        ) : (
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
                  <Anchor
                    onClick={() => router.push(`/projects/${project[1].id}`)}
                  >
                    <UserTitle padding="0">
                      <a>{project[0]}</a>
                    </UserTitle>
                  </Anchor>
                  <UserText size="16px">
                    Members({project[1].members.length})
                  </UserText>
                  <UserText>Team Lead:</UserText>
                  <hr />
                  <Flex align="center">
                    <ImageContainer
                      image={
                        users.find(
                          (user) =>
                            user.name + " " + user.surname === project[1].lead
                        ).image
                      }
                      width="50px"
                      height="50px"
                      margin="0 20px 0 0"
                    />
                    <Anchor
                      onClick={() =>
                        router.push(
                          `/employees/${
                            users.find(
                              (user) =>
                                user.name + " " + user.surname ===
                                project[1].lead
                            ).id
                          }`
                        )
                      }
                    >
                      <a>{project[1].lead}</a>
                    </Anchor>
                  </Flex>
                </UserBlockItem>
              ))}
          </Flex>
        )}
      </UserWindow>
    </MainLayout>
  );
};

export default Projects;
