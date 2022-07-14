import React, { useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { UserWindow } from "styled-components/UserForm";
import { ProjectContainer } from "containers/projects/ProjectContainer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { projectsState, projectState, usersState } from "state/atoms";

export default function Project() {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  const setProjectsToRecoil = useSetRecoilState(projectsState);
  const setProjectToRecoil = useSetRecoilState(projectState);
  const projects = useRecoilValue(projectsState);
  const id = document.location.pathname.replace("/projects/", "");

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
    if (!projects) {
      const response = fetch(`http://localhost:4200/projects`);
      response
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setProjectsToRecoil(res);
        });
    }
  }, []);

  useEffect(() => {
    setProjectToRecoil(
      users && projects
        ? {
            id: id,
            name: projects.find((item) => item.id === id).name,
            lead: users.find((user) => user.projects.find((item) => item.role === "Team Lead")?.id === id),
            team: users.filter((user) => user.projects.find((item) => item.id === id && item.role !== "Team Lead")),
            description: projects.find((item) => item.id === id).description,
            rating: projects.find((item) => item.id === id).rating,
            feedbacks: projects.find((item) => item.id === id).feedbacks,
          }
        : {},
    );
  }, [users, projects]);

  return (
    <MainLayout>
      <UserWindow>
        <ProjectContainer />
      </UserWindow>
    </MainLayout>
  );
}
