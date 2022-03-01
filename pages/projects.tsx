import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import MainLayout from "Layouts/MainLayout";
import { InputComponent } from "components/InputComponent";
import { Flex } from "components/User/Flex";
import {
  UserBlockItem,
  UserText,
  UserTitle,
  UserWindow,
} from "components/User/UserForm";

import { useRecoilValue } from "recoil";
import { usersState } from "state/atoms";

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

const Projects = ({ users }) => {
  const [searchProject, setSearchProject] = useState("");
  const projects: projectsProps = users.reduce((acc, cur) => {
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
  }, {});

  return (
    <MainLayout>
      <UserWindow>
        <Flex justify="space-between" align="center">
          <UserTitle size="40px">Projects</UserTitle>
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
                <UserBlockItem key={project} width="350px">
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

export async function getServerSideProps() {
    const response = await fetch(`http://localhost:4200/users/`);
    const users = await response.json();
    return {
      props: { users },
    };
  }

export default Projects;
