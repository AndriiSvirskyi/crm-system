import { useEffect, useState } from "react";
import Link from "next/link";
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

type projectsProps = {
  [key: string]: {
    id: string;
    members: string;
    lead: string;
  };
};

const Anchor = styled.span`
  a {
    color: rgb(25, 118, 186);
    text-decoration: none;
    display: block;
    padding: 10px;
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
        <Flex justify="left" align="center" margin="0 0 60px 0">
          <UserTitle size="40px" margin="0 60px 0 0">Teams</UserTitle>
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
              <Link
                href={`/projects/${project[1].id}`}
                key={project[1].id}
                passHref
              >
                <UserBlockItem key={project} width="30%">
                  <UserTitle color="rgb(25, 118, 186)"> {project[0]}</UserTitle>
                  <UserText size="16px" padding="0 10px">
                    Members({project[1].members.length})
                  </UserText>
                  <UserText>Team Lead:</UserText>
                  <hr />
                  <Anchor>
                    <Link
                      href={`/employees/${
                        users.find(
                          (user) =>
                            user.name + " " + user.surname === project[1].lead
                        ).id
                      }`}
                      passHref
                    >
                      <a href="">{project[1].lead}</a>
                    </Link>
                  </Anchor>
                </UserBlockItem>
              </Link>
            ))}
        </Flex>
      </UserWindow>
    </MainLayout>
  );
};

export default Projects;
